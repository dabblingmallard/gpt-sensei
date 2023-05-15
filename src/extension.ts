import * as vscode from 'vscode';
import { createUiPanel, getPanelJS, getHtml } from './ui';
import { createOpenAiApi, getCompletion } from './openai-api';
import { Extension, getFileLanguage, getLastPart } from './utils/language-names';
import { systemMessage } from './utils/prompts';
import { AuthStorage } from './utils/auth-storage';
import { OpenAIApi } from 'openai';

export async function activate(context: vscode.ExtensionContext) {
	AuthStorage.init(context);
	const auth = AuthStorage.instance;
	let openai: OpenAIApi | null;

	const checkToken = async () => {
		const token = await auth.getAuthData();
		if (token) {
			openai = createOpenAiApi(token);
		} else {
			vscode.window.showErrorMessage("API key not set. Please use the 'gptSensei.setToken' command to set the API key.");
			await vscode.commands.executeCommand("gptSensei.setToken");
		}
	};

	vscode.commands.registerCommand("gptSensei.setToken", async () => {
		const tokenInput = await vscode.window.showInputBox({
			placeHolder: "OpenAI API KEY"
		});
		await auth.storeAuthData(tokenInput);
		if (tokenInput) {
			openai = createOpenAiApi(tokenInput);
		}
	});

	await checkToken();

	let myButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myButton.text = 'GPT SENSEI';
	myButton.tooltip = 'Click to get code from GPT';
	myButton.command = 'gptSensei.showSenseiWindow';
	myButton.show();

	let panel: vscode.WebviewPanel | undefined;
	let languageName: string | null;
	let fileName: string | null;
	let extension: string | null;

	function updateSystemInput(): void {
		if (!panel) {
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;
		fileName = getLastPart(activeEditor?.document.fileName || '');
		extension = `.${fileName.split('.').pop()}`;
		if (extension) {
			languageName = getFileLanguage(extension as Extension);
			if (!languageName) {
				languageName = `${extension} file`;
			}
		}
		panel.webview.postMessage({ command: 'updateSystemInput', systemMessage: systemMessage({ languageName, fileName }) });
	}



	let disposable = vscode.commands.registerCommand('gptSensei.showSenseiWindow', async function () {
		panel = createUiPanel('GPT SENSEI');
		const jsContent = getPanelJS(context);
		panel.webview.html = getHtml(context.extensionUri, jsContent);

		let autoSystemInput = true;
		vscode.window.onDidChangeTextEditorSelection(() => {
			if (autoSystemInput) {
				updateSystemInput();
			}
		}, null, context.subscriptions);

		panel.webview.onDidReceiveMessage(async (message) => {
			if (message.command === 'submit') {
				await checkToken();
				if (!openai) {
					panel!.webview.postMessage({ command: 'setLoading', isLoading: false });
					return;
				}

				const { systemContent, promptContent } = message;

				const editors = vscode.window.visibleTextEditors;
				let editor: vscode.TextEditor | null = null;
				let selection: vscode.Selection | null = null;
				let selectionContent = '';
				for (let e of editors) {
					selectionContent = e.selection ? e.document.getText(e.selection) : '';
					if (selectionContent || e.selection.active) {
						selection = e.selection;
						editor = e;
					}
				}
				const responseMeta = extension ? { system: systemContent, prompt: promptContent, language: editor?.document.languageId } : {};

				const messages = [
					{ role: 'system' as const, content: systemContent },
					{ role: 'user' as const, content: selectionContent },
					{ role: 'user' as const, content: promptContent },
				].filter(m => !!m.content);

				if (!messages.length) {
					panel!.webview.postMessage({ command: 'setLoading', isLoading: false });
					return;
				}


				const responseText = await getCompletion(openai, messages);
				if (!responseText) {
					panel!.webview.postMessage({ command: 'setLoading', isLoading: false });
					return;
				}

				if (message.replace && editor && selection) {
					await editor.edit((editBuilder) => {
						editBuilder.replace(selection!, responseText);
					});
				}

				panel!.webview.postMessage({ command: 'setLoading', isLoading: false });
				panel!.webview.postMessage({ command: 'showResponse', content: responseText, ...responseMeta });
			} else if (message.command === 'openResponseInEditor') {
				vscode.workspace.openTextDocument({
					content: message.content,
					language: message.language
				})
					.then(doc => vscode.window.showTextDocument(doc));
			} else if (message.command === 'setAutoSystemInput') {
				autoSystemInput = message.autoSystemInput;
			}
		}, undefined, context.subscriptions);
	});

	context.subscriptions.push(disposable);
}