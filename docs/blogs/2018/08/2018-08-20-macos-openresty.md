---
title:  "MacOS Openresty"
date:   2018-08-20 10:23:37 +0000
tags:   [openresty, macos]
categories: [DevOps]
---

MacOS系统上编译安装 OpenResty:

```sh
./configure -j2 --prefix=${HOME}/apps/openresty/openresty --with-openssl=/usr/local/Cellar/openssl/1.0.2n
```