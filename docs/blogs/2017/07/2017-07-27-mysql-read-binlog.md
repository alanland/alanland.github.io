---
title:  "MySql read binlog"
date:   2017-07-27 11:27:37 +0000
tags:   [mysql, binlog]
categories: [DevOps]
---

拷贝或者下载binlog文件，比如　`mysql-bin00000111`

```markdown 
mysqlbinlog  --base64-output=decode-rows -v  mysql-bin00000111 > mysql-bin00000111.sql
```

打开SQL文件,即可看到了类似内容:
```
# at 489593
#170724 20:42:00 server id 1526520475  end_log_pos 489656 CRC32 0x0f351a29 	Query	thread_id=638237870	exec_time=0	error_code=0
SET TIMESTAMP=1500928920/*!*/;
BEGIN
/*!*/;
# at 489656
#170724 20:42:00 server id 1526520475  end_log_pos 489780 CRC32 0xa35118f6 	Table_map: `wany`.`shipment_history` mapped to number 536
# at 489780
#170724 20:42:00 server id 1526520475  end_log_pos 489912 CRC32 0x271fe008 	Write_rows: table id 536 flags: STMT_END_F
### INSERT INTO `wany`.`shipment_history`
### SET
###   @1=49611
###   @2=270149
###   @3='3707253620043'
...
```



---
END
