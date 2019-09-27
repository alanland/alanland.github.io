---
layout: post
title:  "SqlAlchemy Dynamic Query"
date:   2017-10-25 07:57:37 +0000
tags:   [sqlalchemy]
author: Alan Wang
---

## 1.filter_by

filter_by用于查询简单的列名，不支持比较运算符。

```python
filters = {’name': ‘fengyao', ‘age': 26}
User.query.filter_by(**filters).first()
```

## 2.filter

比filter_by的功能更强大，支持比较运算符，支持or_、in_等语法。

```python
filters = {
     User.name == ‘fengyao’,
     User.age > 25
}
User.query.filter(*filters).first()
```

参考：
- http://stackoverflow.com/questions/29885879/sqlalchemy-dynamic-filter-by

---
END

