---
layout: post
title:  "Ansible SSH Bastion Host"
date:   2017-11-17 19:23:37 +0000
tags:   [ansible, ssh, bastion]
author: Alan Wang
---

在ansible的使用过程中，存在这样的场景，ansible所在的管理节点与被管理的机器需要 通过一个跳板机才能连接，无法直接连接。网上搜了一下，要解决这个问题，并不需要在 ansible里做什么处理，而是在ssh连接层面解决这个问题。

比如，

我们有三类节点：

1. 管理节点，`admin.example.com`，是执行ansible命令的服务器
2. 被管理的节点，`internal1.example.com`, `internal2.example.com`
3. 跳板机，`bastion.example.com`

管理节点不能直连 internal1 & internal2，需要通过跳板机建立连接。

管理节点连接跳板机的方式如下：

```sh
ssh -i keyfile_bastion -p 12345 user@bastion.example.com
```

从跳板机连接internal节点的方式如下：

```sh
ssh -i keyfile_internal -p 23456 user@internal1.example.com
ssh -i keyfile_internal -p 23456 user@internal2.example.com
```

解决方案：

修改 `~/.ssh/config`，加入如下的配置项，

```sh
Host internal1.example.com internal2.example.com
    User user
    Port 23456
    IdentityFile=keyfile_internal
    ProxyCommand ssh -qaY -i keyfile_bastion -p 12345 user@bastion.example.com 'nc -w 14400 %h %p'
```

这样，就可以直接从节点 admin.example.com 执行下面的命令直接连接internal1.example.com了

```sh
ssh user@internal1.example.com
```

ansible中也可以将internal节点当做可以直接连接的机器来使用

```sh
ansible -i host -m setup internal1.example.com
```


- [Ansible结合跳板机控制远程服务器](https://ouyang.me/blog/2015/08/31/using-ansible-with-a-bastion-host)
- [Ansible通过跳板机管理服务器](http://www.cweye.net/2015/07/17/ansible-jumper.html)