---
title:  "Redis Sentinel"
date:   2018-08-08 14:23:37
tags:   [redis]
categories: [DevOps]
---

## master

注意这个bind，是redis服务绑定的地址，如果是`127.0.0.1`那么只有本机才可以连接该redis。

`redis.conf`
```sh
bind 127.0.0.1
port 6000

dir .
```

`sentinel.conf`

```sh
# Host and port we will listen for requests on
bind 127.0.0.1
port 6100

#
# "redis-cluster" is the name of our cluster
#
# each sentinel process is paired with a redis-server process
#
sentinel monitor redis-cluster 127.0.0.1 6380 2
sentinel down-after-milliseconds redis-cluster 5000
sentinel parallel-syncs redis-cluster 1
sentinel failover-timeout redis-cluster 10000
```

## slave

`redis.conf`

```sh
bind 127.0.0.1
port 6001

dir .

slaveof 127.0.0.1 6000 # 这里是master redis的地址
```

`sentinel.conf`

```sh
# Host and port we will listen for requests on
bind 127.0.0.1
port 6101

#
# "redis-cluster" is the name of our cluster
#
# each sentinel process is paired with a redis-server process
#
sentinel monitor redis-cluster 127.0.0.1 6380 2 # 这里是 master redis的地址
sentinel down-after-milliseconds redis-cluster 5000
sentinel parallel-syncs redis-cluster 1
sentinel failover-timeout redis-cluster 10000
```

第二个slave配置同上，自己的地址和端口不同而已。

## 启动

```sh
src/redis-server redis.conf
src/redis-sentinel sentinel.conf
```

Master Redis 的日志，可以看到，在salve的redis启动后，控制台有加入集群的输出：

```
19042:M 08 Aug 17:04:46.979 * Increased maximum number of open files to 10032 (it was originally set to 4864).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.2.12 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6000
 |    `-._   `._    /     _.-'    |     PID: 19042
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

19042:M 08 Aug 17:04:46.981 # Server started, Redis version 3.2.12
19042:M 08 Aug 17:04:46.981 * The server is now ready to accept connections on port 6000
19042:M 08 Aug 17:04:57.893 * Slave 127.0.0.1:6001 asks for synchronization
19042:M 08 Aug 17:04:57.893 * Full resync requested by slave 127.0.0.1:6001
19042:M 08 Aug 17:04:57.893 * Starting BGSAVE for SYNC with target: disk
19042:M 08 Aug 17:04:57.893 * Background saving started by pid 19045
19045:C 08 Aug 17:04:57.894 * DB saved on disk
19042:M 08 Aug 17:04:57.968 * Background saving terminated with success
19042:M 08 Aug 17:04:57.968 * Synchronization with slave 127.0.0.1:6001 succeeded
19042:M 08 Aug 17:05:40.730 * Slave 127.0.0.1:6002 asks for synchronization
19042:M 08 Aug 17:05:40.730 * Full resync requested by slave 127.0.0.1:6002
19042:M 08 Aug 17:05:40.730 * Starting BGSAVE for SYNC with target: disk
19042:M 08 Aug 17:05:40.731 * Background saving started by pid 19054
19054:C 08 Aug 17:05:40.732 * DB saved on disk
19042:M 08 Aug 17:05:40.817 * Background saving terminated with success
19042:M 08 Aug 17:05:40.817 * Synchronization with slave 127.0.0.1:6002 succeeded
```

查看集群信息：

```sh
redis-cli -p 6000
> info
```

```sh
# Replication
role:master
connected_slaves:2
slave0:ip=127.0.0.1,port=6001,state=online,offset=15338,lag=0
slave1:ip=127.0.0.1,port=6002,state=online,offset=15338,lag=1
master_repl_offset:15470
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:15469
```
`Master Sentinel`
```
19061:X 08 Aug 17:06:19.355 * Increased maximum number of open files to 10032 (it was originally set to 4864).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.2.12 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6100
 |    `-._   `._    /     _.-'    |     PID: 19061
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

19061:X 08 Aug 17:06:19.359 # Sentinel ID is df930b6e6dc5fc83ee769897a4a5f5e9b2b67ab3
19061:X 08 Aug 17:06:19.359 # +monitor master mymaster 127.0.0.1 6380 quorum 2
19061:X 08 Aug 17:06:24.425 # +sdown master mymaster 127.0.0.1 6380
```

`Slave Sentinel`
```
19062:X 08 Aug 17:06:21.152 * Increased maximum number of open files to 10032 (it was originally set to 4864).
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 3.2.12 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in sentinel mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6101
 |    `-._   `._    /     _.-'    |     PID: 19062
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

19062:X 08 Aug 17:06:21.156 # Sentinel ID is 74dbb7f17f37830cb61813574809836307fe66c9
19062:X 08 Aug 17:06:21.156 # +monitor master mymaster 127.0.0.1 6000 quorum 2
19062:X 08 Aug 17:06:21.157 * +slave slave 127.0.0.1:6001 127.0.0.1 6001 @ mymaster 127.0.0.1 6000
19062:X 08 Aug 17:06:21.157 * +slave slave 127.0.0.1:6002 127.0.0.1 6002 @ mymaster 127.0.0.1 6000
19062:X 08 Aug 17:06:25.105 * +sentinel sentinel 243f24d56b3e896480447c996f974fb7d140b72b 127.0.0.1 6102 @ mymaster 127.0.0.1 6000
```
