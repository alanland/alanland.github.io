---
title: 博客升级到VuePress
date: 2021-01-26
categories: [Blog]
tags: [blog, vuepress]
---

之前的系统


我的迁移过程是，

- 初始化一个 VuePress 项目
- 配置好对应的主题，运行起来
- 把原始文章迁移过来
- 把图片等资源迁移过来
- 检查

其中遇到了几个问题，比如

:::tip vuepress默认不支持 markdown 后缀
文件不是特别多，我就把原来 markdown 的文件改成了 md 的后缀
:::

:::tip 部分文件不显示
首先发现有些文章没有配置 categories 就不显示。我先把这些文章的分类配置了。
:::