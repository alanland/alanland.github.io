---
title:  "Tomcat server.xml"
date:   2017-11-17 10:23:37 +0000
tags:   [tomcat]
categories: [DevOps]
---

```xml
<?xml version='1.0' encoding='utf-8'?>
<Server port="8015" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />
  <GlobalNamingResources>
  </GlobalNamingResources>
  <Service name="Catalina">
    <Connector port="80"  protocol="org.apache.coyote.http11.Http11AprProtocol" compression="on"
              acceptCount="128" connectionTimeout="20000" maxConnections="512"
  pollerSize="512"  maxKeepAliveRequests="256"
  maxThreads="512" minSpareThreads="128" processorCache="512"
              enableLookups="false" redirectPort="443" />
<Connector port="443" protocol="org.apache.coyote.http11.Http11AprProtocol"
            acceptCount="1024" connectionTimeout="5000" maxConnections="2048"
pollerSize="2048"  maxKeepAliveRequests="1024"
maxThreads="1024" minSpareThreads="512" processorCache="1024"
           scheme="https" secure="true" clientAuth="false" SSLEnabled="true"
   SSLCACertificateFile="/usr/local/tomcat/conf/ca.crt"
           SSLCertificateFile="/usr/local/tomcat/conf/server.crt"
           SSLCertificateKeyFile="/usr/local/tomcat/conf/server.pem"

SSLProtocol="TLSv1+TLSv1.1+TLSv1.2"
    SSLCipherSuite="ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4"  />

    <Engine name="Catalina" defaultHost="localhost">

             <Host name="localhost"  appBase="/usr/local/tomcat"
            unpackWARs="true" autoDeploy="true">
<Context path="" docBase="/usr/local/tomcat/webapps/mall_pingan"/>

      </Host>
    </Engine>
  </Service>
</Server>
```
