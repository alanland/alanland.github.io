---
layout: post
title:  "Kubernetes Error delete Pod"
date:   2019-10-08 10:58:00 +0000
tags:   [kubernetes, aliyun]
categories: [Cloud]
author: Alan Wang
---

SubTypeValidator

```
Exception in thread "main" java.lang.IllegalArgumentException: Invalid type definition for type `com.zaxxer.hikari.HikariDataSource`: Illegal type (com.zaxxer.hikari.HikariDataSource) to deserialize: prevented for security reasons
 at [Source: UNKNOWN; line: -1, column: -1]
	at com.fasterxml.jackson.databind.ObjectMapper._convert(ObjectMapper.java:3922)
	at com.fasterxml.jackson.databind.ObjectMapper.convertValue(ObjectMapper.java:3853)
	at com.fasterxml.jackson.databind.ObjectMapper$convertValue.call(Unknown Source)
	at org.codehaus.groovy.runtime.callsite.CallSiteArray.defaultCall(CallSiteArray.java:47)
	at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:115)
	at org.codehaus.groovy.runtime.callsite.AbstractCallSite.call(AbstractCallSite.java:135)
	at com.ittx.Application.main(Application.groovy:42)
Caused by: com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Invalid type definition for type `com.zaxxer.hikari.HikariDataSource`: Illegal type (com.zaxxer.hikari.HikariDataSource) to deserialize: prevented for security reasons
 at [Source: UNKNOWN; line: -1, column: -1]
	at com.fasterxml.jackson.databind.exc.InvalidDefinitionException.from(InvalidDefinitionException.java:62)
	at com.fasterxml.jackson.databind.DeserializationContext.reportBadTypeDefinition(DeserializationContext.java:1567)
	at com.fasterxml.jackson.databind.jsontype.impl.SubTypeValidator.validateSubType(SubTypeValidator.java:172)
	at com.fasterxml.jackson.databind.deser.BeanDeserializerFactory._validateSubType(BeanDeserializerFactory.java:925)
	at com.fasterxml.jackson.databind.deser.BeanDeserializerFactory.createBeanDeserializer(BeanDeserializerFactory.java:141)
	at com.fasterxml.jackson.databind.deser.DeserializerCache._createDeserializer2(DeserializerCache.java:411)
	at com.fasterxml.jackson.databind.deser.DeserializerCache._createDeserializer(DeserializerCache.java:349)
	at com.fasterxml.jackson.databind.deser.DeserializerCache._createAndCache2(DeserializerCache.java:264)
	at com.fasterxml.jackson.databind.deser.DeserializerCache._createAndCacheValueDeserializer(DeserializerCache.java:244)
	at com.fasterxml.jackson.databind.deser.DeserializerCache.findValueDeserializer(DeserializerCache.java:142)
	at com.fasterxml.jackson.databind.DeserializationContext.findRootValueDeserializer(DeserializationContext.java:476)
	at com.fasterxml.jackson.databind.ObjectMapper._findRootDeserializer(ObjectMapper.java:4389)
	at com.fasterxml.jackson.databind.ObjectMapper._convert(ObjectMapper.java:3915)
```


---

参考：

- https://stackoverflow.com/questions/50336665/how-do-i-force-delete-kubernetes-pods/50338057


