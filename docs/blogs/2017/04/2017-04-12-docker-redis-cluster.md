---
layout: post
title:  "Docker Redis Cluster"
date:   2017-04-12 14:21:49 +0000
img:  docker-jekyll.jpg
description: Docker Redis Cluster
categories: [Docker]
tags:   [container, docker, swarm, compose, redis, cluster]
author: Alan Wang
---
使用aliyuncs上的sentinel镜像来部署redis集群。

`redis.yml`配置：

- `redis-master`服务： 部署一个`redis:3`容器作为初始master
- `redis-slave`服务： 部署两个实例的`redis:3`容器作为slave
- `sentinel`服务：部署3个实力的`redis-sentinel:5.7`容器作为集群的sentinel

```yml
version: "3"
services:
  redis-master:
    image: redis:3
    deploy:
      restart_policy:
        condition: on-failure
  redis-slave:
    image: redis:3
    command: redis-server --slaveof redis-master 6379
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
  sentinel:
    image: registry.aliyuncs.com/acs-sample/redis-sentinel:3
    environment:
      - SENTINEL_DOWN_AFTER=5000
      - SENTINEL_FAILOVER=5000
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
```

启动并查看：
```
docker stack deploy -c redis.yml redis

docker stack services redis
```

参考： [https://yq.aliyun.com/articles/57953](https://yq.aliyun.com/articles/57953)

---
END