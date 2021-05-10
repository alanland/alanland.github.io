---
title:  "『技术雷达』Module Federation"
date:   2021-04-30 10:52:02
tags:   [tech-radar, webpack]
categories: [TechRadar]
---

## 网站

- https://webpack.js.org/concepts/module-federation/

## 2021-04-30 `评估`

Webpack 5的新特性 `Module Federation` 允许我们在项目内动态加载其它项目的代码，同步项目依赖。
解决了独立应用间代码贡献的问题。

该特性允许项目构建的时候定义自己为 `host`或者`remote`，或者两者都是。

Host 配置了使用的 remotes 列表，以及共享的模块，Remote 定义项目名、打包方式、打包文件名、共享模块、API等。
类似微前端，Remote部署好，在index.html里面引入 Remote Entry 就可以了。
