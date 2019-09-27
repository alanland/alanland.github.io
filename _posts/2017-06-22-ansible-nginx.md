---
layout: post
title:  "Ansible: install nginx"
date:   2017-06-22 14:27:37 +0000
tags:   [ansible]
author: Alan Wang
---
使用[ansible-role-nginx](https://github.com/jdauphant/ansible-role-nginx)这个角色,

配置:

```yaml
- hosts: test
  become: yes
  become_user: root
  become_method: su
  roles:
  - {role: nginx,
     nginx_http_params: ["sendfile on", "access_log /var/log/nginx/access.log"]
                          }
```

命令:

```shell
ansible-playbook -i hosts nginx-install.yml --become -K -vvv
```


---
END
