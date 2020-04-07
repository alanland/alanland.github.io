---
layout: post
title:  "Kubernetes Error delete Pod"
date:   2019-10-24T16:46:42.992Z
tags:   [ngixn]
categories: [Cloud]
author: Alan Wang
---

net::ERR_INCOMPLETE_CHUNKED_ENCODING



2019/10/24 16:43:04 [crit] 11624#11624: *110870 open() "/home/ttx/app/openresty/nginx/proxy_temp/6/11/0000000116" failed (13: Permission denied) while reading upstream, client: 116.228.49.178, server: demo.loghub.com, request: "GET /html/loginPage.html HTTP/1.1", upstream: "http://192.168.23.65:80/html/loginPage.html", host: "demo.loghub.com"
2019/10/24 16:43:05 [crit] 11624#11624: *110872 open() "/home/ttx/app/openresty/nginx/proxy_temp/7/11/0000000117" failed (13: Permission denied) while reading upstream, client: 116.228.49.178, server: demo.loghub.com, request: "GET /html/loginPage.html HTTP/1.1", upstream: "http://192.168.23.65:80/html/loginPage.html", host: "demo.loghub.com"
2019/10/24 16:43:06 [crit] 11625#11625: *110874 open() "/home/ttx/app/openresty/nginx/proxy_temp/8/11/0000000118" failed (13: Permission denied) while reading upstream, client: 116.228.49.178, server: demo.loghub.com, request: "GET /html/loginPage.html HTTP/1.1", upstream: "http://192.168.23.65:80/html/loginPage.html", host: "demo.loghub.com"
2019/10/24 16:43:08 [crit] 11625#11625: *110877 open() "/home/ttx/app/openresty/nginx/proxy_temp/9/11/0000000119" failed (13: Permission denied) while reading upstream, client: 116.228.49.178, server: demo.loghub.com, request: "GET /html/loginPage.html HTTP/1.1", upstream: "http://192.168.23.65:80/html/loginPage.html", host: "demo.loghub.com"


ll /home/ttx/app/openresty/nginx/proxy_temp
总用量 48
drwx------  12 ttx  root 4096 6月  12 17:12 ./
drwxr-xr-x  14 ttx  ttx  4096 8月  21 19:46 ../
drwx------ 102 root root 4096 6月  28 16:57 0/
drwx------ 102 root root 4096 6月  28 17:24 1/
drwx------ 102 root root 4096 8月   1 11:17 2/
drwx------ 102 root root 4096 6月  25 09:47 3/
drwx------ 102 root root 4096 7月   4 16:14 4/
drwx------ 102 root root 4096 6月  29 13:34 5/
drwx------ 102 root root 4096 6月  20 16:23 6/
drwx------ 102 root root 4096 6月  25 10:16 7/
drwx------ 102 root root 4096 6月  25 10:24 8/
drwx------ 102 root root 4096 6月  25 10:28 9/

chown ttx.ttx /home/ttx/app/openresty/nginx/proxy_temp -R

---

