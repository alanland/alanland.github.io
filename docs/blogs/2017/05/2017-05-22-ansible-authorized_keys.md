---
title:  "Ansible authorized_keys"
date:   2017-05-22 19:27:37 +0000
tags:   [ssh, ansible, operation]
categories: [DevOps]
ref:
  - http://www.jianshu.com/p/fc88132924d5
---
## 在管理主机生成key
```
ssh-keygen -t rsa -b 2048 -P '' -f ~/.ssh/id_rsa
```

## 添加主机信息 `hosts.txt`
```
[all]
106.14.xx.xxx   ansible_user=root   ansible_ssh_pass=your-pass
```

## 配置palybook `ssh-addkey.yml`
```
---
- hosts: all
  gather_facts: no

  tasks:

  - name: install ssh key
    authorized_key: user=root
                    key="{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
                    state=present
```

## 运行 playbook

```
ansible-playbook -i hosts.txt ssh-addkey.yml
```

得到如下输出：

```
$ ansible-playbook -i hosts.txt ssh-addkey.yml
 ____________
< PLAY [all] >
 ------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

 ________________________
< TASK [install ssh key] >
 ------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

ok: [106.14.xx.xxx]
 ____________
< PLAY RECAP >
 ------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

106.14.xx.xxx              : ok=1    changed=0    unreachable=0    failed=0
```

运行成功。

此时去掉 `hosts.txt` 中的密码，执行命令就可以了。

```
ansible all -i hosts.txt -m ping
```

```
$ ansible all -i hosts.txt -m ping
106.14.xx.xx | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```


---
END
