---
layout: post
title:  "-bash: fork: retry: Resource temporarily unavailable"
date:   2019-02-27 11:23:37 +0000
tags:   [linux]
author: Alan Wang
---

-bash: fork: retry: Resource temporarily unavailable

1、总结系统限制有：

/proc/sys/kernel/pid_max #查系统支持的最大线程数，一般会很大，相当于理论值

/proc/sys/kernel/thread-max

max_user_process（ulimit -u） #系统限制某用户下最多可以运行多少进程或线程

/proc/sys/vm/max_map_count

硬件内存大小

2、Java虚拟机本身限制：

-Xms  #intial java heap size

-Xmx  #maximum java heap size

-Xss  #the stack size for each thread

3、查询当前某程序的线程或进程数

pstree -p `ps -e | grep java | awk '{print $1}'` | wc -l

或

pstree -p 3660 | wc -l

或

# pstack pid |grep LWP |wc -l

4、查询当前整个系统已用的线程或进程数

pstree -p | wc -l

1、 cat /proc/${pid}/status

2、pstree -p ${pid}

3、top -p ${pid} 再按H  或者直接输入 top -bH -d 3 -p  ${pid}

top -H

手册中说：-H : Threads toggle

加上这个选项启动top，top一行显示一个线程。否则，它一行显示一个进程。

4、ps xH

手册中说：H Show threads as if they were processes

这样可以查看所有存在的线程。

5、ps -mp <PID>

手册中说：m Show threads after processes

这样可以查看一个进程起的线程数。