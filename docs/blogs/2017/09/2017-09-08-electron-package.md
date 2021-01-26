---
layout: post
title:  "Electron package"
date:   2017-09-08 12:57:37 +0000
tags:   [js, electron]
author: Alan Wang
---

## Run

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

## Install Electron packager

```sh
# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g
```

## Setting productname and electron version

```sh
npm install --save-dev electron
```

```json
{
 "name": "electron-tutorial-app",
 "productName": "Electron tutorial app",
 "version": "0.1.0",
 "main": "main.js",
 "devDependencies": {
 "electron": "^1.4.3",
 "electron-packager": "^8.1.0"
 }
}
```

## Building MacOS, Windows and Linux package from the terminal

### MacOS

```sh
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```

##  Windows

```sh
electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"
```

## Linux

```sh
electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
```

## Shortcuts
```json
{
 "name": "electron-tutorial-app",
 "productName": "Electron tutorial app",
 "version": "0.1.0",
 "main": "main.js",
 "devDependencies": {
 "electron": "^1.4.3",
 "electron-packager": "^8.1.0"
 },
 "scripts": {
 "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
 "package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",
 "package-linux" : "electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
 }
}
```

```sh
npm run package-mac
npm run package-win
npm run package-linux
```

---
Links:
- https://www.christianengvall.se/electron-packager-tutorial/
- https://electron.atom.io/docs/tutorial/quick-start/
- https://electron.atom.io/docs/tutorial/application-distribution/
- https://electron.atom.io/docs/tutorial/application-packaging/
- https://electron.atom.io/docs/tutorial/installation/

---
END
