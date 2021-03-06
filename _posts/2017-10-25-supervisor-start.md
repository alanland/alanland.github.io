---
layout: post
title:  "Supervisor Tutorial"
date:   2017-10-25 05:57:37 +0000
tags:   [ubuntu, supervisor]
author: Alan Wang
---

## Install

```sh
sudo apt-get install supervisor
```

## Config

将每个进程的配置文件单独拆分,放在`/etc/supervisor/conf.d/`目录下,
以`.conf`作为扩展名,例如 `itms.conf` 定义的一个简单的HTTP服务器:

```ini
[program:itms]
command=python -m SimpleHTTPServer
```

## Start

重启supervisor,让配置文件生效,然后启动itms进程:

```sh
supervisorctl reload
supervisorctl start test
```

## Supervisor Config

```ini
[program:meta.txn.recover.on.error]
command=/cas/bin/meta.txn.recover.on.error ; 被监控的进程路径
numprocs=1                    ; 启动几个进程
directory=/cas/bin                ; 执行前要不要先cd到目录去，一般不用
autostart=true                ; 随着supervisord的启动而启动
autorestart=true              ; 自动重启。。当然要选上了
startretries=10               ; 启动失败时的最多重试次数
exitcodes=0                 ; 正常退出代码（是说退出代码是这个时就不再重启了吗？待确定）
stopsignal=KILL               ; 用来杀死进程的信号
stopwaitsecs=10               ; 发送SIGKILL前的等待时间
redirect_stderr=true          ; 重定向stderr到stdout
stdout_logfile=logfile        ; 指定日志文件
```

## Supervisor command

- `supervisorctl start programxxx` 启动某个进程
- `supervisorctl restart programxxx` 重启某个进程
- `supervisorctl stop groupworker` 重启所有属于名为groupworker这个分组的进程(start,restart同理)
- `supervisorctl stop all` 停止全部进程，注：start、restart、stop都不会载入最新的配置文件。
- `supervisorctl reload` 载入最新的配置文件，停止原有进程并按新的配置启动、管理所有进程。
- `supervisorctl update` 根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启。
- `supervisor` 启动和停止的日志文件存放在/var/log/supervisor/supervisord.log

注意：显式用stop停止掉的进程，用reload或者update都不会自动重启

---
END

