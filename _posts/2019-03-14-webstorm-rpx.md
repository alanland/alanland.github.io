---
layout: post
title:  "WebStorm rpx"
date:   2019-03-14 11:23:37 +0000
tags:   [webstorm]
author: Alan Wang
---

Add FileWatcher:

- File type: `Vue.js template`

- Program: `sed`
- Arguments: `-i "" s/"\ rpx"/rpx/g $FilePath$`
- Output paths to refresh: `$FilePath$`

