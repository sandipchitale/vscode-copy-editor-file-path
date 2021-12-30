# vscode-copy-editor-file-path README

**DEPRECATED**

An extension to copy editor file path. Use [File path Desktop Integration](https://marketplace.visualstudio.com/items?itemName=sandipchitale.vscode-fspath-desktop-integration)

## Features

It supports the following commands in editor and editor tab context menus:

- copy-editor-file-name.copy
- copy-editor-file-name-sans-extension.copy

- copy-editor-file-path.copy                      - Copy editor file path ( ```shift+alt+c``` )
- copy-editor-file-path.copySlashes               - Copy editor file path (Slashes)     ( windows only )
- copy-editor-file-path.copyBackslashes           - Copy editor file path (Backslashes) ( non-windows )

- copy-editor-file-path.copyParentPath            - Copy editor file's parent path
- copy-editor-file-path.copyParentPathSlashes     - Copy editor file's parent path (Slashes)     ( windows only )
- copy-editor-file-path.copyParentPathBackslashes - Copy editor file's parent path (Backslashes) ( non-windows )

In Explorer view content menu:

- copy-editor-file-uri-name.copy,
- copy-editor-file-uri-name-sans-extension.copy
- copy-editor-file-path.copyParentPath            - Copy selected file/folder's parent path
- copy-editor-file-path.copyParentPathSlashes     - Copy selected file/folder's parent path (Slashes)     ( windows only )
- copy-editor-file-path.copyParentPathBackslashes - Copy selected file/folder's parent path (Backslashes) ( non-windows )

## Known Issues

No known issues.

## Release Notes

### 1.0.0

Initial release

### [1.0.1]

- Added commands to copy parent path in editor and Explorer view context menu

### [1.0.2]

- Fix order in explorer context menu

### [1.0.3]

- Added commands to copy parent path in editor title

### [1.0.4]

- Added commands to copy name and name sans extension

### [1.0.5]

- Make order of commands in Editor context menu consistent with Explorer

### [1.0.6]

- Copy parent paths upto root using quick pick

### [1.0.7]

- DEPRECATED