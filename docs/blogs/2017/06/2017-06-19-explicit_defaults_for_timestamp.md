---
title:  "MySql: explicit_defaults_for_timestamp"
date:   2017-06-19 11:57:37
tags:   [mysql]
---
MySql参数，转换为空insert为默认值．

`my.cnf`中加入

```shell
explicit_defaults_for_timestamp=true
```

如果是表里面没有默认值的话，可以更新下表：
 
```sql
ALTER TABLE salt CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
```

[MySql文档](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp)

[翻译：](http://www.tuicool.com/articles/fiE7V3)

---
END
