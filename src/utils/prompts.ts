import vscode from 'vscode';

export const systemMessage = (message: any = {}) => {
    const defaultSystemMessage: string | undefined = vscode.workspace.getConfiguration().get('gptSensei.systemMessage');
    if (!defaultSystemMessage) {
        return '';
    }
    const languageName = message.languageName ?? 'Software Engineering';
    const fileName = message.fileName ?? '';

    return defaultSystemMessage
        .replace('${languageName}', languageName)
        .replace('${fileName}', fileName);
};