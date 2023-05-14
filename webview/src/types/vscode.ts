type VSCodeMessage = {
    command: 'submit';
    systemContent: string;
    promptContent: string;
}

interface vscode {
    postMessage(message: VSCodeMessage): void;
}
