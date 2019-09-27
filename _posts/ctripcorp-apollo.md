---
layout: post
title:  "Kubernetes Dashboard UI"
date:   2018-04-19 14:23:37 +0000
tags:   [kubernetes, k8s]
author: Alan Wang
---

https://github.com/ctripcorp/apollo/wiki/Java客户端使用指南#32-spring整合方式
https://github.com/ctripcorp/apollo?spm=a2c4e.11153940.blogcont74601.14.26a8493eHmLda6
https://yq.aliyun.com/articles/74601
https://github.com/ctripcorp/apollo/wiki/Apollo核心概念之“Namespace”?spm=a2c4e.11153940.blogcont74601.23.26a8493eHmLda6
https://github.com/ctripcorp/apollo/wiki/Quick-Start?spm=a2c4e.11153940.blogcont74601.16.26a8493eHmLda6

https://github.com/ctripcorp/apollo/wiki/Apollo-Quick-Start-Docker部署


# Nginx 

## 配置upstream
```perl

    upstream server {
        ip_hash;
        server 127.0.0.1:7810; # 请修改
    }
```
## 配置location
```perl

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|js|json|css|woff|woff2|ttf|html|coffee|map|mp3|wav)$ {
          expires      0d;
        }
        location ~ api/.*$ {
          proxy_set_header X-Real-IP           $remote_addr;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_pass http://server;
        }
        location ~ rest/.*$ {
          proxy_set_header X-Real-IP           $remote_addr;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_pass http://server;
        }
        location ~ {
            root   /zhw-client/html;
            index  index.html index.htm;
        }
        location / {
            root   /zhw-client/html;
            index  index.html index.htm;
        }
```

## 代码  
`dist.zip`解压值自定义目录，替换配置中的 `/zhw-client/html`


# Tomcat

war包部署到tomcat的根目录

# 数据库服务器