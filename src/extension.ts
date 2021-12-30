'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, window, commands, env } from 'vscode';
import * as path from 'path';

enum REPLACE {
    BS_WITH_S,
    S_WITH_BS
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('copy-editor-file-name.copy', copyName);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-name-sans-extension.copy', copyNameSansExtension);
    context.subscriptions.push(disposable);

    disposable = commands.registerCommand('copy-editor-file-uri-name.copy', uriCopyName);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-uri-name-sans-extension.copy', uriCopyNameSansExtension);
    context.subscriptions.push(disposable);

    disposable = commands.registerCommand('copy-editor-file-path.copy', copy);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copySlashes', copySlashes);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copyBackslashes', copyBackslashes);
    context.subscriptions.push(disposable);

    disposable = commands.registerCommand('copy-editor-file-path.copyParentPath', copyParentPath);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copyParentPathSlashes', copyParentPathSlashes);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copyParentPathBackslashes', copyParentPathBackslashes);
    context.subscriptions.push(disposable);

    disposable = commands.registerCommand('copy-editor-file-path.copyParentPathEditorTitle', copyParentPathEditorTitle);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copyParentPathSlashesEditorTitle', copyParentPathSlashesEditorTitle);
    context.subscriptions.push(disposable);
    disposable = commands.registerCommand('copy-editor-file-path.copyParentPathbackslashesEditorTitle', copyParentPathBackslashesEditorTitle);
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function copyName() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        env.clipboard.writeText(path.basename(activeEditor.document.fileName));
    }
}

function copyNameSansExtension() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        env.clipboard.writeText(path.basename(activeEditor.document.fileName, path.extname(activeEditor.document.fileName)));
    }
}

function uriCopyName(uri) {
    if (uri && uri.scheme === 'file') {
        env.clipboard.writeText(path.basename(uri.fsPath));
    }
}

function uriCopyNameSansExtension(uri) {
    if (uri && uri.scheme === 'file') {
        env.clipboard.writeText(path.basename(uri.fsPath, path.extname(uri.fsPath)));
    }
}

function copy() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        env.clipboard.writeText(activeEditor.document.fileName);
    }
}

function copySlashes() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        env.clipboard.writeText(activeEditor.document.fileName.replace(/\\/g, '/'));
    }
}

function copyBackslashes() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        env.clipboard.writeText(activeEditor.document.fileName.replace(/\//g, '\\'));
    }
}

function copyParentPathEditorTitle() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        if (activeEditor.document.uri.scheme === 'file') {
            copyParentPathReplacing(path.dirname(activeEditor.document.fileName));
        }
    }
}

function copyParentPathSlashesEditorTitle() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        if (activeEditor.document.uri.scheme === 'file') {
            copyParentPathReplacing(path.dirname(activeEditor.document.fileName), REPLACE.BS_WITH_S);
        }
    }
}

function copyParentPathBackslashesEditorTitle() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        if (activeEditor.document.uri.scheme === 'file') {
            copyParentPathReplacing(path.dirname(activeEditor.document.fileName), REPLACE.S_WITH_BS);
        }
    }
}

function copyParentPath(uri) {
    if (uri && uri.scheme === 'file') {
        copyParentPathReplacing(path.dirname(uri.fsPath));
    }
}

function copyParentPathSlashes(uri) {
    if (uri && uri.scheme === 'file') {
        copyParentPathReplacing(path.dirname(uri.fsPath), REPLACE.BS_WITH_S);
    }
}

function copyParentPathBackslashes(uri) {
    if (uri && uri.scheme === 'file') {
        copyParentPathReplacing(path.dirname(uri.fsPath), REPLACE.S_WITH_BS);
    }
}

function copyParentPathReplacing(parentPath, replace?: REPLACE | undefined) {
    let parentPaths = [];
    let lastParentPath = undefined;
    while (parentPath !== lastParentPath) {
        lastParentPath = parentPath;
        if (replace == REPLACE.BS_WITH_S) {
            parentPaths.push(parentPath.replace(/\\/g, '/'));
        } else if (replace == REPLACE.S_WITH_BS) {
            parentPaths.push(parentPath.replace(/\//g, '\\'));
        } else {
            parentPaths.push(parentPath);
        }
        parentPath = path.dirname(parentPath);
    }

    window.showQuickPick(parentPaths,
    {
        placeHolder: 'Copy parent folder:'
    })
    .then((selectedParentFolder) => {
        if (selectedParentFolder) {
            env.clipboard.writeText(selectedParentFolder);
        }
    },
    (reason) => {
        console.log(reason);
    });
}
