---
layout: post
title:  "SSH over SSH"
date:   2017-12-12 15:23:37 +0000
tags:   [linux, memory]
author: Alan Wang
---

## 手动释放

```sh
sync && echo 3 > /proc/sys/vm/drop_caches
```


## free 命令


`free` 命令：

```sh
$ free -h
             total       used       free     shared    buffers     cached
Mem:           31G        15G        16G        18M       728M       5.9G
-/+ buffers/cache:       8.8G        22G
Swap:           0B         0B         0B
```

第一行：

- total：物理内存的总大小
- used：已经使用的物理内存大小
- free：空闲的物理内存大小
- shared：多个进程共享的内存大小
- buffers/cached：磁盘缓存的大小

第二行`Mem`: 代表物理内存使用情况

第三行`(-/+ buffers/cached)`: 代表磁盘缓存使用状态

- -buffers/cache (已用)的内存数:used - buffers - cached
- +buffers/cache(可用)的内存数:free + buffers + cached

第四行`Swap`: 表示交换空间内存使用状态


## ---
free命令输出的内存状态，可以通过两个角度来查看：一个是从内核的角度来看，一个是从应用层的角度来看的。

从内核的角度来查看内存的状态

就是内核目前可以直接分配到，不需要额外的操作，即为上面free命令输出中第二行Mem项的值，可以看出，此系统物理内存有3894036K，空闲的内存只有420492K，也就是40M多一点，我们来做一个这样的计算：

3894036 – 3473544 = 420492

其实就是总的物理内存减去已经使用的物理内存得到的就是空闲的物理内存大小，注意这里的可用内存值420492并不包含处于buffers和cached状态的内存大小。

如果你认为这个系统空闲内存太小，那你就错了，实际上，内核完全控制着内存的使用情况，Linux会在需要内存的时候，或在系统运行逐步推进时，将buffers和cached状态的内存变为free状态的内存，以供系统使用。

从应用层的角度来看系统内存的使用状态

也就是Linux上运行的应用程序可以使用的内存大小，即free命令第三行 -/+ buffers/cached 的输出，可以看到，此系统已经使用的内存才2068224K，而空闲的内存达到1825812K，继续做这样一个计算：

420492＋（72972＋1332348）＝1825812

通过这个等式可知，应用程序可用的物理内存值是Mem项的free值加上buffers和cached值之和，也就是说，这个free值是包括buffers和cached项大小的，`对于应用程序来说，buffers/cached占有的内存是可用的，因为buffers/cached是为了提高文件读取的性能，当应用程序需要用到内存的时候，buffers/cached会很快地被回收，以供应用程序使用`。

buffers与cached的异同

在Linux 操作系统中，当应用程序需要读取文件中的数据时，操作系统先分配一些内存，将数据从磁盘读入到这些内存中，然后再将数据分发给应用程序；当需要往文件中写数据时，操作系统先分配内存接收用户数据，然后再将数据从内存写到磁盘上。然而，如果有大量数据需要从磁盘读取到内存或者由内存写入磁盘时，系统的读写性能就变得非常低下，因为无论是从磁盘读数据，还是写数据到磁盘，都是一个很消耗时间和资源的过程，在这种情况下，Linux引入了buffers和cached机制。

buffers与cached都是内存操作，用来保存系统曾经打开过的文件以及文件属性信息，这样当操作系统需要读取某些文件时，会首先在buffers与cached内存区查找，如果找到，直接读出传送给应用程序，如果没有找到需要数据，才从磁盘读取，这就是操作系统的缓存机制，通过缓存，大大提高了操作系统的性能。但buffers与cached缓冲的内容却是不同的。

`buffers是用来缓冲块设备做的，它只记录文件系统的元数据（metadata）以及 tracking in-flight pages，而cached是用来给文件做缓冲`。更通俗一点说：buffers主要用来存放目录里面有什么内容，文件的属性以及权限等等。而cached直接用来记忆我们打开过的文件和程序。

---

- [linux内存中buffer和 cached的比较](http://blog.csdn.net/heweimingming/article/details/52230293)
- [手动释放linux内存cache](https://linux.cn/article-211-1.html)