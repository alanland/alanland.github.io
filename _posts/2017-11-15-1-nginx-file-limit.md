---
layout: post
title:  "Linux/Nginx: Open File Limit"
date:   2017-11-15 09:17:37 +0000
tags:   [linux, nginx, ulimit]
author: Alan Wang
---


## Nginx

`Too Many Open Files`

### 设置

1. 应用级别 `nginx.conf`
  - `worker_rlimit_nofile` ：限制单个工作进程打开的最大文件数
2. 系统级别
  - `/etc/security/limits.conf`
3. 内核级别 `fs.file-max`
  - file-max的默认值大概是系统内存的10%（系统内存以kb计算），别设置的比系统默认的还小

### 验证

1. 验证nginx程序的限制

```sh
$ ps -ef |grep nginx
# 将得出的PID XXX带入下面
$ cat /proc/XXX/limits
```

2. 验证系统级别的限制

```
$ ulimit -n
```

3. 验证内核级别的限制

```
$ cat /proc/sys/fs/file-max
```

## 系统最大打开文件描述符数

### get

```
cat /proc/sys/fs/file-max
```

### set

临时

```
echo 1000000 > /proc/sys/fs/file-max
```

永久

`/etc/sysctl.conf`

```
fs.file-max = 1000000
```

## 进程最大打开文件描述符数

user limit中nofile的soft limit

### get
```
ulimit -n
ulimit -Hn # hard limit
ulimit -Sn # soft limit
```

### set

soft limit不能大于hard limit

临时(当前Session)

```
ulimit -Sn 65355
ulimit -Hn 65355
ulimit -n 1800000 # 同时设置soft limit和hard limit
```

永久

`/etc/security/limits.conf`

增加：

```
chanon           soft    nofile          1800000
chanon           hard   nofile          2000000
```

重启生效。

设置nofile的hard limit还有一点要注意的就是hard limit
不能大于`/proc/sys/fs/nr_open`。否则无法正常登录。

## 查看当前系统使用的打开文件描述符数

```sh
$ cat /proc/sys/fs/file-nr
5664        0        186405
```

- 第一个数表示当前系统已分配使用的打开文件描述符数，
- 第二个数为分配后已释放的（目前已不再使用），
- 第三个数等于file-max。

```sh
ulimit -u
```

## /proc 目录

/proc 目录包括很多系统当前状态的参数

- /proc/meminfo
- /proc/cpuinfo
- /proc/sys/fs/file-max #系统总限制
- /proc/sys/fs/file-nr #整个系统目前使用的文件句柄数量


---

- [Linux最大打开文件描述符数](http://blog.csdn.net/superchanon/article/details/13303705)
- [linux /etc/security/limits.conf的相关说明](http://blog.csdn.net/taijianyu/article/details/5976319)
- [使用ulimit 命令、/etc/security/limits.conf、proc 调整系统参数](http://www.jianshu.com/p/23ee9db2a620)
- [Nginx: Too Many Open Files解决方案汇总](http://blog.csdn.net/jacson_bai/article/details/42171637)

---