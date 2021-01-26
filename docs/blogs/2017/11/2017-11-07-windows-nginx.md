---
title:  "Windows Nginx"
date:   2017-11-07 05:57:37 +0000
tags:   [windows, nginx]
---

- http://nginx.org/en/docs/windows.html

## 启动

```
cd c:\
unzip nginx-1.13.6.zip
cd nginx-1.13.6
start nginx
```

## 查看进程

```
C:\nginx-1.13.6>tasklist /fi "imagename eq nginx.exe"

Image Name           PID Session Name     Session#    Mem Usage
=============== ======== ============== ========== ============
nginx.exe            652 Console                 0      2 780 K
nginx.exe           1332 Console                 0      3 112 K
```

## 配置路径使用 UNIX-style

```
access_log   logs/site.log;
root         C:/web/html;
```

## 其他操作

```
nginx -s stop	fast shutdown
nginx -s quit	graceful shutdown
nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	re-opening log files
```


---
END

