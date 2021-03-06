---
layout: post
title:  "VSCode Pretter"
date:   2017-09-13 11:57:37 +0000
tags:   [vscode, eslint, prettier]
author: Alan Wang
---
# Prettier formatter for Visual Studio Code

VS Code package to format your Javascript / Typescript / CSS using [Prettier](https://github.com/prettier/prettier).

## Installation

Install through VS Code extensions. Search for `Prettier - JavaScript formatter`

[Visual Studio Code Market Place: Prettier - JavaScript formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Can also be installed using 

```bash
ext install prettier-vscode
```

## Usage

### Using Command Palette (CMD/CTRL + Shift + P)

- `CMD + Shift + P` -> Format Document

- Select the text you want to Prettify
  -  `CMD + Shift + P` -> Format Selection

### Format On Save

Respects `editor.formatOnSave` setting.

VSCode Config:
```json
{
    "files.autoSave": "afterDelay",
    "git.autofetch": false,
    "window.zoomLevel": 2,
    "editor.mouseWheelZoom": true,
    "editor.fontSize": 16,
    "markdown.preview.fontSize": 16,
    "terminal.integrated.fontSize": 16,
    "javascript.format.enable": true,
    "eslint.autoFixOnSave": true,    
    "prettier.eslintIntegration": true,
    "workbench.colorTheme": "Hopscotch (TextMate Theme)"
}
```

`.prettierrc`

```json
{
    "tabWidth": 2,
    "semi": false,
    "singleQuote": true
}
```

## 关于配置的讨论

- https://github.com/prettier/prettier-vscode/issues/187

> This is from eslint. Your prettier/prettier rule from eslint-plugin-prettier.
You have too much prettier in your workflow. eslint-plugin-prettier already runs prettier with it's settings. You specified singleQuote:true.
If you use this extension, you are running prettier with singleQuote:false, the default.
If you use this extension's settings prettier.eslintIntegration:true it will read your eslintrc file and infer the singleQuote option. BUT from quotes rule not from prettier/prettier:[{singleQuote}]. We use prettier-eslint under the hood.

> `eslint-plugin-prettier` is usefull to have eslint in control with prettier under the hood.
> `eslint-config-prettier` disables eslint's styling rules. And you can use prettier for that.

## 相关回答

- https://stackoverflow.com/questions/45914485/make-prettier-ignore-javascript-formatting


## 配置

### Prettier's Settings

Settings will be read from:

1. File system, first matching file in 
    1. `package.json` - `prettier` key
    1. `.prettierrc`
    1. `.prettier.config.js`
1. VSCode prettier's settings, described below
1. VSCode prettier's default settings

#### `prettier.printWidth` (default: 80)

Fit code within this line limit

#### `prettier.tabWidth` (default: 2)

Number of spaces it should use per tab

#### `prettier.singleQuote` (default: false)

If true, will use single instead of double quotes

#### `prettier.trailingComma` (default: 'none')

Controls the printing of trailing commas wherever possible. Valid options:

 - "none" - No trailing commas
 - "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
 - "all"  - Trailing commas wherever possible (function arguments)

#### prettier.bracketSpacing (default: true)

Controls the printing of spaces inside object literals

#### prettier.jsxBracketSameLine (default: false)

If true, puts the `>` of a multi-line jsx element at the end of the last line instead of being alone on the next line

#### prettier.parser (default: 'babylon') - Javascript only

Which parser to use. Valid options are 'flow' and 'babylon'.

#### prettier.semi (default: true)

Whether to add a semicolon at the end of every line (semi: true),
or only at the beginning of lines that may introduce ASI failures (semi: false)

#### prettier.useTabs (default: false)

If true, indent lines with tabs

### VSCode specific settings

#### prettier.eslintIntegration (default: false) - Javascript and TypeScript only

Use *[prettier-eslint](https://github.com/prettier/prettier-eslint)* instead of *prettier*.
Other settings will only be fallbacks in case they could not be inferred from eslint rules.

#### prettier.javascriptEnable (default: ["javascript", "javascriptreact"])

Advanced feature. Use this to opt in / out prettier on various language ids. Restart required.
Use parser `babylon` or `flow` depending on `prettier.parser` for given language ids.
Use with care.

#### prettier.typescriptEnable (default: ["typescript", "typescriptreact"])

Advanced feature. Use this to opt in / out prettier on various language ids. Restart required.
Use parser `typescript` for given language ids.
Use with care.

#### prettier.cssEnable (default: ["css", "less", "scss"])

Advanced feature. Use this to opt in / out prettier on various language ids. Restart required.
Use parser `postcss` for given language ids.
Use with care.

#### prettier.jsonEnable (default: ["json"])

Advanced feature. Use this to opt in / out prettier on various language ids. Restart required.
Use parser `json` for given language ids.
Use with care.

#### prettier.graphqlEnable (default: ["graphql"])

Advanced feature. Use this to opt in / out prettier on various language ids. Restart required.
Use parser `graphql` for given language ids.
Use with care.

## Prettier resolution

This extension will use prettier from your project's local dependencies. Should prettier not be installed locally with your project's dependencies, a copy will be bundled with the extension.


- https://github.com/prettier/prettier-vscode
---
END
