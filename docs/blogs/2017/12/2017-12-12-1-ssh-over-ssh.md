---
title:  "SSH over SSH"
date:   2017-12-12 13:23:37
tags:   [linux, ssh]
---

通过 user2@ip2 password2 作为跳板机登录 ip1


```sh
sshpass -p ${password1} ssh ${ip1} -o StrictHostKeyChecking=no -l ${user1} -o ProxyCommand='sshpass -p ${password2} ssh ${ip2} -o StrictHostKeyChecking=no -l ${user2} -W %h:%p'"
```
