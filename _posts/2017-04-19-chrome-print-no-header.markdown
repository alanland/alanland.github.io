---
layout: post
title:  "Remove Page Footer or Header in Chrome Printer"
date:   2017-04-19 12:01:03 +0000
img:  docker-jekyll.jpg
description: Remove Page Footer or Header in Chrome Printer
tags:   [chrome, print]
author: Alan Wang
---
Chrome 打印的时候会默认生成Page Header 和 Footer，打印选项可以同时去掉
Page Header and Footer， 如果只想保留Page Header，可以通过CSS定制：

```css
@media print {
  @page { margin: 1cm 0 0 0; }
  body { margin: 0cm; }
}
```

上面CSS可以定制四周边距，但是内容还无法定时，可能Chrome或者HTML5还不支持。

---
END