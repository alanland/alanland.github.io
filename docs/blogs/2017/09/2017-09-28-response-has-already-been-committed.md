---
title:  "Tomcat: the response has already been committed"
date:   2017-09-28 03:57:37
tags:   [spring, tomcat]
categories: [Java]
---

Server遇到如下错误

```
o.s.boot.web.support.ErrorPageFilter     : Cannot forward to error page for 
request [/strategy/list/] as the response has already been committed. As a 
result, the response may have the wrong status code. If your application is 
running on WebSphere Application Server you may be able to resolve this 
problem by setting com.ibm.ws.webcontainer.invokeFlushAfterService to false
```

网上有看到一些解决方案，实际上是发送了多次报表请求，在第一个请求还没有返回的时候。

- http://www.jianshu.com/p/d5b09aa5d082
- https://stackoverflow.com/questions/30170586/how-to-disable-errorpagefilter-in-spring-boot

---
END
