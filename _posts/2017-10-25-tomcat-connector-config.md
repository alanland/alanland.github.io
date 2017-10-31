---
layout post
title  "Tomcat Connector"
date   2017-10-27 04:57:37 +0000
tags   [tomcat]
author Alan Wang
---

```
<Connector executor="tomcatThreadPool"
               port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```
<Connector
    className="org.apache.coyote.tomcat4.CoyoteConnector"
    port="8080"minProcessors="5" maxProcessors="75"
    enableLookups="true" redirectPort="8443"
    acceptCount="10" debug="0" connectionTimeout="20000"
    useURIValidationHack="false"
/>

## protocol

- `org.apache.coyote.ajp.AjpProtocol` - blocking Java connector
- `org.apache.coyote.ajp.AjpNioProtocol` - non blocking Java NIO connector.
- `org.apache.coyote.ajp.AjpNio2Protocol` - non blocking Java NIO2 connector.
- `org.apache.coyote.ajp.AjpAprProtocol` - the APR/native connector.

[Connector Comparison](http://tomcat.apache.org/tomcat-8.0-doc/config/ajp.html#Connector_Comparison)


Links:
- http://tomcat.apache.org/tomcat-8.0-doc/connectors.html
- http://tomcat.apache.org/tomcat-8.0-doc/config/ajp.html
- https://tomcat.apache.org/tomcat-8.0-doc/config/http.html
- http://blog.csdn.net/u010297957/article/details/50782212

---
END

