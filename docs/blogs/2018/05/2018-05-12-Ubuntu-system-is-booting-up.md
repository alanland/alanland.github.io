---
title:  "Ubuntu - System is booting up. See pam_nologin(8)"
date:   2018-05-12 14:23:37
tags:   [ubuntu]
---

SSH 登录时：
```
"System is booting up. See pam_nologin(8)"
Connection closing... Socket close.
```

解决方法： 

```sh
sudo sed -i -r 's/^(.*pam_nologin.so)/#\1/' /etc/pam.d/sshd
```

即将`/etc/pam.d/sshd`中，`pam_nologin.so`这一行注释掉。

原因可能是`systemd-user-sessions.service`服务启动失败，导致`/etc/nologin`未被删除。pam_nologin 在/etc/nologin文件存在的情况下会阻止普通用户登录。
