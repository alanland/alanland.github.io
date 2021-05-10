---
title:  "康威定律"
date:   2021-04-30 15:14:06
tags:   []
categories: [架构]
---

## 起源

Conway’s law 最初来自于Conway在1967年发表的论文
[《How Do Committees Invent?》](http://www.melconway.com/Home/pdf/committees.pdf)，之后在《人月神话》
这本书中引用了论文的结论，并命名为康威定律（Conway’s law）得以推广。

> Conway’s law: Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations. - Melvin Conway(1967)
>
> 设计系统的组织其产生的设计等价于组织间的沟通结构。

反向理解：

> Conway’s law reversed：You won’t be able to successfully establish an efficient organizational structure that is not supported by your system architecture design.
>
> 如果系统架构不支持，你无法建立一个高效的组织。

## 解读
Mike Amundsen 归纳了如下四个核心观点:

### 第一定律

> Communication dictates the design
> 
> 组织沟通方式会通过系统设计表达出来

对于复杂的，需要协作完成的系统开发，沟通是必须要持续提升的问题。
每个团队由5-10人组成（沟通成本 = n(n-1)/2 - 《人月神话》），在团队内部进行频繁的、细粒度的沟通。对于团队外部，定义好接口，契约，只进行粗粒度的沟通。这样可以降低沟通成本，同时也符合高内聚，低耦合原则（代码和人员管理有些时候真是相通的）。

### 第二定律
> There is never enough time to do something right, but there is always enough time to do it over
> 
> 时间再多一件事情也不可能做的完美，但总有时间做完一件事情

这就是我们在用kanban管理迭代时几乎都有一列是BAU（Business As Usual ），其中会包括一些日常修复的Bug Story。敏捷开发中将迭代引入，做到持续交付，快速验证，迅速反馈，持续改进。

### 第三定律
> There is a homomorphism from the linear graph of a system to the linear graph of its design organization
> 
> 线型系统和线型组织架构间有潜在的异质同态特性

大白话就是，你想要架构成为什么样，就将团队分成怎样的结构。比如前后端分离的团队，架构就是基于前后端分离。在基于微服务设计的团队里，一个很好的理念是自管理。团队内部对于自己所负责的模块高度负责，进行端对端的开发以及运维。

### 第四定律
> The structures of large systems tend to disintegrate during development, qualitatively more so than with small systems
> 
> 大的系统组织总是比小系统更倾向于分解

合久必分，分久必合，团队以及架构都是在不断优化的。一个团队随着人员的增加，沟通以及管理成本一定会增加。

---
来源：
- https://www.jianshu.com/p/ba2d444c89d2
