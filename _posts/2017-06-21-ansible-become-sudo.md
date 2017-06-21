---
layout: post
title:  "Ansible: Become(sudo)"
date:   2017-06-21 18:27:37 +0000
tags:   [ansible]
author: Alan Wang
---

[文档](http://docs.ansible.com/ansible/become.html)

## inventory
```yaml
[test]
192.168.95.114   ansible_user=host
192.168.95.115   ansible_user=host
```

### playbook
`nginx-install.yml`

```yaml
- hosts: test
  become: yes
  become_user: root
  become_method: su
  roles:
  - {role: nginx,
     nginx_http_params: ["sendfile on", "access_log /var/log/nginx/access.log"]
```

### command
```shell
$ ansible-playbook -i hosts nginx-install.yml --become -K -vvv
```

### 说明
```
--ask-become-pass, -K
 	ask for privilege escalation password, does not imply become will be used
--become, -b	run operations with become (no password implied)
--become-method=BECOME_METHOD
 	privilege escalation method to use (default=sudo), valid choices: [ sudo | su | pbrun | pfexec | doas | dzdo | ksu ]
--become-user=BECOME_USER
 	run operations as this user (default=root), does not imply –become/-b
```

---
END
