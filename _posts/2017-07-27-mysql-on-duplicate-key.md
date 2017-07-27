---
layout: post
title:  "MySql: ON DUPLICATE KEY"
date:   2017-07-27 13:27:37 +0000
tags:   [mysql, sql]
author: Alan Wang
---
MySql的`INSERT ... ON DUPLICATE KEY`语法,在插入时候,
如果遇到唯一索引列重复,就会忽略插入.

这个语法可以让我们避免插入重复的记录,或者拿来批量更新数据,提高效率.

首先看下数据:
```sql
select 
    id, warehouseCode, companyCode, loadId
from
    shipment_header
limit 0 , 9;
```

查询出:
```
'478331'	 'YTYC'	 'JXSG'	 '0'
'478332'	 'YTYC'	 'JXSG'	 '0'
'478333'	 'YTYC'	 'JXSG'	 '0'
'478334'	 'YTYC'	 'JXSG'	 '0'
'478335'	 'YTYC'	 'JXSG'	 '0'
'478336'	 'YTYC'	 'JXSG'	 '0'
'478337'	 'YTYC'	 'JXSG'	 '0'
'478338'	 'YTYC'	 'JXSG'	 '0'
'478339'	 'YTYC'	 'JXSG'	 '0'
```

执行:
```sql
INSERT INTO shipment_header
	(id, warehouseCode, companyCode, loadId)
VALUES
	('478331',	 'YTYC',	 'JXSG',	 '0'),
	('478332',	 'YTYC',	 'JXSG',	 '1'),
	('478333',	 'YTYC',	 'JXSG',	 '1'),
	('478334',	 'YTYC',	 'JXSG',	 '1'),
	('478335',	 'YTYC',	 'JXSG',	 '0'),
	('478336',	 'YTYC',	 'JXSG',	 '0'),
	('478337',	 'YTYC',	 'JXSG',	 '0'),
	('478338',	 'YTYC',	 'JXSG',	 '0'),
	('478339',	 'YTYC',	 'JXSG',	 '0')
ON DUPLICATE KEY UPDATE 
	loadId=values(loadId)+1, 
	companyCode='ALAN',
	warehouseCode=companyCode;
```

得到结果:
```
'478331', 'ALAN', 'ALAN', '1'
'478332', 'ALAN', 'ALAN', '2'
'478333', 'ALAN', 'ALAN', '2'
'478334', 'ALAN', 'ALAN', '2'
'478335', 'ALAN', 'ALAN', '1'
'478336', 'ALAN', 'ALAN', '1'
'478337', 'ALAN', 'ALAN', '1'
'478338', 'ALAN', 'ALAN', '1'
'478339', 'ALAN', 'ALAN', '1'
```
`warehouseCode`使用的是新 companyCode`值,和代码书写的顺序一致.

再执行:
```sql
INSERT INTO shipment_header
	(id, warehouseCode, companyCode, loadId)
VALUES
	('478331',	 'YTYC',	 'JXSG',	 '0'),
	('478332',	 'YTYC',	 'JXSG',	 '1'),
	('478333',	 'YTYC',	 'JXSG',	 '1'),
	('478334',	 'YTYC',	 'JXSG',	 '1'),
	('478335',	 'YTYC',	 'JXSG',	 '0'),
	('478336',	 'YTYC',	 'JXSG',	 '0'),
	('478337',	 'YTYC',	 'JXSG',	 '0'),
	('478338',	 'YTYC',	 'JXSG',	 '0'),
	('478339',	 'YTYC',	 'JXSG',	 '0')
ON DUPLICATE KEY UPDATE 
	loadId=values(loadId)+1, 
	warehouseCode=companyCode,
	companyCode='WANG';
```
得到
```
'478331', 'ALAN', 'WANG', '1'
'478332', 'ALAN', 'WANG', '2'
'478333', 'ALAN', 'WANG', '2'
'478334', 'ALAN', 'WANG', '2'
'478335', 'ALAN', 'WANG', '1'
'478336', 'ALAN', 'WANG', '1'
'478337', 'ALAN', 'WANG', '1'
'478338', 'ALAN', 'WANG', '1'
'478339', 'ALAN', 'WANG', '1'
```
`warehouseCode`使用的是原来的值,和代码书写的顺序一致.


---
END
