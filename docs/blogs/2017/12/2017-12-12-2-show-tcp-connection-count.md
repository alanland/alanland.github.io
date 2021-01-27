---
title:  "SSH over SSH"
date:   2017-12-12 14:23:37
tags:   [linux]
---

# 查看哪些IP连接本机

```sh
netstat -an
```

# 查看TCP连接数
1. 统计80端口连接数

```sh
netstat -nat|grep -i "80"|wc -l
```

2. 统计httpd协议连接数

```sh
ps -ef|grep httpd|wc -l
```

3. 统计已连接上的，状态为 `established`

```sh
netstat -na|grep ESTABLISHED|wc -l
```

4)、查出哪个IP地址连接最多,将其封了

```sh
netstat -na|grep ESTABLISHED|awk {print $5}|awk -F: {print $1}|sort|uniq -c|sort -r +0n

netstat -na|grep SYN|awk {print $5}|awk -F: {print $1}|sort|uniq -c|sort -r +0n
```


---

- [查看linux中的TCP连接数](http://blog.csdn.net/he_jian1/article/details/40787269)

