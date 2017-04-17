---
layout: post
title:  "Golang asterisk"
date:   2017-04-17 21:04:35 +0000
img:  docker-jekyll.jpg
categories: docker
tags:   [golang]
author: Alan Wang
---
Golang中的`*`和`&`：

- `*` 对变量取地址
- `&` 对指针取值

- `*&` 可以相互抵消： `*&a == a`, 但是 `&*` 不行

eg:
```go
var b *int = &a
```

a 和 b 是一样的。
