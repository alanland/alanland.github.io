---
layout: post
title:  "Docker HAProxy"
date:   2017-11-21 17:23:37 +0000
tags:   [docker, haproxy]
author: Alan Wang
---


## Run with Docker

### use dockerfile

`Dockerfile`

```
FROM haproxy:1.7
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
```

build

```
docker build -t my-haproxy .
```

test configuration

```
docker run -it --rm --name haproxy-syntax-check my-haproxy haproxy -c -f /usr/local/etc/haproxy/haproxy.cfg
```

run

```
docker run -d --name my-running-haproxy my-haproxy
```

### via bind mount

```
docker run -d --name my-running-haproxy -v /path/to/etc/haproxy:/usr/local/etc/haproxy:ro haproxy:1.7
```

### reloading config

```
docker kill -s HUP my-running-haproxy
```

## Use compose

```yml
version: "2"
services:
  haproxy:
    image: haproxy:1.7
    container_name: haproxy
    hostname: haproxy
    restart: always
    ports:
     - "4369:4369"
    volumes:
     - /etc/timezone:/etc/timezone
     - $PWD/haproxy:/usr/local/etc/haproxy:ro
    extra_hosts:
     - "rabbit81:172.16.120.81"

```

## 配置实例

```coffee
###########全局配置#########
global
    log 127.0.0.1   local0 #[日志输出配置，所有日志都记录在本机，通过local0输出]
    log 127.0.0.1   local1 notice  #定义haproxy 日志级别[error warringinfo debug]
        daemon      #以后台形式运行harpoxy
        nbproc 1   #设置进程数量
        pidfile /home/haproxy/haproxy/conf/haproxy.pid   #haproxy 进程PID文件
    ulimit-n 819200   #ulimit 的数量限制
    maxconn 4096    #默认最大连接数,需考虑ulimit-n限制
        #chroot /usr/share/haproxy #chroot运行路径
    uid 99                    #运行haproxy 用户 UID
        gid 99                    #运行haproxy 用户组gid
        #debug      #haproxy 调试级别，建议只在开启单进程的时候调试
        #quiet

########默认配置############
defaults
    log global
        mode http               #默认的模式mode { tcp|http|health }，tcp是4层，http是7层，health只会返回OK
        option  httplog         #日志类别,采用httplog
    option  dontlognull     #不记录健康检查日志信息
    retries 2               #两次连接失败就认为是服务器不可用，也可以通过后面设置
    option  forwardfor   #如果后端服务器需要获得客户端真实ip需要配置的参数，可以从Http Header中获得客户端ip
    option  httpclose    #每次请求完毕后主动关闭http通道,haproxy不支持keep-alive,只能模拟这种模式的实现
        #option redispatch       #当serverId对应的服务器挂掉后，强制定向到其他健康的服务器，以后将不支持
        option abortonclose     #当服务器负载很高的时候，自动结束掉当前队列处理比较久的链接
        maxconn 4096            #默认的最大连接数
        timeout connect  5000ms  #连接超时
        timeout client 30000ms  #客户端超时
        timeout server 30000ms  #服务器超时
        #timeout check 2000      #心跳检测超时
    #timeout http-keep-alive10s   #默认持久连接超时时间
    #timeout http-request   10s   #默认http请求超时时间
        #timeoutqueue          1m     #默认队列超时时间
    balance roundrobin    #设置默认负载均衡方式，轮询方式
        #balance source        # 设置默认负载均衡方式，类似于nginx的ip_hash
        #balnace leastconn     #设置默认负载均衡方式，最小连接数

########统计页面配置########
listen admin_stats
        bind 0.0.0.0:1080               #设置Frontend和Backend的组合体，监控组的名称，按需要自定义名称
        mode http                       #http的7层模式
        option httplog                  #采用http日志格式
        #log 127.0.0.1 local0 err       #错误日志记录
        maxconn 10                      #默认的最大连接数
        stats refresh 30s               #统计页面自动刷新时间
        stats uri /stats                #统计页面url
        stats realm XingCloud\ Haproxy  #统计页面密码框上提示文本
        stats auth admin:admin     #设置监控页面的用户和密码:admin,可以设置多个用户名
        stats auth  Frank:Frank   #设置监控页面的用户和密码：Frank
        stats hide-version              #隐藏统计页面上HAProxy的版本信息
    stats  admin if TRUE       #设置手工启动/禁用，后端服务器(haproxy-1.4.9以后版本)

########设置haproxy 错误页面#####
errorfile 403  /home/haproxy/haproxy/errorfiles/403.http
errorfile 500 /home/haproxy/haproxy/errorfiles/500.http
errorfile 502 /home/haproxy/haproxy/errorfiles/502.http
errorfile 503 /home/haproxy/haproxy/errorfiles/503.http
errorfile 504 /home/haproxy/haproxy/errorfiles/504.http

########frontend前端配置##############
bind *:80
    #这里建议使用bind *:80的方式，要不然做集群高可用的时候有问题，vip切换到其他机器就不能访问了。
    acl web hdr(host) -i www.abc.com
    #acl后面是规则名称，-i是要访问的域名，
    acl img hdr(host) -i img.abc.com
    如果访问www.abc.com这个域名就分发到下面的webserver 的作用域。
    #如果访问img.abc.com.cn就分发到imgserver这个作用域。
    use_backend webserver if web
    use_backend imgserver if img

########backend后端配置##############
backend webserver             #webserver作用域
    mode http
    balance   roundrobin
    #banlance roundrobin 轮询，balance source 保存session值，支持static-rr，leastconn，first，uri等参数
    option  httpchk /index.html HTTP/1.0  #健康检查
    #检测文件，如果分发到后台index.html访问不到就不再分发给它
    server  web1 10.16.0.9:8085 cookie 1 weight 5 check inter 2000 rise 2 fall 3
    server  web2 10.16.0.10:8085 cookie 2 weight 3 check inter 2000 rise 2 fall 3
    #cookie 1表示serverid为1，check inter 1500 是检测心跳频率
    #rise 2是2次正确认为服务器可用，fall 3是3次失败认为服务器不可用，weight代表权重
backend imgserver
    mode http
    option  httpchk /index.php
    balance     roundrobin
    server      img01 192.168.137.101:80  check inter 2000 fall 3
    server      img02 192.168.137.102:80  check inter 2000 fall 3

########tcp配置#################
listen test1
        bind 0.0.0.0:90
        mode tcp
    option  tcplog          #日志类别,采用tcplog
        maxconn 4086
        #log 127.0.0.1 local0 debug
        server s1 10.18.138.201:80  weight 1
        server s2 10.18.102.190:80  weight 1
```

- [Docker HAProxy](https://hub.docker.com/_/haproxy/)

