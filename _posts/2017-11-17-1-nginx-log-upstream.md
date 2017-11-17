---
layout: post
title:  "Tomcat Connections Close Wait"
date:   2017-11-15 10:23:37 +0000
tags:   [nginx, upstream]
author: Alan Wang
---

Nginx `upstream`模块下，有几个变量可用于 upstream 日志的记录：

- $upstream_addr
- $upstream_cache_status
- $upstream_status
  - MISS
  - HIT
  - EXPIRED
  - UPDATING
  - STALE
