---
layout: post
title:  "Docker Events"
date:   2017-11-17 18:23:37 +0000
tags:   [docker]
author: Alan Wang
---

js获取时间:

```js
new Date(2017,11,11,19,0,0).getTime()
```

```sh
docker events --since 1839034829 --filter 'container=container_1' --filter 'container=container_2'
```
