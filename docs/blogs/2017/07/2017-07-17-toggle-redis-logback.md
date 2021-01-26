---
title:  "View log runtime using redis"
date:   2017-07-17 20:27:37 +0000
tags:   [redis, logback, java]
---
一个在线查看日志的需求,要可以运行时查看(点击查看开始看,点击停止就不看了).

有一些方案:
- JMX
- 读取日志File
- 自定义Appender

我觉得应该还会更可行的方法,但是基于简单可维护,我这里自定义一个` Appender`,
根据系统参数记录日志到`Redis`,后台读取Redis把日志返回.

基于`logback-redis-appender`定制`RedisAppender`类:

```java
@Override
protected void append(ILoggingEvent event) {
    if (!RedisLogConfig.enabled()) {
        return
    }
    Jedis client = pool.getResource()
    try {
        String json = layout == null ? jsonlayout.doLayout(event) : layout.doLayout(event)
        client.rpush(key, json)
    } catch (Exception e) {
        e.printStackTrace()
        pool.returnBrokenResource(client)
        client = null
    } finally {
        if (client != null) {
            pool.returnResource(client)
        }
    }
}
```


---
Links:
- [logback-redis-appender](https://github.com/kmtong/logback-redis-appender)

---
END
