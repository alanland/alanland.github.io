---
layout: post
title:  "MySql JDBC batch operation performance"
date:   2017-07-24 13:27:37 +0000
tags:   [mysql, jdbc]
author: Alan Wang
---
对一个50多万行记录的表中更新数据,每次读取1000,根据主键id进行更新,
每次对1000条数据进行更新,测试平局消耗时间大概在18秒.

```markdown
0000	 	 17363 finish
1000	 	 16465 finish
2000	 	 18326 finish
3000	 	 17717 finish
4000	 	 16415 finish
5000	 	 18335 finish
6000	 	 16864 finish
7000	 	 17836 finish
8000	 	 17948 finish
9000	 	 17993 finish
10000	 	 16410 finish
11000	 	 18368 finish
12000	 	 18536 finish
13000	 	 19096 finish
14000	 	 18106 finish
15000	 	 18973 finish
16000	 	 18720 finish
17000	 	 22946 finish
18000	 	 20874 finish
19000	 	 21129 finish
```

jdbc连接增加参数`useServerPrepStmts=false&rewriteBatchedStatements=true`,

```markdown
1000	 	 448 finish
2000	 	 412 finish
3000	 	 411 finish
4000	 	 402 finish
5000	 	 401 finish
6000	 	 408 finish
7000	 	 395 finish
8000	 	 401 finish
9000	 	 391 finish
10000	 	 917 finish
11000	 	 1427 finish
12000	 	 1194 finish
13000	 	 1256 finish
14000	 	 1224 finish
15000	 	 1728 finish
16000	 	 1103 finish
17000	 	 1388 finish
18000	 	 1248 finish
19000	 	 1220 finish
20000	 	 1297 finish
21000	 	 1187 finish
22000	 	 1309 finish
23000	 	 1259 finish
```
1000条数据平均1.2秒,对于更新过的数据耗时400毫秒.

`useServerPrepStmts`默认已经是false,如果改成true,可能也没有太大影响.

`rewriteBatchedStatements`设置为true的时候,jdbc发送到mysql server的sql语句会
由:
```sql
INSERT INTO X VALUES (A1,B1,C1)
INSERT INTO X VALUES (A2,B2,C2)
...
INSERT INTO X VALUES (An,Bn,Cn)
```
变成:
```sql
INSERT INTO X VALUES (A1,B1,C1),(A2,B2,C2),...,(An,Bn,Cn)
```

可以通过 `SET global general_log = 1` 来监控到这些sql.

---
Links:
- https://stackoverflow.com/questions/2993251/jdbc-batch-insert-performance


---
END
