---
layout: post
title:  "Docker WorkPress Cluster"
date:   2017-04-12 14:25:49 +0000
img:  docker-jekyll.jpg
description: Docker WordPress Cluster
categories: docker
tags:   [container, docker, swarm, compose, cluster]
author: Alan Wang
---
准备： Docker 1.13, Swarm mode, Compose v3

`wordpress.yml`

```yml
version: '3'
services:
  web:
    image: wordpress:4
    environment:
      - WORDPRESS_DB_PASSWORD=password
      - WORDPRESS_AUTH_KEY=changeme
      - WORDPRESS_SECURE_AUTH_KEY=changeme
      - WORDPRESS_LOGGED_IN_KEY=changeme
      - WORDPRESS_NONCE_KEY=changeme
      - WORDPRESS_AUTH_SALT=changeme
      - WORDPRESS_SECURE_AUTH_SALT=changeme
      - WORDPRESS_LOGGED_IN_SALT=changeme
      - WORDPRESS_NONCE_SALT=changeme
      - WORDPRESS_NONCE_AA=changeme
    ports:
      - 80:80
    depends_on:
      - mysql
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=password
    deploy:
      restart_policy:
        condition: on-failure
```

运行：

```
docker stack deploy -c wordpress.yml wordpress

docker stack ls

docker stack services wordpress
```

访问：

```
http://127.0.0.1
```
