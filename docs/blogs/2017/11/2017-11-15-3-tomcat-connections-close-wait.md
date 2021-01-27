---
title:  "Tomcat Connections Close Wait"
date:   2017-11-15 10:23:37
tags:   [tomcat]
---

设置 server.xml `keepAliveTimeout="0"`

```
<Connector port="33011" protocol="org.apache.coyote.http11.Http11NioProtocol"
           connectionTimeout="20000" maxThreads="1000" URIEncoding="UTF-8" keepAliveTimeout="0" />
```


- [omcat不定期close_wait过多](https://segmentfault.com/q/1010000003919178)
- [服务器TIME_WAIT和CLOSE_WAIT详解和解决办法](https://www.cnblogs.com/sunxucool/p/3449068.html)
