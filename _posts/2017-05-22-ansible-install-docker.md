---
layout: post
title:  "Ansible Install Docker"
date:   2017-05-22 17:47:37 +0000
tags:   [ansible, operation, docker]
author: Alan Wang
---
使用Galaxy上的[docker_ubuntu](https://galaxy.ansible.com/list#/roles/292)

```
ansible-galaxy install angstwad.docker_ubuntu
```

创建inventory：

```
[all]
localhost
```

创建playbook：

```yml
---
- name: Run docker.ubuntu
  hosts: all
  roles:
    - angstwad.docker_ubuntu
```

执行：

```
ansible-playbook -i hosts.txt ssh-addkey.yml 
```

执行好之后可以去登录到主机测试下：

```bazaar
docker --version
```

---
END
