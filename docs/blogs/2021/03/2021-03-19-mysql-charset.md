---
title: MySQL数据库乱码
date: 2021-03-19
categories: [运维]
tags: [mysql]
---

今天装了个开源项目，之后程序插入的数据中文乱码，用Navicat打开编辑正常。

解决方案，首先确保链接字符串指定了想要的编码类型，

```
jdbc:mysql://localhost:3306/db?autoReconnect=false&useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8&zeroDateTimeBehavior=convertToNull&useSSL=false
```

其次确认你的数据库和数据表的编码正确,

最后更新数据库设置，
```ruby
[mysqld]
# default-character-set=utf8
character_set_server=utf8
```
我用的kubernetes部署的，修改 ConfigMap 挂载然后覆盖配置就好了，我的配置如下：

```ruby
#
# The MySQL Community Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[client]
port = 3306
socket = /var/run/mysqld/mysqld.sock

[mysqld_safe]
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
nice = 0

[mysqld]
sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
# sql_mode = ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
default-storage-engine=INNODB
# default-character-set=utf8
character_set_server=utf8
lower_case_table_names = 1
table_open_cache=128
max_connections = 2000
max_connect_errors=6000
innodb_file_per_table=1
innodb_buffer_pool_size=1G
max_allowed_packet=64M
transaction_isolation=READ-COMMITTED
innodb_flush_method=O_DIRECT
innodb_lock_wait_timeout=1800
innodb_flush_log_at_trx_commit=0
skip-host-cache
skip-name-resolve
sync_binlog=0
skip-name-resolve
user = mysql
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
port = 3306
basedir = /usr
datadir = /var/lib/mysql
tmpdir = /tmp
lc-messages-dir = /usr/share/mysql
explicit_defaults_for_timestamp = false
default_time_zone = Asia/Shanghai



# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
#bind-address	= 127.0.0.1

#log-error	= /var/log/mysql/error.log

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links = 0

# * IMPORTANT: Additional settings that can override those from this file!
#   The files must end with '.cnf', otherwise they'll be ignored.
#
!includedir /etc/mysql/conf.d/
```
