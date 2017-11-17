---
layout: post
title:  "RabbitMQ ha with Docker"
date:   2017-11-17 12:23:37 +0000
tags:   [rabbit, docker, ha]
author: Alan Wang
---

## `docker-compose.xml`

```yaml
version: "2"

services:

  rabbitmq:
    image: rabbitmq:3.6.1-management
    container_name: rabbitmq
    hostname: rabbit80
    restart: always
    environment:
     - RABBITMQ_DEFAULT_USER=root
     - RABBITMQ_DEFAULT_PASS=password
     - RABBITMQ_ERLANG_COOKIE=xxxxxxxxxxxx
    ports:
     - "5672:5672"
     - "15672:15672"
     - "25672:25672"
     - "4369:4369"
    volumes:
     - /etc/timezone:/etc/timezone
     - $PWD/data/rabbitmq:/var/lib/rabbitmq
     - $PWD/erlang.cookie:/var/lib/rabbitmq/.erlang.cookie
    extra_hosts:
#     - "rabbit80:172.16.120.80"
     - "rabbit81:172.16.120.81"
```

## 修改权限

```
chmod 600 erlang.cookie
```

## 创建集群

```
rabbit1$ docker-compose up -d
rabbit2$ docker-compose up -d
rabbit1$ docker exec -it rabbitmq bash
rabbit2$ docker exec -it rabbitmq bash

root@rabbit80:/# rabbitmqctl cluster_status
Cluster status of node rabbit@rabbit80 ...
[{nodes,[{disc,[rabbit@rabbit80]}]},
 {running_nodes,[rabbit@rabbit80]},
 {cluster_name,<<"rabbit@rabbit80">>},
 {partitions,[]},
 {alarms,[{rabbit@rabbit80,[]}]}]

root@rabbit81:/# rabbitmqctl cluster_status
Cluster status of node rabbit@rabbit81 ...
[{nodes,[{disc,[rabbit@rabbit81]}]},
 {running_nodes,[rabbit@rabbit81]},
 {cluster_name,<<"rabbit@rabbit81">>},
 {partitions,[]},
 {alarms,[{rabbit@rabbit81,[]}]}]


root@rabbit81:/# rabbitmqctl  stop_app
Stopping node rabbit@rabbit81 ...
root@rabbit81:/# rabbitmqctl  reset
Resetting node rabbit@rabbit81 ...
root@rabbit81:/# rabbitmqctl  join_cluster rabbit@rabbit80
Clustering node rabbit@rabbit81 with rabbit@rabbit80 ...
root@rabbit81:/# rabbitmqctl  start_app
Starting node rabbit@rabbit81 ...

root@rabbit81:/#  rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}'
Setting policy "ha-all" for pattern "^" to "{\"ha-mode\":\"all\"}" with priority "0" ...
root@rabbit81:/#
```

`publish80.py`

```
import pika

credentials = pika.PlainCredentials('xx', 'pwd')
parameters = pika.ConnectionParameters('172.16.120.80',
                                       5672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

channel.queue_declare(queue='hello', durable=True, exclusive=False, auto_delete=False)
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
```

`publish81.py`

```
import pika

credentials = pika.PlainCredentials('xx', 'pwd')
parameters = pika.ConnectionParameters('172.16.120.81',
                                       5672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

channel.queue_declare(queue='hello', durable=True, exclusive=False, auto_delete=False)
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
```

```sh
python publish80.py
python publish81.py
```

```

root@rabbit80:/# rabbitmqctl list_queues
Listing queues ...
hello   2


root@rabbit81:/# rabbitmqctl list_queues
Listing queues ...
hello   2
root@rabbit81:/# rabbitmqctl stop_app
Stopping node rabbit@rabbit81 ...

root@rabbit80:/# rabbitmqctl list_queues
Listing queues ...
hello   2

root@rabbit81:/# rabbitmqctl start_app
Starting node rabbit@rabbit81 ...
root@rabbit81:/# rabbitmqctl list_queues
Listing queues ...
hello   2
root@rabbit81:/#