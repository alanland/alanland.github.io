---
layout: post
title:  "AWS CLI and RedShift"
date:   2019-09-30 14:58:00 +0000
tags:   [aws, redshift]
categories: [Tools]
author: Alan Wang
---

AWS 使用的第一个服务 RedShift。从安装命令行开始，到数据连接测试。中间拷贝数据遇到了点问题， 最后自己上传了一份样例数据到 S3 上进行了测试。

## CLI 工具

- [安装 AWS CLI](https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/cli-chap-install.html)

```sh
pip install awscli --upgrade --user

export PATH=/Users/alan/.local/bin:$PATH

aws --version

pip list -o

pip install --upgrade --user awscli
```

- [IAM 用户和组](https://docs.aws.amazon.com/zh_cn/IAM/latest/UserGuide/getting-started_create-admin-group.html)

可以根据文档创建一个完整权限的编程用户。

- [设置CLI](https://docs.aws.amazon.com/zh_cn/redshift/latest/mgmt/setting-up-rs-cli.html)

- https://docs.aws.amazon.com/zh_cn/cli/latest/userguide/cli-chap-configure.html
```sh
(base) ➜  ~ aws configure
AWS Access Key ID [None]: xx
AWS Secret Access Key [None]: K/xxx
Default region name [None]: cn-northwest-1
Default output format [None]: json
```

格式只有 `json`，`text`， `table` 三种， 要是有 yaml 格式i就好了。

如果要创建多个配置：
```sh
aws configure --profile produser
```

运行命令的时候可以指定 profile：
```sh
aws s3 ls --profile produser
```

## Access

设置权限

- https://docs.amazonaws.cn/en_us/redshift/latest/gsg/rs-gsg-authorize-cluster-access.html

然后就可以通过客户端工具连接了。

## 加载数据

- https://docs.aws.amazon.com/zh_cn/redshift/latest/gsg/rs-gsg-create-sample-db.html

执行

```sql
sql> copy users from 's3://awssampledbuswest2/tickit/allusers_pipe.txt'
     credentials 'aws_iam_role=arn:aws-cn:iam::xxx:role/myRedshiftRole'
     delimiter '|' region 'cn-northwest-1'
```

错误

```
[2019-09-30 15:30:45] [XX000][500310] [Amazon](500310) Invalid operation: User arn:aws-cn:redshift:cn-northwest-1:xxx:dbuser:xxx/xxx is not authorized to assume IAM Role arn:aws-cn:iam::xxx:role/myRedshiftRole
```

解决

打开 cluster 设置，`IAM Roles` 应用一下权限即可。

再次执行

```
[XX000][500310] [Amazon](500310) Invalid operation: S3ServiceException:The specified bucket does not exist,Status 404,Error NoSuchBucket,Rid
```

再次执行
```sql
copy users from 's3://awssampledbuswest2/tickit/allusers_pipe.txt'
credentials 'aws_iam_role=arn:aws-cn:iam::xxx:role/myRedshiftRole'
delimiter '|' region 'us-west-2';
```
```
S3ServiceException:The provided token is malformed or otherwise invalid
```

https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/s3serviceexception-error.html

可能是集群和 s3 不在一个区域。

- https://stackoverflow.com/questions/24860468/amazon-redshift-copy-command

更改成宁夏区域：

```sql
copy users from 's3://awssampledbcnnorthwest1/tickit/allusers_pipe.txt'
    credentials 'aws_iam_role=arn:aws-cn:iam::xxx:role/myRedshiftRole'
    delimiter '|' region 'cn-northwest-1';
```

```sh
[XX000][500310] [Amazon](500310) Invalid operation: S3ServiceException:Access Denied,Status 403,Error AccessDenied
```

柠檬了个鬼。

https://s3.cn-northwest-1.amazonaws.com.cn/cybertrans/Book1.csv

自己写了个数据放到 s3 上测试

```sql
copy users from 's3://cybertrans/users.csv'
    credentials 'aws_iam_role=arn:aws-cn:iam::xxx:role/myRedshiftRole'
    delimiter ',' region 'cn-northwest-1';
```

OK。

文档中有复制权限到其他 region 的描述，没有测试。

- https://docs.aws.amazon.com/zh_cn/redshift/latest/mgmt/authorizing-redshift-service.html

先用测试数据进行了基本的查询，仅作测试用。由于数据量比较小也提现不出来性能什么的。今天先到这里。

## 表设计

https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/tutorial-tuning-tables-create-test-data.html

---



