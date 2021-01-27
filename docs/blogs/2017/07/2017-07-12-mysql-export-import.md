---
title:  "Mysql backup database"
date:   2017-07-12 09:27:37
tags:   [mysql]
---

```shell
IP=xxx.xxx.xxx.xxx
PORT=3016
USER=xxx
PASSWORD=xxx
DIR=xwms_2_5
TARGET_DB=xwms_2_5
mkdir -p ~/sqldumps/$DIR
NAME=`date +"%Y%m%d_%H%M%S"`
DATABASE=$TARGET_DB$NAME
# create database yourdb DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci
echo "CREATE DATABASE xoms_sq_beta_${NAME}  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;" > ~/sqldumps/$DIR/create-database.sql

mysql -h 127.0.0.1 -uroot -p$PASSWORD < ~/sqldumps/$DIR/create-database.sql

mysqldump -h $IP -P$PORT -u $USER -p$PASSWORD $TARGET_DB > ~/sqldumps/$DIR/$DATABASE.sql
mysql -u root -p$PASSWORD -h 127.0.0.1 $DATABASE < ~/sqldumps/$DIR/$DATABASE.sql
```

---
END
