---
layout: post
title:  "阿里云SLB"
date:   2010-01-16 09:23:37 +0000
tags:   [aliyun, slb]
author: Alan Wang
---

专有网络VPC

自定义IP，网段，选择路由表，网关

一个VPC内的ECS，每个ECS绑定公网IP，

SNET VPC内多个ECS使用同一个公网IP暴露

DNET 转发公网到VPC



# Backup
docker exec CONTAINER /usr/bin/mysqldump -u root --password=root DATABASE > backup.sql

# Restore
cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE
