---
title:  "MySql: innodb_lock_wait"
date:   2017-07-24 12:27:37 +0000
tags:   [mysql, lock]
---
常见错误:
```
Lock wait timeout exceeded
```

一个事务长时间执行,或者执行完未提交.其他事务在抢占资源的时候,就会因上一个事务的锁
而导致抢占失败,出现`Lock wait timeout exceeded`.

解决:

```sql
show processlist;
show full processlist;
show engine innodb status;
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;
kill <lock_trx_id>;
```



Lock相关表:
```markdown
innodb_trx         # 当前运行的所有事务
innodb_locks       # 当前出现的锁
innodb_lock_waits  # 锁等待的对应关系
```
```markdown
> desc innodb_locks;

+————-+———————+——+—–+———+——-+
| Field       | Type                | Null | Key | Default | Extra |
+————-+———————+——+—–+———+——-+
| lock_id     | varchar(81)         | NO   |     |         |       |#锁ID
| lock_trx_id | varchar(18)         | NO   |     |         |       |#拥有锁的事务ID
| lock_mode   | varchar(32)         | NO   |     |         |       |#锁模式
| lock_type   | varchar(32)         | NO   |     |         |       |#锁类型
| lock_table  | varchar(1024)       | NO   |     |         |       |#被锁的表
| lock_index  | varchar(1024)       | YES  |     | NULL    |       |#被锁的索引
| lock_space  | bigint(21) unsigned | YES  |     | NULL    |       |#被锁的表空间号
| lock_page   | bigint(21) unsigned | YES  |     | NULL    |       |#被锁的页号
| lock_rec    | bigint(21) unsigned | YES  |     | NULL    |       |#被锁的记录号
| lock_data   | varchar(8192)       | YES  |     | NULL    |       |#被锁的数据
+————-+———————+——+—–+———+——-+
10 rows in set (0.00 sec)
```

```markdown
> desc innodb_lock_waits;

+——————-+————-+——+—–+———+——-+
| Field             | Type        | Null | Key | Default | Extra |
+——————-+————-+——+—–+———+——-+
| requesting_trx_id | varchar(18) | NO   |     |         |       |#请求锁的事务ID
| requested_lock_id | varchar(81) | NO   |     |         |       |#请求锁的锁ID
| blocking_trx_id   | varchar(18) | NO   |     |         |       |#当前拥有锁的事务ID
| blocking_lock_id  | varchar(81) | NO   |     |         |       |#当前拥有锁的锁ID
+——————-+————-+——+—–+———+——-+
4 rows in set (0.00 sec)
```

```markdown
> desc innodb_trx ;

+—————————-+———————+——+—–+———————+——-+
| Field                      | Type                | Null | Key | Default             | Extra |
+—————————-+———————+——+—–+———————+——-+
| trx_id                     | varchar(18)         | NO   |     |                     |       |#事务ID
| trx_state                  | varchar(13)         | NO   |     |                     |       |#事务状态：
| trx_started                | datetime            | NO   |     | 0000-00-00 00:00:00 |       |#事务开始时间；
| trx_requested_lock_id      | varchar(81)         | YES  |     | NULL                |       |#innodb_locks.lock_id
| trx_wait_started           | datetime            | YES  |     | NULL                |       |#事务开始等待的时间
| trx_weight                 | bigint(21) unsigned | NO   |     | 0                   |       |#
| trx_mysql_thread_id        | bigint(21) unsigned | NO   |     | 0                   |       |#事务线程ID
| trx_query                  | varchar(1024)       | YES  |     | NULL                |       |#具体SQL语句
| trx_operation_state        | varchar(64)         | YES  |     | NULL                |       |#事务当前操作状态
| trx_tables_in_use          | bigint(21) unsigned | NO   |     | 0                   |       |#事务中有多少个表被使用
| trx_tables_locked          | bigint(21) unsigned | NO   |     | 0                   |       |#事务拥有多少个锁
| trx_lock_structs           | bigint(21) unsigned | NO   |     | 0                   |       |#
| trx_lock_memory_bytes      | bigint(21) unsigned | NO   |     | 0                   |       |#事务锁住的内存大小（B）
| trx_rows_locked            | bigint(21) unsigned | NO   |     | 0                   |       |#事务锁住的行数
| trx_rows_modified          | bigint(21) unsigned | NO   |     | 0                   |       |#事务更改的行数
| trx_concurrency_tickets    | bigint(21) unsigned | NO   |     | 0                   |       |#事务并发票数
| trx_isolation_level        | varchar(16)         | NO   |     |                     |       |#事务隔离级别
| trx_unique_checks          | int(1)              | NO   |     | 0                   |       |#是否唯一性检查
| trx_foreign_key_checks     | int(1)              | NO   |     | 0                   |       |#是否外键检查
| trx_last_foreign_key_error | varchar(256)        | YES  |     | NULL                |       |#最后的外键错误
| trx_adaptive_hash_latched  | int(1)              | NO   |     | 0                   |       |#
| trx_adaptive_hash_timeout  | bigint(21) unsigned | NO   |     | 0                   |       |#
+—————————-+———————+——+—–+———————+——-+
22 rows in set (0.01 sec)
```



## 锁的种类
Innodb存储引擎实现了如下2种标准的行级锁:

- 共享锁(S lock)，允许事务读取一行数据。
- 排它锁(X lock)，允许事务删除或者更新一行数据。





---
END
