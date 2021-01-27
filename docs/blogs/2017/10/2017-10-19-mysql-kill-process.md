---
title:  "Mysql batch kill connections"
date:   2017-10-19 05:57:37
tags:   [mysql]
---

```sql
select concat('KILL ',id,';') from information_schema.processlist where user='root' and db='itms';
select concat('KILL ',id,';') from information_schema.processlist where user='root' into outfile '/tmp/a.txt';
source /tmp/a.txt;
```

```sh
mysqladmin -uroot -p processlist|awk -F "|" '{print $2}'|xargs -n 1 mysqladmin -uroot -p kill
```

杀掉指定用户运行的连接，这里为Mike

```sh
mysqladmin -uroot -p processlist|awk -F "|" '{if($3 == "Mike")print $2}'|xargs -n 1 mysqladmin -uroot -p kill
```

```sh
#杀掉锁定的MySQL连接
for id in `mysqladmin processlist|grep -i locked|awk '{print $1}'`
do
   mysqladmin kill ${id}
done
```

通过Maatkit工具集中提供的mk-kill命令进行
```sh
#杀掉超过60秒的sql
mk-kill -busy-time 60 -kill
#如果你想先不杀，先看看有哪些sql运行超过60秒
mk-kill -busy-time 60 -print
#如果你想杀掉，同时输出杀掉了哪些进程
mk-kill -busy-time 60 -print –kill
```

---
END

