---
layout: post
title:  "Nginx Basic HTTP Authentication"
date:   2018-04-18 16:43:37 +0000
tags:   [nginx]
author: Alan Wang
---

## Nginx配置

```conf
server{
  server_name  www.com;

  index index.html index.php;
  root /data/site/www.com;       

  location /
  {
    auth_basic "nginx basic http test for ttlsa.com";
    auth_basic_user_file /conf/htpasswd; 
    autoindex on;
  }
}
```

## 密码文件
格式：
```sh
ttlsauser1:password1
ttlsauser2:password2:comment
```

生成密码：

```sh
# printf "ttlsa:$(openssl passwd -crypt 123456)\n" >>conf/htpasswd
# cat conf/htpasswd 
ttlsa:xyJkVhXGAZ8tM
```