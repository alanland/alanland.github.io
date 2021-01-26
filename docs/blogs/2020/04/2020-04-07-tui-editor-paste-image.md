---
title: tui-editor paste image
date: 2020-07-21 12:44:07.160Z
categories: [前端]
tags: [javascript, editor]
---

```js

var pasteListener = (event) => {
  var cbData = event.data.clipboardData;
  var types = cbData && cbData.types;

  if (types.includes("Files")) {
    event.preventDefault();
    event.stopPropagation();
   }
  };

tuiEditor.eventManager.events.set('paste', [pasteListener, ...tuiEditor.eventManager.events.get('paste')]);

```


- https://github.com/nhn/tui.editor/issues/533