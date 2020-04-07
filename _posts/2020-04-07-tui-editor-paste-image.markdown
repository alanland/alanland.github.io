---
layout: post
title:  "tui-editor paste image"
date:   2020-04-07T16:54:03.472Z
tags:   [js]
categories: [JavaScript]
author: Alan Wang
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