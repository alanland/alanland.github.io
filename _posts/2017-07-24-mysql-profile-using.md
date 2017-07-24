---
layout: post
title:  "MySql: Profiling"
date:   2017-07-24 13:27:37 +0000
tags:   [mysql, profile]
author: Alan Wang
---

```sql
set profiling=1;
select * from ttx_user;
show profiles;
show profile cpu, block io for query 4;
```


---
END
