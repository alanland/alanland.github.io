---
title:  "Ansible Start"
date:   2017-05-22 18:27:37
tags:   [ssh, ansible, operation]
---
ubuntu安装：
```sh
$ sudo apt-get install software-properties-common
$ sudo apt-add-repository ppa:ansible/ansible
$ sudo apt-get update
$ sudo apt-get install ansib
```

配置主机： `/etc/ansible/hosts`

```
192.168.1.50
aserver.example.org
bserver.example.org
```

测试命令：

```sh
sudo ansible all -m ping -u root -k
```

输入密码，得到返回运行成功：

```
$ sudo ansible all -m ping -u root -k
SSH password:
192.168.1.50 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

简单命令：

```
# as bruce， ask password
$ ansible all -m ping -u bruce -k
# as bruce, sudoing to root
$ ansible all -m ping -u bruce --sudo
# as bruce, sudoing to batman
$ ansible all -m ping -u bruce --sudo --sudo-user batman
```

---
END
