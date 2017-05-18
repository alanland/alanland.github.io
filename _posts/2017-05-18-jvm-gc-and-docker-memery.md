---
layout: post
title:  "Docker Memory and JVM GC"
date:   2017-05-18 11:27:37 +0000
tags:   [docker, jvm, gc, oom, java]
author: Alan Wang
---
最近服务器上有暴露一些内存问题，几个Tomcat Docker在某些业务场景内存使用会很大，然后超过DContainer的mem limit，
最终程序挂掉。

刚开始以为程序有问题，于是用Idea限制内存跑了一下。用 Spring Boot Admin 看了下实施的内存，发现内存回收
的很及时，也只用了`400M`不到的内存，而线上环境动辄几个G都能OOM。

排除了程序的原因，我把程序打包放到Tomcat里面，同样测试之后，也只用了几百M的内存，没有一直上升的迹象。

最后放在容器上面，不测不知道，一测吓一跳，主要有两个问题。

1. 容器停止后CPU等资源一下子就释放了，但是内存不释放，不管是`kill`掉还是`rm`掉都不释放。
 - 这就简介导致了，重启容器后容器内存占用会在原来的基础上增加
 - 当时也不是一直不是放，大概十分钟之后会释放
2. Tomcat占用比如400M内存，随着系统运行容器内存会一直上升，直至超过容器限制，然后容器就挂了。

网络上查找发现很多人都遇到相同的问题，去github上能看到很多相关的issue，有些人的解决方案是环境变量里加上
```
MALLOC_ARENA_MAX=4
```
但是有些人不管用，比如我测试下来这个并不能解决容器内存比Tomcat内存多很多的问题，可能能抑制其增长速度并偶尔让容器回收。

最后的解决方案呢，`先放弃Docker吧`。

放两张截图：

Tomcat上限500M，而容器的占用：

![](/assets/images/jvm-gc-and-docker-memery/mem1.png)

这个不知道什么情况，偶尔内存占用有点下降：

![](/assets/images/jvm-gc-and-docker-memery/mem2.png)

----

下面是相关的一些链接：

- http://stackoverflow.com/questions/24374854/docker-can-you-over-allocate-ram-tomcat
- https://github.com/moby/moby/issues/32788
- https://forums.docker.com/t/docker-and-java-dont-mix/21772
- http://hg.openjdk.java.net/jdk9/jdk9/hotspot/rev/5f1d1df0ea49


- http://trustmeiamadeveloper.com/2016/03/18/where-is-my-memory-java
- https://developers.redhat.com/blog/2017/03/14/java-inside-docker
- https://plumbr.eu/outofmemoryerror/gc-overhead-limit-exceeded
-

---
END
