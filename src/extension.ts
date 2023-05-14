import * as vscode from 'vscode';
import { getGlobalState } from './global-state';
import { createUiPanel, getPanelJS, getHtml } from './ui';
import { createOpenAiApi, getCompletion } from './openai-api';
import { Extension, getFileLanguage, getLastPart } from './utils/language-names';
import { systemMessage } from './utils/prompts';

export function activate(context: vscode.ExtensionContext) {
	const globalState = getGlobalState(context);
	const openai = createOpenAiApi(globalState.apiKey);

	let myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myButton.text = 'GPT SENSEI';
	myButton.tooltip = 'Click to get code from GPT';
	myButton.command = 'extension.showTextArea';
	myButton.show();

	let panel: vscode.WebviewPanel | undefined;

	function updateSystemInput(): void {
		if (!panel) {
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;
		const fileName = getLastPart(activeEditor?.document.fileName || '');
		const extension = `.${fileName.split('.').pop()}`;
		let languageName;
		if (extension) {
			languageName = getFileLanguage(extension as Extension);
			if (!languageName) {
				languageName = `${extension} file`;
			}
		}
		panel.webview.postMessage({ command: 'updateSystemInput', systemMessage: systemMessage({ languageName, fileName }) });
	}

	vscode.window.onDidChangeTextEditorSelection((event) => {
		updateSystemInput();
	}, null, context.subscriptions);


	let disposable = vscode.commands.registerCommand('extension.showTextArea', async function () {
		panel = createUiPanel('GPT SENSEI');
		const jsContent = getPanelJS(context);
		panel.webview.html = getHtml(context.extensionUri, jsContent);

		panel.webview.onDidReceiveMessage(async (message) => {
			if (message.command === 'submit') {
				const { systemContent, promptContent } = message;

				const editors = vscode.window.visibleTextEditors;
				let editor = null;
				let selectionContent = '';
				for (let e of editors) {
					selectionContent = e.selection ? e.document.getText(e.selection) : '';
					if (selectionContent || e.selection.active) {
						editor = e;
					}
				}

				const messages = [
					{ role: 'system' as const, content: systemContent },
					{ role: 'user' as const, content: selectionContent },
					{ role: 'user' as const, content: promptContent },
				].filter(m => !!m.content);

				if (!messages.length) {
					panel!.webview.postMessage({ command: 'showResponse', content: '' });
					return;
				}


				const responseText = await getCompletion(openai, messages);
				if (!responseText) {
					return;
				}

				if (editor) {
					const selection = editor.selection;
					await editor.edit((editBuilder) => {
						editBuilder.replace(selection, responseText);
					});
				}

				panel!.webview.postMessage({ command: 'showResponse', content: responseText });
			}
		}, undefined, context.subscriptions);
	});

	context.subscriptions.push(disposable);
}