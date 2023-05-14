import * as vscode from 'vscode';

interface GlobalState {
    apiKey: string;
}

export function getGlobalState(context: vscode.ExtensionContext): GlobalState {
    const configuration = vscode.workspace.getConfiguration('gptSensei');
    return {
        apiKey: configuration.get<string>('apiKey', ''),
    };
}