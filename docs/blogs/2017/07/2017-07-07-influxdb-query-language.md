---
title:  "InfluxDB: Query Language"
date:   2017-07-07 15:27:37
tags:   [influxdb]
---
## influxDB名词
- database：数据库；
- measurement：数据库中的表；
- points：表里面的一行数据。
## influxDB中独有的一些概念
Point由时间戳（time）、数据（field）和标签（tags）组成。

- time：每条数据记录的时间，也是数据库自动生成的主索引；
- fields：各种记录的值；
- tags：各种有索引的属性。

比如:
```json
{
    "measurement": "cpu_load_short",
    "tags": {
        "host": "server01",
        "region": "us-west"
    },
    "time": "2009-11-10T23:00:00Z",
    "fields": {
        "value": 22.2
    }
}
```
## series
所有在数据库中的数据，都需要通过图表来表示，
series表示这个表里面的所有的数据可以在图标上画成几条线
（注：线条的个数由tags排列组合计算出来）

```
show series from "example"."autogen"."cpu_load_short"
```
```
cpu_load_short,host=server01,region=us-west
cpu_load_short,host=server02,region=us-east
cpu_load_short,host=server02,region=us-west
```

## example
```sql
# 创建数据库  
create database "db_name" 

# 显示所有的数据库  
show databases  
  
# 删除数据库  
drop database "db_name"  
  
# 使用数据库  
use db_name  
  
# 显示该数据库中所有的表  
show measurements  
  
# 创建表，直接在插入数据的时候指定表名  
insert test,host=127.0.0.1,monitor_name=test count=1  
  
# 删除表  
drop measurement "measurement_name"  
```

```sql
# 查询
select * from test order by time desc  

# 当前数据库的保存策略
show retention policies on "db_name"
```
```sql
SELECT mean("value") AS "mean_value", mean("count") AS "mean_count" 
FROM "example"."autogen"."cpu_load_short" 
WHERE time > now() - 1h AND ("host"='server01' OR "host"='server02') GROUP BY time(1m)

SELECT mean("value") AS "mean_value" 
FROM "example"."autogen"."cpu_load_short" 
WHERE time > now() - 1h AND ("host"='server01' OR "host"='server02') 
GROUP BY time(1m), "host", "region"
```

## Query
```sql
select * from example.autogen.cpu_load_short

SELECT mean("value") AS "mean_value", sum("count") AS "sum_count" 
FROM "example"."autogen"."cpu_load_short" 
WHERE time > now() - 1h AND ("host"='server01' OR "host"='server02') 
GROUP BY time(1m)
```


---
Links:

- https://docs.influxdata.com/influxdb/v1.2/query_language/continuous_queries/
- http://blog.csdn.net/u010185262/article/details/53158786

---
END
