---
title:  "Export Sql Result to Excel"
date:   2017-09-29 03:57:37 +0000
tags:   [mqsql]
---

## 方案一

```sql
select xxx FROM order
INTO OUTFILE 'D:/orders.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

可能有权限问题

## 方案二

```sql
create table item_csv  as SELECT
xxx
 FROM item
```

用`DataGrid`的`Dump data to file`功能。

70w行数据100M也就花了一分钟。 

---
END
