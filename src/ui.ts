import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function createUiPanel(title: string): vscode.WebviewPanel {
    return vscode.window.createWebviewPanel(
        'textAreaInput',
        title,
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
        },
    );
}

export function getPanelJS(context: vscode.ExtensionContext): string {
    const panelJSPath = path.join(context.extensionPath, 'webview/dist', 'index.js');
    const panelJSContent = fs.readFileSync(panelJSPath, 'utf8');
    return panelJSContent;
}

export function getHtml(extensionUri: vscode.Uri, jsContent: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React WebView</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
          window.vscode = acquireVsCodeApi();
          ${jsContent}
        </script>
    </body>
    </html>
  `;
}