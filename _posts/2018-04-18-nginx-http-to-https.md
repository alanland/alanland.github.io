---
layout: post
title:  "Nginx HTTP to HTTPS"
date:   2018-04-18 12:43:37 +0000
tags:   [nginx, ssl]
author: Alan Wang
---

## http 访问跳转文件
`/nigxn/rewrite/index.html`

```html
<html>  
<meta http-equiv="refresh" content="0;url=https://your.domain.com/">  
</html>  
```

```perl
#user  root;
worker_processes  1;
#worker_rlimit_nofile: 65535;

error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  include    proxy.conf;

  log_format json '{"timestamp":"$time_iso8601",'
                    '"host":"$server_addr",'
                    '"clientip":"$remote_addr",'
                    '"remote_user":"$remote_user",'
                    '"request":"$request",'
                    '"http_user_agent":"$http_user_agent",'
                    '"size":$body_bytes_sent,'
                    '"request_body":"$request_body",'
                    '"responsetime":$request_time,'
                    '"uct":"$upstream_connect_time", '
                    '"uht":"$upstream_header_time", '
                    '"upstreamtime":"$upstream_response_time",'
                    '"upstreamhost":"$upstream_addr",'
                    '"http_host":"$host",'
                    '"url":"$uri",'
                    '"domain":"$host",'
                    '"xff":"$http_x_forwarded_for",'
                    '"referer":"$http_referer",'
                    '"status":"$status"}';
  access_log logs/access.log json;

  sendfile        on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout  65;

  gzip  on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_static on;
  gzip_comp_level 5;
  gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_vary off;
  gzip_disable "MSIE [1-6]\.";

  upstream server {
      ip_hash;
      server 127.0.0.1:7810;
  }

  server {  
    listen 80;  
    server_name your.domain.com;  
    location / {
        root /nigxn/rewrite;  
    }  
    #将404的页面重定向到https的首页  
    error_page  404 https://your.domain.com/;  
  }  

  server {
    listen       443;
    server_name  your.domain.com;
    error_page 497  https://$host$uri?$args;  
    ssl on;    #开启ssl支持
    ssl_certificate      /nignx/ssl/your.domain.com.pem;    #指定服务器证书路径
    ssl_certificate_key  /nginx/ssl/your.domain.com.key;    #指定私钥证书路径
    ssl_session_timeout  5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;     #指定SSL服务器端支持的协议版本
    #ssl_ciphers  ALL：!ADH：!EXPORT56：RC4+RSA：+HIGH：+MEDIUM：+LOW：+SSLv2：+EXP;    #指定加密算法
    ssl_prefer_server_ciphers   on;    #在使用SSLv3和TLS协议时指定服务器的加密算法要优先于客户端的加密算法
    root  /nginx/webapps;
    autoindex on;

    location / {
        root   /root/app/zhw-client/html;
        index  index.html index.htm;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|js|json|css|woff|woff2|ttf|html|coffee|map|mp3|wav)$ {
      expires      0d;
    }
    location ~ .*$ {
      proxy_set_header Host $host:7810;
      proxy_set_header X-Real-IP           $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_pass http://server;
    }
    location ~ ^/(WEB-INF)/ {
      deny all;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   html;
    }
  }
}

```
