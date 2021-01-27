---
title:  "Tomcat Post Request Header Invalid Character"
date:   2017-05-18 12:27:37
tags:   [tomcat]
categories: [Java]
---
使用Tomcat之后，遇到了下面一个报错：
```
 org.apache.coyote.http11.Http11Processor.service Error parsing HTTP request header
 Note: further occurrences of HTTP header parsing errors will be logged at DEBUG level.
 java.lang.IllegalArgumentException: Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986
        at org.apache.coyote.http11.Http11InputBuffer.parseRequestLine(Http11InputBuffer.java:472)
        at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:683)
        at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)
        at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:861)
        at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1455)
        at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)
        at java.lang.Thread.run(Thread.java:745)
```

stackoverflow上面发现了这样一个回答：

This behavior is introduced in all major Tomcat releases:
 - Tomcat 7.0.73, 8.0.39, 8.5.7

For a quick fix, you can downgrade to one of older versions.

Based on [changelog](https://tomcat.apache.org/tomcat-8.5-doc/changelog.html), those changes could affect this behavior:

Tomcat 8.5.3:

> Ensure that requests with HTTP method names that are not tokens (as required by RFC 7231) are rejected with a 400 response
Tomcat 8.5.7:

> Add additional checks for valid characters to the HTTP request line parsing so invalid request lines are rejected sooner.
But eventually you want to encode your URL on client:

```
encodeURI("http://localhost:8080/app/handleResponse?msg=name|id|")
> http://localhost:8080/app/handleResponse?msg=name%7Cid%7C
```

or just query string:

```
encodeURIComponent("msg=name|id|")
> msg%3Dname%7Cid%7C
```

It will secure you from other problematic characters (list of invalid URI characters).

另一种解决方法：


Since `Tomcat 7.0.76, 8.0.42, 8.5.12` you can define property [requestTargetAllow](https//tomcat.apache.org/tomcat-8.5-doc/config/systemprops.html)
to allow forbiden characters.

Add this line in your `catalina.properties`

```properties
tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}
```

---

参考： http://stackoverflow.com/questions/41053653/tomcat-8-is-not-able-to-handle-get-request-with-in-query-parameters

---
END
