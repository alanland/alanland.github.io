---
title:  "WebStorm rpx"
date:   2019-03-14 11:23:37
tags:   [webstorm]
---

Add FileWatcher:

- File type: `Vue.js template`

- Program: `sed`
- Arguments: `-i "" s/"\ rpx"/rpx/g $FilePath$`
- Output paths to refresh: `$FilePath$`

