---
layout: post
title:  "Run Jekyll in Docker"
date:   2017-04-07 14:58:00 +0000
img:  docker-jekyll.jpg
description: 使用Docker运行Jekyll
categories: jekyll docker
author: Alan Wang
---
由于本机网络问题运行`gem install`无反应，所以使用docker来把jekyll运行起来。


去docker hub上下载镜像。

地址： [https://hub.docker.com/r/jekyll/jekyll/](https://hub.docker.com/r/jekyll/jekyll/)

```sh
docker pull jekyll/jekyll:3.4.3
```

使用compose来启动容器，编写`docker-compose.yml`如下：

```yaml
version: "2"
services:
  jekyll:
    image:  jekyll/jekyll:3.4.3
    container_name: jekyll
    restart: always
    command: jekyll serve
    ports:
     - "4000:4000"
    volumes:
     - /etc/timezone:/etc/timezone
     - ${PWD}:/srv/jekyll
```

将该文将放到你的blog目录下，启动：
```sh
docker-compose up -d
```

浏览器访问 [http://localhost:4000](http://localhost:4000) 即可。


