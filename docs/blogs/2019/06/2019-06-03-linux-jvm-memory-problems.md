---
layout: post
title:  "两种内存溢出"
date:   2019-06-03 12:23:37 +0000
tags:   [linux, jvm, oom]
author: Alan Wang
---


The best answer comes from an article written a while back explaining the memory layout of the JVM: [Thanks for the Memory](https://www.ibm.com/developerworks/library/j-nativememory-linux/)

A good thing to understand about native outofmemory is that the underlying cause is not easily understood from any of the regular debug methods (heapdumps, system core files). More recent versions of the JVM do produce javacores that contain some insight into the most common of the native memory culprits (DBBs, classloader,too large Xmx value). However one should expect to have to rule out the most common causes first and then seek more invasive native memory tracing in an iterative process of finding the trigger.

Start with the "Thanks for the Memory" article to understand the JVM memory model. If `java.lang.OutOfMemoryError: Java heap space` is the problem, then use the MAT tool to investigate a heapdump that was produced by the OutOfMemory (OOM). If `java.lang.OutOfMemoryError: native memory exhausted` is the problem, first check that there are adequate resources for your application serving environment. Check the [ulimits](http://www-01.ibm.com/support/docview.wss?uid=swg21469413). Then check the NATIVEMEMINFO section of a javacore created from a NOOM and determine the largest native memory consumers. Then determine which components may contribute to this native memory.

Additional troubleshooting steps: [Troubleshooting native memory issues](http://www-01.ibm.com/support/docview.wss?uid=swg21373312)


## 

---
- Guidelines for setting ulimits (WebSphere Application Server)
- https://developer.ibm.com/answers/questions/174342/why-i-am-i-seeing-native-out-of-memory-issues-on-a/
