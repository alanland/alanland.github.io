---
layout: post
title:  "Js Mobile double-tap"
date:   2017-08-07 11:57:37 +0000
tags:   [js, mobile]
author: Alan Wang
---

由于移动设备没有双击事件,我们使用一下代码来实现.

## 仅支持双击

```js
var touchtime = 0
on(document.getElementById('h1'), 'click', function (e) {
  if (touchtime == 0) {
    touchtime = new Date().getTime()
  } else {
    if (((new Date().getTime()) - touchtime) < 500) {
      console.log('double')
      touchtime = 0
    } else {
      touchtime = new Date().getTime()
    }
  }
})
```

## 支持双击和单击
```js
var handler = null
on(document.getElementById('h2'), 'click', function (e) {
  if (handler == null) {
    handler = setTimeout(function () {
      console.log('single')
      clearTimeout(handler)
      handler = null
    }, 400)
  } else {
    clearTimeout(handler)
    handler = null
    console.log('double')
  }
})
```

---
END
