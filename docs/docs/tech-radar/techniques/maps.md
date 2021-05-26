---
title:  "『技术雷达』WICG: Import Maps"
date:   2021-04-30 15:22:47
tags:   [tech-radar, js]
categories: [TechRadar]
---

## Quadrant: `技术`

## Ring: `评估` 2021-04-30

当使用多个微前端构建系统时，需要确定系统的某些部分加载哪些微前端，以及从哪里加载他们。
之前我们通过`singe-spa`等框架来实现，现在有个一个新标准`Import Maps`，
他使用JS来说明要导入的内容，同时 在初始化 HTML 的响应中使用一个轻量脚本指定从哪里加载微前端。

目前只有 Chrome 支持，但可以通过 SystemJS polyfill 来进行更广泛的应用。


## 网址

- [https://github.com/WICG/import-maps](https://github.com/WICG/import-maps)

WICD的全程是 `Web Platform Incubator Community Group`， 也就是`W3C Web平台孵化器社区组`。
该计划，旨在寻求一种更便捷的方式，让开发者把可行的Web平台新特性提交到标准里。
