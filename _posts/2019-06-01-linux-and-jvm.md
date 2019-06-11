---
layout: post
title:  "Linux常用运维命令"
date:   2019-06-01 12:23:37 +0000
tags:   [linux, jvm]
author: Alan Wang
---

## 查看进程
```sh
ps aux |grep tomcat
```

## 查看线程状态
```sh
ps -T -p $PID|wc -l
ps -Lf $PID|wc -l 
```

## 查看连接
```sh
# 连接数
ss -ltp | grep $PID | wc -l
ss -stp | grep $PID | wc -l

# 连接时间
ss -tn -o
ss -stpn -o | grep $PID
# 根据第一列排序
ss -stpn -o | grep $PID | sort -t1

# Display Currently Established, Closed, Orphaned and Waiting TCP sockets
ss -s
netstat -s

# Display All Open Network Ports
ss -l
netstat -tulpn

# Display All TCP Sockets
ss -t -a
netstat -nat


```

## 内存

### Linux 内存
```sh
pmap -x/d/X $PID
```
- Address: 内存开始地址
- Kbytes: 占用内存的字节数（KB）
- RSS: 保留内存的字节数（KB）
- Dirty: 脏页的字节数（包括共享和私有的）（KB）
- Mode: 内存的权限：read、write、execute、shared、private (写时复制)
- Mapping: 占用内存的文件、或[anon]（分配的内存）、或[stack]（堆栈）
- Offset: 文件偏移
- Device: 设备名 (major:minor)

### JVM堆外内存分析 NMT(native memory tracking)

```sh
# -XX:NativeMemoryTracking=[off | summary | detail]
-XX:NativeMemoryTracking=detail
```

### jcmd

```sh
# 列出所有支持的命令    
jcmd $PID help
```

```sh
 # jcmd pid VM.native_memory [summary | detail | baseline | summary.diff | detail.diff | shutdown] [scale= KB | MB | GB]
 jcmd pid VM.native_memory detail
 ```

 ## 两种内存溢出

 ###   java.lang.OutOfMemoryError: Java heap space



 ###   java.lang.OutOfMemoryError: native memory exhausted



The best answer comes from an article written a while back explaining the memory layout of the JVM: Thanks for the Memory

A good thing to understand about native outofmemory is that the underlying cause is not easily understood from any of the regular debug methods (heapdumps, system core files). More recent versions of the JVM do produce javacores that contain some insight into the most common of the native memory culprits (DBBs, classloader,too large Xmx value). However one should expect to have to rule out the most common causes first and then seek more invasive native memory tracing in an iterative process of finding the trigger.

Start with the "Thanks for the Memory" article to understand the JVM memory model. If java.lang.OutOfMemoryError: Java heap space is the problem, then use the MAT tool to investigate a heapdump that was produced by the OutOfMemory (OOM). If java.lang.OutOfMemoryError: native memory exhausted is the problem, first check that there are adequate resources for your application serving environment. Check the [ulimits](http://www-01.ibm.com/support/docview.wss?uid=swg21469413). Then check the NATIVEMEMINFO section of a javacore created from a NOOM and determine the largest native memory consumers. Then determine which components may contribute to this native memory.

Additional troubleshooting steps: [Troubleshooting native memory issues](http://www-01.ibm.com/support/docview.wss?uid=swg21373312)
