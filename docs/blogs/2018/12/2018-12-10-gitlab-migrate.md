+
---
title:  "Gitlab服务器迁移"
date:   2018-12-10 11:23:37
tags:   [gitlab]
---

## 同版本迁移

备份原来服务器
```sh
gitlab-rake gitlab:backup:create RAILS_ENV=production
```
```
/var/opt/gitlab/backups/1544603502_2018_12_12_11.5.1_gitlab_backup.tar
```

新服务器上安装**相同版本**Gitlab

拷贝旧服务器的备份文件到新服务器的backups目录，
```
/var/opt/gitlab/backups/1544603502_2018_12_12_11.5.1_gitlab_backup.tar
```

在新服务器上执行恢复：
```sh
# backup指定文件名不需要版本号
gitlab-rake gitlab:backup:restore RAILS_ENV=production   BACKUP=1544603502_2018_12_12
# 根据提示操作

# 操作完成新版本的直接生效，老版本的需要重启
gitlab-ctl restart
gitlab-rake gitlab:check SANITIZE=true
```

## 不同版本迁移

可以使用Gitlab的Import功能导入，
如果包含Wiki的话，

```
git check old-url/group/project.wiki.git
git remote set-url origin new-url/group/project.wiki.git
git push
```
