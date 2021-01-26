---
title:  "Use rsync with sshpass"
date:   2017-10-19 03:57:37 +0000
tags:   [linux]
---

使用sshpass：

```
rsync -ratlzvP --rsh="sshpass -p ${password} ssh -o StrictHostKeyChecking=no -l ${user}" ${user}@${ip}:${remote_path} ${host_path}
```

---

下面是segmentfault的一个总结：

rsync有两种常用的认证方式，一种为rsync-daemon方式，另外一种则是ssh。
在一些场合，使用rsync-daemon方式会比较缺乏灵活性，ssh方式则成为首选。

1、从本地同步到远程
rsync -avz -e ssh /data/wwwroot/shop/upload/ root@120.24.170.210:/data/wwwroot/shop/upload
rsync -avz -e 'ssh -p 61124' /data/wwwroot/shop/upload/ root@120.24.170.210:/data/wwwroot/shop/upload
以上两种方式的区别就是远程的ssh默认端口换了

2、从远程同步到本地
rsync -avzP -e ssh root@114.215.191.193:/data/wwwroot/shop/upload /data/wwwroot/shop/upload/
rsync -avzP -e 'ssh -p 61124' root@114.215.191.193:/data/wwwroot/shop/upload /data/wwwroot/shop/upload/

Links:

- https://segmentfault.com/a/1190000007634970

---
END

