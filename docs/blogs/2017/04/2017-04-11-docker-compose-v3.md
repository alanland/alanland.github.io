---
title:  "Docker Compose v3"
date:   2017-04-11 00:53:24 +0000
img:  docker-jekyll.jpg
description: Docker Compose v3
categories: [Docker]
tags:   [container, docker, swarm, kubernetes, mesos]
---
从 1.13 开始，Docker 命令行工具支持直接使用 v3 版本的 docker-compose.yml 文件来进行应用栈(stack)部署管理。

首先看一下官方的例子：

```yml
version: "3"
      services:

        redis:
          image: redis:alpine
          ports:
            - "6379"
          networks:
            - frontend
          deploy:
            replicas: 2
            update_config:
              parallelism: 2
              delay: 10s
            restart_policy:
              condition: on-failure
        db:
          image: postgres:9.4
          volumes:
            - db-data:/var/lib/postgresql/data
          networks:
            - backend
          deploy:
            placement:
              constraints: [node.role == manager]
        vote:
          image: dockersamples/examplevotingapp_vote:before
          ports:
            - 5000:80
          networks:
            - frontend
          depends_on:
            - redis
          deploy:
            replicas: 2
            update_config:
              parallelism: 2
            restart_policy:
              condition: on-failure
        result:
          image: dockersamples/examplevotingapp_result:before
          ports:
            - 5001:80
          networks:
            - backend
          depends_on:
            - db
          deploy:
            replicas: 1
            update_config:
              parallelism: 2
              delay: 10s
            restart_policy:
              condition: on-failure

        worker:
          image: dockersamples/examplevotingapp_worker
          networks:
            - frontend
            - backend
          deploy:
            mode: replicated
            replicas: 1
            labels: [APP=VOTING]
            restart_policy:
              condition: on-failure
              delay: 10s
              max_attempts: 3
              window: 120s
            placement:
              constraints: [node.role == manager]

        visualizer:
          image: dockersamples/visualizer:stable
          ports:
            - "8080:8080"
          stop_grace_period: 1m30s
          volumes:
            - "/var/run/docker.sock:/var/run/docker.sock"
          deploy:
            placement:
              constraints: [node.role == manager]

      networks:
        frontend:
        backend:

      volumes:
        db-data:
```

用于Docker Compose v1/v2是面向容器编排设计，和Swarm Mode中的面向应用不同。使用其在
Swarm Mode中部署应用特别不方便。

而Docker 1.13版本之后，Docker Compose V3已经全面支持了Swarm Mode。

## 常用命令
- 启动 `docker stack deploy --compose-file=docker-compose.yml` [docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/#description)
- 伸缩 `docker service scale xxx=n`
- 停止 `docker stack rm`


## 改变
- `expose`， `links`会被忽略，可以使用服务名连接
- `volumes_from`不再支持，只能使用命名数据卷持久化和共享数据
- `deploy` 来控制Swarm mode的服务部署
 - `resources`： `cup_shares`,`cup_quota`,`cpuset`,`mem_limit`,`memswap_limit` etc
 （v1/v2相关指令不再支持）
 - `mode`: `global`, `replicated(default)`
 - `replicas`: replicated模式下服务的副本数量
 - `placement`: 容器放置的约束
 - `update_config`: 服务更新方式
 - `restart_policy`: 重启条件（v1/v1`restart`不再支持）
 - `service`: 服务的标签
 
### docker cli 和 docker-compose

docker-compose 仍然可用，但是用`up`或者`run`运行的时候，模板中的`deploy`将被忽略。

docker cli 只支持v3模板，但是不支持其中的`build`指令。

---
END