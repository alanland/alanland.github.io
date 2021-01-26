---
title:  "MySql: single-column index, multi-culomn index"
date:   2017-08-11 12:57:37 +0000
tags:   [mysql, index]
---
考虑使用索引的只要有两种类型:
- join 子句出现的列
- where 子句出现的列

MySQL只有对以下操作符才使用索引`<`，`<=`，`=`，`>`，`>=`，`BETWEEN`，`IN`，以及某些时候的`LIKE`。
- 可以在LIKE操作中使用索引的情形是指另一个操作数不是以通配符（`%`或者`_`）开头的情形

多个单列索引:
- 首先使用索引限制到第一个索引的范围
- 然后对中间结果集上进行扫表,过滤其他条件(不使用索引)

多列索引:
- 在不扫描一条数据的情况下,找到目标记录

在执行查询的时候,mysql只能使用一个索引(MySql会使用限制最严格的索引,查询优化器穷据,获得性能最好的索引)


---
Links:
- http://imfei.blog.51cto.com/1849649/511689
- http://greatwqs.iteye.com/blog/1897118
- https://stackoverflow.com/questions/2349817/two-single-column-indexes-vs-one-two-column-index-in-mysql
- https://stackoverflow.com/questions/20273998/mysql-beginner-multiple-column-index
- https://stackoverflow.com/questions/12728832/understanding-multiple-column-indexes-in-mysql-query
- https://www.percona.com/blog/2014/01/03/multiple-column-index-vs-multiple-indexes-with-mysql-56/

---
END
