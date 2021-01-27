---
title:  "Nginx Upstream"
date:   2017-11-08 05:57:37
tags:   [nginx]
categories: [DevOps]
---

```perl
user  root;
worker_processes  1;
events {
  worker_connections  1024;
}
http {
  include mime.types;
  default_type  application/octet-stream;
  include proxy.conf;
  sendfile on;
  keepalive_timeout 65;
  upstream xoms {
    server localhost:7001;
    server localhost:7002;
  }
  server {
    listen       80;
    server_name  localhost;
    root  /app/nginx/webapps/dist/v2.4;
    location / {
      proxy_pass http://xoms;
      proxy_set_header Host                $host;
      proxy_set_header X-Real-IP           $remote_addr;
      proxy_set_header X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
    location ~ /js/oms/ {
      proxy_pass http://xoms;
    }
    location ~ /css/oms/ {
      proxy_pass http://xoms;
    }
    location ~ /images/prod-name.png {
      proxy_pass http://xoms;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|js|json|css|woff|woff2|ttf|html|coffee|map|mp3|wav)$ {
      expires      0d;
    }
    location ~ .*$ {
      proxy_set_header Host $host:7101;
      proxy_set_header X-Real-IP           $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_pass http://xoms;
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
