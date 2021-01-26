---
title:  "Mongo WiredTiger 内存设置"
date:   2019-01-09 11:23:37 +0000
tags:   [mongo]
---

Docker 启动命令：

```yml
command: mongod --wiredTigerCacheSizeGB=1 --dbpath /data/db
```