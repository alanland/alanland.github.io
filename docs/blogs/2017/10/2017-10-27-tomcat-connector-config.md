---
title:  "Tomcat Connector"
date:   2017-10-27 04:57:37 +0000
tags:   [tomcat]
categories: [DevOps]
---

```
<Connector executor="tomcatThreadPool"
               port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
<Connector
    className="org.apache.coyote.tomcat4.CoyoteConnector"
    port="8080"minProcessors="5" maxProcessors="75"
    enableLookups="true" redirectPort="8443"
    acceptCount="10" debug="0" connectionTimeout="20000"
    useURIValidationHack="false"
/>
```

### `maxConnections`

服务器接受和处理的最大连接数。 

- BIO 默认为 `maxThreads`
- NIO / NIO2 默认为 10000
- APR/native 默认为8192

超过这个数字，服务器只会接收，但是不会处理请求。这些多余的请求一直等到服务处理请求降低到`maxConnections`之下再处理。多余的连接数数量基于`acceptCount`这个参数。

如果参数设置为-1，会禁用`maxConnections`这个属性，那么服务器就不计算连接数了。


### `maxThreads`

- default 200

对于CPU密集的程序来说，该值不应该设的太大，以减少不同线程对CPU资源的抢占。
对于IO密集型的程序来说，参数可以调大点。

### `acceptCount`

连接超过 maxConnections+acceptCount 之后，Tomcat会拒绝新的连接。

### `maxKeepAliveRequests`

nginx动态的转给tomcat，nginx是不能keepalive的，而tomcat端默认开启了keepalive，会等待keepalive的timeout，默认不设置就是使用connectionTimeout。

所以必须设置tomcat的超时时间，并关闭tomcat的keepalive。否则会产生大量tomcat的socket timewait。

`maxKeepAliveRequests="1"` 就可以避免tomcat产生大量的TIME_WAIT连接，从而从一定程度上避免tomcat假死。

- default 100

## `minSpareThreads` default 10

最小运行线程，即使没有请求，这些线程也存在。


## `processorCache` default 200

最大 Process object数量，如果没有使用 Servlet 3.0 asynchronous processing，推荐和 maxConnections 相同，如果使用了的话，那么推荐 maxConnections 和期望最大请求并发数（同步+异步）的最大值。


## protocol

- `org.apache.coyote.ajp.AjpProtocol` - blocking Java connector
  - 默认的方式。使用传统的Java I/O，(java.io包)，性能最差。
- `org.apache.coyote.ajp.AjpNioProtocol` - non blocking Java NIO connector.
  - Java SE 1.4 之后提供。（java.nio）。基于缓冲，并能提供非阻塞I/O。
- `org.apache.coyote.ajp.AjpNio2Protocol` - non blocking Java NIO2 connector.
- `org.apache.coyote.ajp.AjpAprProtocol` - the APR/native connector.
  - apr（Apache Portable Runtime/Apache可移植运行时库)
  - 以JNI形式调用Apache HTTP服务器的核心动态链接库来处理文件读取或网络传输操作，从而大大提供静态文件处理性能。从操作系统级别解决异步IO问题，大幅度提高性能。
  - 是Tomcat上高并发应用的首选模式。

### 查看

1. http://x.x.x.x:8080/manager/status 
2. 查看启动日志

- bio

    ```
    INFO: Initializing ProtocolHandler ["http-bio-8080"]
    Aug 04, 2015 10:20:35 PM org.apache.coyote.AbstractProtocol init
    ```

- nio

    ```
    INFO: Initializing ProtocolHandler ["http-nio-8080"]
    Aug 04, 2015 10:27:58 PM org.apache.coyote.AbstractProtocol init
    ```

- apr

    ```
    INFO: Initializing ProtocolHandler ["http-apr-8080"]
    Aug 04, 2015 10:33:45 PM org.apache.coyote.AbstractProtocol init
    ```

## demo

```xml
<?xml version='1.0' encoding='utf-8'?>
<Server port="8015" shutdown="SHUTDOWN">
    <Listener className="org.apache.catalina.startup.VersionLoggerListener"/>
    <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on"/>
    <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>
    <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>
    <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>
    <GlobalNamingResources>
        <Resource name="UserDatabase" auth="Container"
                  type="org.apache.catalina.UserDatabase"
                  description="User database that can be updated and saved"
                  factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
                  pathname="conf/tomcat-users.xml"/>
    </GlobalNamingResources>
    <Service name="Catalina">
        <Connector port="8080" protocol="org.apache.coyote.http11.Http11AprProtocol" compression="on"
                   disableUploadTimeout="true"
                   acceptCount="1024" connectionTimeout="20000" maxConnections="2048"
                   pollerSize="2048" maxKeepAliveRequests="1" keepAliveTimeout="0"
                   maxThreads="1024" minSpareThreads="256" processorCache="1024"
                   enableLookups="false" redirectPort="8443"/>
        <Engine name="Catalina" defaultHost="localhost">
            <Host name="localhost" appBase="../../webapps/default"
                  unpackWARs="true" autoDeploy="true">
                <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
                       prefix="localhost_access_log" suffix=".txt"
                       pattern="%h %l %u %t &quot;%r&quot; %s %b"/>
            </Host>
        </Engine>
    </Service>
</Server>

```




[Connector Comparison](http://tomcat.apache.org/tomcat-8.0-doc/config/ajp.html#Connector_Comparison)


Links:
- [Connectors How To](http://tomcat.apache.org/tomcat-8.0-doc/connectors.html)
- [The AJP Connector](http://tomcat.apache.org/tomcat-8.0-doc/config/ajp.html)
- [The HTTP Connector](https://tomcat.apache.org/tomcat-8.0-doc/config/http.html)
- [Apache Tomcat Native Library](http://tomcat.apache.org/native-doc/)
- http://blog.csdn.net/u010297957/article/details/50782212

---
END

