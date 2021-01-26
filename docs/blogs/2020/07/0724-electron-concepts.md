---
title: Electron 概念
date: 2020-07-24T13:54:51.428Z
categories:
 - Web
tags:
 - electron
---

## Main and Renderer Processes

`package.json` 启动的 main 线程称为主线程。主线程只有一个，可以通过创建 web pages 来显示 GUI。

Electron 使用 Chromium 的多线程架构用来显示页面。每个页面都有一个它自己的线程，称之为 Renderer Processes。



- [Electron Application Architecture
](https://www.electronjs.org/docs/tutorial/application-architecture)