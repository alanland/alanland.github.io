---
layout: post
title:  "Aliyun Kubernetes LBS"
date:   2019-05-24 12:23:37 +0000
tags:   [kubernetes, lbs, aliyun]
author: Alan Wang
---

## Java CPU 和 PSU 版本解释
2014 年 10 月 14 日

从 2014 年 10 月发布 Java SE 7 Update 71 (Java SE 7u71) 开始，Oracle 将在发布重要补丁更新 (CPU) 的同时发布相应的 Java SE 7 补丁集更新 (PSU)。

## 我应当选择哪个 Java 版本：CPU 还是 PSU？
Oracle 强烈建议所有 Java SE 用户升级到相应版本系列的最新 CPU 版本。大多数用户应当选择 CPU 版本。

仅当用户受到版本说明中所述的该版本所修复的其他漏洞的影响时才应使用相应的 PSU 版本。

后续 CPU 版本将包含当前 PSU 的所有修复。鉴于此，组织应当测试其环境中的当前 PSU，这些修复将包含在下一个 CPU 中。

## Java CPU 与 PSU 之间的区别？
Java SE 重要补丁更新 (CPU) 包含安全漏洞修复和重要漏洞修复。Oracle 强烈建议所有 Java SE 用户及时升级到最新的 CPU 版本。Java SE CPU 版本号采用奇数编号（即 7u71、7u65 — 有关 Java SE 版本编号方式的详细信息，请点击这里）。

Java SE 补丁集更新 (PSU) 包含相应 CPU 中的所有修复以及其他非重要修复。仅当您受到该版本中其他漏洞的影响时才应当使用 Java PSU。版本说明列出了 Java SE PSU 中的其他修复。

## CPU 版本的发布周期会改变吗？
与以往一样，根据常规 Oracle 重要补丁更新计划，Java SE CPU 版本将在距 1 月、4 月、7 月和 10 月的第 17 日最近的星期二发布。

从 2014 年 10 月发布 Java SE 7u71 (CPU) 和 Java SE 7u72 (PSU) 开始，Oracle 计划为每个 Java SE 7 CPU 额外发布一个相应的 PSU。除了相应 CPU 中的重要修复之外，PSU 版本将为组织和开发人员提供一些非重要修复。

---

- https://www.oracle.com/technetwork/cn/java/javase/cpu-psu-explained-2331472-zhs.html