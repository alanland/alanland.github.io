---
title:  "Linux: Find Out Which Process Is Listening Upon a Port"
date:   2017-06-20 12:27:37 +0000
tags:   [linux]
categories: [DevOps]
---

## netstat

```shell
$ netstat -tulpn

$ ls -l /proc/1138/exe
```

```shell
$ netstat -tulpn | grep :80
```

## fuser

```shell
$ fuser 7000/tcp
```

## lsof

```shell
$ lsof -i :portNumber 
$ lsof -i tcp:portNumber 
$ lsof -i udp:portNumber 
$ lsof -i :80
$ lsof -i :80 | grep LISTEN
```

```shell
$ ps aux | grep '[1]616'
```

[原文](https://www.cyberciti.biz/faq/what-process-has-open-linux-port/)

---
END
