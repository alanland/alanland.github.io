---
layout: post
title:  "Prometheus: Query Language"
date:   2017-07-07 09:27:37 +0000
tags:   [prometheus]
author: Alan Wang
---
## data type
比如数据: 

```shell
wms_shipment_count_daily_g{company="company3",customer="media",exported_job="my_job",instance="pushgateway:9091",job="pushgateway",warehouse="beijing"}	
```

- 即时向量(Instant vector) 包含每个时间序列的单个样本的一组时间序列，共享相同的时间戳。
 - wms_shipment_count_daily_g
 - rate(wms_shipment_count_daily_g[10m])
- 范围向量(Range vector) 包含每个时间序列随时间变化的数据点的一组时间序列。
 - wms_shipment_count_daily_g[10m]
- 标量(Scalar) 一个简单的数字浮点值
- 字符串(String) 一个简单的字符串值(目前未被使用)

## Time series Selectors
`selects all time series` that have the http_requests_total metric name
```python
http_requests_total
```

`filter these time series` further by appending a set of labels to match in curly braces ({}).
```python
http_requests_total{job="prometheus",group="canary"}
```

`label matching operators`
- `=` : Select labels that are exactly equal to the provided string.
- `!=` : Select labels that are not equal to the provided string.
- `=~` : Select labels that regex-match the provided string (or substring).
- `!~` : Select labels that do not regex-match the provided string (or substring).

```python
http_requests_total{environment=~"staging|testing|development",method!="GET"}
```

Vector selectors must either specify a name or at least one label matcher that does not match the empty string. 
```python
{job=~".*"} # Bad!

{job=~".+"}              # Good!
{job=~".*",method="get"} # Good!
```
`http_requests_total` is equivalent to `{__name__="http_requests_total"}`,
Matchers other than `= (!=, =~, !~)` may also be used

## Range Vector Selectors
range duration is appended in square brackets (`[]`) at the `end of a vector selector`
 
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days
- `w` - weeks
- `y` - years

```python
http_requests_total{job="prometheus"}[5m]
```

## Offset modifier
The offset modifier allows changing the time offset for individual instant and range vectors in a query

```python
# 五分钟前的数据
http_requests_total offset 5m 
```

offest 始终需要跟随选择器
```java
sum(http_requests_total{method="GET"} offset 5m) // GOOD.

sum(http_requests_total{method="GET"}) offset 5m // INVALID.
```

##　操作符
### Comparison binary operators
- `==` (equal)
- `!=` (not-equal)
- `>` (greater-than)
- `<` (less-than)
- `>=` (greater-or-equal)
- `<=` (less-or-equal)

### Logical/set binary operators
These logical/set binary operators are only defined between instant vectors:

- `and` (intersection)
- `or` (union)
- `unless` (complement)

### Aggregation operators
- `sum` (calculate sum over dimensions)
- `min` (select minimum over dimensions)
- `max` (select maximum over dimensions)
- `avg` (calculate the average over dimensions)
- `stddev` (calculate population standard deviation over dimensions)s)
- `stdvar` (calculate population standard variance over dimensions))
- `count` (count number of elements in the vector)
- `count_values` (count number of elements with the same value)
- `bottomk` (smallest k elements by sample value)
- `topk` (largest k elements by sample value)
- `quantile` (calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions)

可以使用function: `<aggregation>_over_time`

## 示例

```shell
count(wms_shipment_count_daily_g) by(warehouse)
sum(wms_shipment_count_daily_g) by(warehouse)
sum(wms_shipment_count_daily_g) without(warehouse, campany)

# sum_over_time
sum(sum_over_time(wms_shipment_count_daily_g[10s])) by (warehouse)
```

---
Links:
- [basics](https://prometheus.io/docs/querying/basics/)
- [operators](https://prometheus.io/docs/querying/operators/)
- [functions](https://prometheus.io/docs/querying/functions/)
- [jianshu](http://www.jianshu.com/p/d187ac561eb8)

---
END
