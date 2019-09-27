---
layout: post
title:  "Ubuntu Server: Install Fonts (Java)"
date:   2017-06-20 16:27:37 +0000
tags:   [linux, java]
author: Alan Wang
---
阿里云的Ubuntu服务器安装Java测试下来`ttc`字体不起作用.

首先本地用`fontforge`将`msyh.ttc`导出成`MicrosoftYaHei.ttf`.

执行命令:
```shell
$ mkdir -p /usr/share/fonts/truetype/
$ cp MicrosoftYaHei.ttf /usr/share/fonts/truetype -f
```

这时候Java程序就能读到`Micorsoft YaHei`的字体了.

---
END
