---
title:  "Linux: Run Program Background / Daemon"
date:   2018-08-08 12:23:37
tags:   [linux]
categories: [DevOps]
---

后台运行程序的几种方式：

## nohup

```sh
nohup sh app.sh &
```

## screen

```sh
# create
screen -S <screenname>
# restore
screen -r <screenname>
screen -r
# list
screen -ls
# 
```

## daemon

```sh
# 启动
daemon --name=appName -- sh app.sh > log.txt
daemon --name=appName --respawn sh app.sh
# 停止
daemon --name=appName --stop 
# 查看
ps auxwww | grep sh
```

其他命令

```
    --running           - Check if a named daemon is running
    --restart           - Restart a named daemon client
    --stop              - Terminate a named daemon process
```

---
- https://cxwangyi.wordpress.com/2013/04/14/用daemon命令负责任务的自动重启/
- https://stackoverflow.com/questions/29806673/daemonizing-an-executable-in-ansible
