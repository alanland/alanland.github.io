---
layout: post
title:  "TCPDump Wireshark"
date:   2017-04-17 20:49:17 +0000
img:  docker-jekyll.jpg
description: TCPDump Wireshark
categories: docker
tags:   [netwark, tcpdump, wireshark]
author: Alan Wang
---
`tcpdump`是Linux自带的抓包工具，支持针对网络层. 协议. 主机. 网络或端口的过滤，
并提供 and. or. not等逻辑语句来帮助你去掉无用的信息。

我这里用`Wireshark`配合进行分析，那么只需要将所有信息保存下来即可：

```
sudo tcpdump -w tcp.cap
```

将文件下载到本地用`Wireshark`打开即可。

需要过滤特定端口的HTTP POST请求，过滤表达式为：

```
tcp and tcp.port == 80 and http.request.method == "POST"
```


### TCPDump
命令格式：

```
tcpdump [ 选项 ] [ -c 数量 ] [ -i 网络接口 ] [ -w 文件名 ] [ 表达式 ]
```

常用选项：

- -l：使标准输出变为缓冲行形式；
- -c：抓包次数；
- -nn：直接以 IP 及 Port Number 显示，而非主机名与服务名称；
- -s ：<数据包大小> 设置每个数据包的大小；
- -i：指定监听的网络接口；
- -r：从指定的文件中读取包；
- -w：输出信息保存到指定文件；
- -a：将网络地址和广播地址转变成名字；
- -d：将匹配信息包的代码以人们能够理解的汇编格式给出；
- -e：在输出行打印出数据链路层的头部信息；
- -f：将外部的Internet地址以数字的形式打印出来；
- -t：在输出的每一行不打印时间戳；
- -v ：输出稍微详细的报文信息；加一个v更详细。

示例：
```
sudo tcpdump -i eth0 -nn 'tcp'
sudo tcpdump -i eth0 -nn 'host 192.168.1.231'
sudo tcpdump -i wlan0 tcp port 80 -n -s 0 -w tcp33333.cap
sudo tcpdump -i wlan0 -nnA 'port 80 and src host 192.168.1.123'
sudo tcpdump -i wlan0 tcp port 80 -n -s 0 -w tcp.cap
```


### 网络上的一些示例
1. 截获eth0网卡10次收发所有数据包并将抓包结果保存到test文件,再读取test抓包结果文件
```
tcpdump i eth0 c 10 w test
tcpdump r test
```
2. 截获来访问80端口的所有数据包（指定端口范围portrange 1-1024）
```
tcpdump port 80
```
3. 截获所有来自主机114.254.151.51的进出所有数据包
```
tcpdump host 114.254.151.51
```
4. 截获ip包中源地址是114.254.151.51的（目的是dst）
```
tcpdump src 114.254.151.51
```
5. 截获主机114.254.151.51和主机114.254.151.52的通信
```
tcpdum host 114.254.151.51 and 114.254.151.52
```
6. 截获tcp协议并且源地址114.254.151.51来访问80的端口
```
tcpdump tcp and src 114.254.151.51 and port 80
```
7. 截获主机114.254.151.51除了和114.254.151.52之外的所有ip包
```
tcpdump ip host 114.254.151.51 and ! 114.254.151.52
```
8. 截获长度大于1000数据包,对于DDOS攻击时，可以使用
```
tcpdump -i eth0 greater 1000
```
