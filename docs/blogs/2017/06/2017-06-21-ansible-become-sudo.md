---
title:  "Ansible: Become(sudo)"
date:   2017-06-21 18:27:37
tags:   [ansible]
categories: [DevOps]
---


[文档](http://docs.ansible.com/ansible/become.html)

http://docs.ansible.com/ansible/playbooks.html

http://docs.ansible.com/ansible/intro_configuration.html#ask-sudo-pass

http://docs.ansible.com/ansible/playbooks_intro.html

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

## 错误
> "Timeout (12s) waiting for privilege escalation prompt:

参考 [Specify sudo password for Ansible](https://stackoverflow.com/questions/21870083/specify-sudo-password-for-ansible)

### 命令行方式
当:
```yml

  become_method: sudo
```
```shell
ansible-playbook playbook.yml -i inventory.ini --user=username --extra-vars "ansible_sudo_pass=yourPassword"
```
当:
```yml

  become_method: su
```
```shell
ansible-playbook playbook.yml -i inventory.ini --user=username --extra-vars "ansible_su_pass=yourPassword"
```

### 配置方式
Inventory file:
```ini
[test]
192.168.95.152  ansible_user=host ansible_ssh_pass=host ansible_su_pass=host
```


---
END
