---
layout: post
title:  "Visual Studio Code Setting"
date:   2017-08-02 10:27:37 +0000
tags:   [ide]
author: Alan Wang
---
File > Preferences > Settings (Code > Preferences > Settings

The menu command **File > Preferences > Settings (Code > Preferences > Settings on Mac)** provides entry to configure user and workspace settings. You are provided with a list of Default Settings. Copy any setting that you want to change to the appropriate `settings.json` file. The tabs on the right let you switch quickly between the user and workspace settings files.

You can also open the user and workspace settings from the Command Palette (`Ctrl+Shift+P`) with Preferences: Open User Settings and Preferences: Open Workspace Settings or use the keyboard shortcut (`Ctrl+,`).

```json
"editor.mouseWheelZoom": true,
"editor.fontSize": 16,
"markdown.preview.fontSize": 16,
"terminal.integrated.fontSize": 16
```
保存即生效.

--- 
Links:
- [Setting](https://code.visualstudio.com/docs/getstarted/settings)
- [Themes](https://code.visualstudio.com/docs/getstarted/themes)

---
END
