---
layout: post
title:  "书写工具的选择"
date:   2019-09-02 12:15:37 +0000
tags:   [booking]
author: Alan Wang
---

## gitbook

之前用的 gitbook 但是官方已经不支持 cli 了，不打算用他提供的服务，还是希望本地管理文件。

而老的 cli 插件有很多功能有些问题，准备寻找新的工具。

## bookdown

R 语言的一个包，可以用 Markdown 写文档写书，很多 R 的书籍都是用它写的，官网上有很多示例和文档。 

- https://bookdown.org
- https://bookdown.org/yihui/bookdown/
- 

## docsifyjs

- https://docsify.js.org/
- https://github.com/docsifyjs/awesome-docsify#showcase


## docusaurus

React 实现的，github 有 13.2K star。

- https://docusaurus.io


## vuepress

Vue 实现的，github 有 13.9K star。

- https://vuepress.vuejs.org
- https://github.com/vuejs/vuepress
- https://vuepress.gallery

gallery 里面有很多主题，Blog的例子， documentation 的只有一个：

- https://lusaxweb.github.io/vuesax/

这里面也有很多资源：

- https://github.com/ulivz/awesome-vuepress


## readthedocs

很棒的文档书写平台。

- https://readthedocs.org


## mkdocs

python 家族的一员

- https://www.mkdocs.org/#mkdocs

## sphinx / reStructuredText

python 家族的一员，很多文档都是用这个写的。以前用python的时候还专门研究过。

- https://zh-sphinx-doc.readthedocs.io/en/latest/intro.html



----

跟一个 npm trends 的链接吧：

- https://www.npmtrends.com/docsify-vs-docusaurus-vs-gitbook-vs-vuepress-vs-react-static-vs-docute

---

上面的方案其实有很多都是满足需求的，本来我计划用 bookdown ，以前在 coursera 上学过两门 R 数据分析的课程，语言和环境对我没有问题，但是考虑到 R 语言在我们的环境里面并未采用，所以持续集成对其他人不是很友好，最终还是决定用 node 生态里的产品， 比较倾向的是 docsifyjs 和 vuepress，本人比较熟悉 vue，所以先用 vuepress 尝试下。

