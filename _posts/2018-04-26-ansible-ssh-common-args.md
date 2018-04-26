---
layout: post
title:  "Ansible Bastion Access"
date:   2018-04-26 08:23:37 +0000
tags:   [ansible, bastion]
author: Alan Wang
---

使用`sshpass`，修改 inventory 文件：

```sh
[all]
192.1.1.22 ansible_ssh_common_args='-o ProxyCommand="sshpass -p your-password ssh your-user@x.x.x.x -p 22200 nc %h %p"'
```

也可以在 playbooks 通过参数指定：

```yml
---
- name: Install metricbeat
  gather_facts: no
  hosts: all
  become: yes
  become_user: root
  become_method: sudo
  vars:
#    ansible_ssh_common_args: '-o ProxyCommand="ssh -W %h:%p -q your-user@58.xx.xx.xx -p 22200"'
    ansible_ssh_common_args: '-o ProxyCommand="sshpass -p your-password ssh your-user@58.xx.xx.xx -p 22200 nc %h %p"'

  tasks:

  - name: Check Metricbeat Version
    shell: metricbeat --version | awk '{print $3}'
    ignore_errors: True
    register: installed
```
