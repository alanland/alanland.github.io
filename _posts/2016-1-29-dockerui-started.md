---
layout: post
title:  "DockerUI started"
date:   2016-01-29 23:29:37 +0000
tags:   [docker]
author: Alan Wang
---

[dockerui](https://github.com/crosbymichael/dockerui)。一个docker的可视化工具，能对进行管理。

```
$ docker run -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui

# Connect to a tcp socket:
$ docker run -d -p 9000:9000 --privileged dockerui/dockerui -e http://127.0.0.1:2375

# Expose DockerUI on 10.20.30.1:80
$ docker run -d -p 10.20.30.1:80:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui
```

Open your browser to http://<dockerd host ip>:9000

## nginx
First add the upstream conf to your nginx configuration :

```
upstream dockerui {
    server 172.17.42.1:9000;
}
```
Then here the sample vhost configuration :

```
server {
        listen 80;
        server_name dockerui.example.com;

        access_log /var/log/nginx/dockerui.access.log main;
        error_log /var/log/nginx/dockerui.error.log info;

        location / {


                #basic auth
                auth_basic            "Docker UI";
                auth_basic_user_file  /somewhere.htpasswd;

                proxy_pass http://dockerui;
                #http 1.1 support...
                proxy_http_version 1.1;
                proxy_set_header Connection "";

                proxy_redirect     off;
                proxy_set_header   Host $host;
                proxy_set_header   X-Real-IP $remote_addr;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Host $server_name;

        }
        root /home/johndoe/www/;
}
```
Note the explicit proxy_http_version 1.1 and proxy_set_header Connection "";. By default nginx use http 1.0. Without these settings, you get HTTP 500 errors.

****

---
END