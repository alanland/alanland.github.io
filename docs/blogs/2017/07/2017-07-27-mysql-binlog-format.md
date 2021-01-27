---
title:  "MySql binlog format"
date:   2017-07-27 12:27:37
tags:   [mysql, binlog]
---
MySql二进制日志(binlog)有`3`种不同的格式可选：`Mixed`,`Statement`,`Row`，
默认格式是`Statement`.

## Row
日志中会记录成每一行数据被修改的形式.

不记录执行的SQL语句的上下文相关的信息，
仅仅只需要记录哪一条记录被修改了，修改成什么样了.

比如: 
```sql
update table user set password='xxx'
```

那么影响的每一条记录都会被日志记下来.

## Statement
每一条会修改数据的SQL都会记录到bin-log中.

`Statement`模式没有`Row`模式日志文件大的问题,但是部分函数不能正确复制,比如`sleep`.

## Mixed
`5.1.8`版本之后提供了`Mixed`模式,即两种模式的结合.

比如`alter`操作使用`statement`模式,`update`,`delete`使用`statemest`模式.


如果binlog采用了`Mixed`模式,那么在以下几种情况下会自动将binlog的模式由`Statement`模式变为`Row`模式：
1. 当`DML`语句更新一个`NDB`表时 (`NDB` MySql Cluster 的存储引擎)
2. 当函数中包含`UUID()`时
3. 2个及以上包含`AUTO_INCREMENT`字段的表被更新时
4. 执行`INSERT DELAYED`语句时
5. 用`UDF`时
6. 视图中必须要求运用`Row`时,例如建立视图时使用了`UUID()`函数

---
ps:
- `DDL` 数据库模式定义语言 `create`
- `DML` 数据操纵语言 `Insert/delete/update`
- `DCL` 数据库控制语言 `grant/remove`
- `DQL` 数据库查询语言 `select`

---
## 两种模式的对比
### Statement 优点
- 历史悠久，技术成熟；
- 产生的 binlog 文件较小；
- binlog 中包含了所有数据库修改信息，可以据此来审核数据库的安全等情况；
- binlog 可以用于实时的还原，而不仅仅用于复制；
- 主从版本可以不一样，从服务器版本可以比主服务器版本高；

### Statement 缺点：
- 不是所有的 UPDATE 语句都能被复制，尤其是包含不确定操作的时候；
- 调用具有不确定因素的 UDF 时复制也可能出现问题；
- 运用以下函数的语句也不能被复制：
 - LOAD_FILE()
 - UUID()
 - USER()
 - FOUND_ROWS()
 - SYSDATE() (除非启动时启用了 –sysdate-is-now 选项)
- INSERT … SELECT 会产生比 RBR 更多的行级锁；
- 复制须要执行全表扫描 (WHERE 语句中没有运用到索引) 的 UPDATE 时，须要比 row 请求更多的行级锁；
- 对于有 AUTO_INCREMENT 字段的 InnoDB 表而言，INSERT 语句会阻塞其他 INSERT 语句；
- 对于一些复杂的语句，在从服务器上的耗资源情况会更严重，而 row 模式下，只会对那个发生变化的记录产生影响；
- 存储函数(不是存储流程 )在被调用的同时也会执行一次 NOW() 函数，这个可以说是坏事也可能是好事；
- 确定了的 UDF 也须要在从服务器上执行；
- 数据表必须几乎和主服务器保持一致才行，否则可能会导致复制出错； 
- 执行复杂语句如果出错的话，会消耗更多资源； 

### Row 优点
- 任何情况都可以被复制，这对复制来说是最安全可靠的；
- 和其他大多数数据库系统的复制技能一样；
- 多数情况下，从服务器上的表如果有主键的话，复制就会快了很多；
- 复制以下几种语句时的行锁更少：
 - INSERT … SELECT
 - 包含 AUTO_INCREMENT 字段的 INSERT
 - 没有附带条件或者并没有修改很多记录的 UPDATE 或 DELETE 语句
- 执行 INSERT，UPDATE，DELETE 语句时锁更少；
- 从服务器上采用多线程来执行复制成为可能；

### Row 缺点
- 生成的 binlog 日志体积大了很多；
- 复杂的回滚时 binlog 中会包含大量的数据；
- 主服务器上执行 UPDATE 语句时，所有发生变化的记录都会写到 binlog 中，而 statement 只会写一次，这会导致频繁发生 binlog - 的写并发请求；
- UDF 产生的大 BLOB 值会导致复制变慢；
- 不能从 binlog 中看到都复制了写什么语句(加密过的)；
- 当在非事务表上执行一段堆积的 SQL 语句时，最好采用 statement 模式，否则很容易导致主从服务器的数据不一致情况发生；
- 另外，针对系统库 MySQL 里面的表发生变化时的处理准则如下：
- 如果是采用 INSERT，UPDATE，DELETE 直接操作表的情况，则日志格式根据 binlog_format 的设定而记录；
- 如果是采用 GRANT，REVOKE，SET PASSWORD 等管理语句来做的话，那么无论如何都要使用 statement 模式记录；
- 使用 statement 模式后，能处理很多原先出现的主键重复问题；
---
END
