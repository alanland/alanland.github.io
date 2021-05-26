---
title:  "『技术雷达』SPA Injection"
date:   2021-04-30 15:54:39
tags:   [tech-radar]
categories: [TechRadar]
---

## Quadrant: `技术`

## Ring: `评估` 2021-04-30

`strangler fig pattern`[绞杀榕模式](https://martinfowler.com/bliki/StranglerFigApplication.html)常被作为老旧系统现代化改造的默认策略，这种模式下，新代码包围在旧代码周围，慢慢实现旧代码的功能。
向农村包围城市一样，由外而内的进行改造。单页应用注入`由内而外`地进行旧系统改造，向旧系统嵌入新的HTML替换旧功能逐渐完成系统改造。
由于增加了新的代码，系统会下载更多的内容，页面加载会变慢。

## 网站

- [https://backstage.io/](https://backstage.io/)
