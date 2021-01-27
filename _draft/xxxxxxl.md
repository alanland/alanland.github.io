---
layout: post
title:  "Kubernetes Dashboard UI"
date:   2018-04-19 14:23:37
tags:   [kubernetes, k8s]
author: Alan Wang
---
http://www.xuxueli.com/xxl-job/#/?id=《分布式任务调度平台xxl-job》

0 = "email"
1 = "first_name"
2 = "family_name"
3 = "display_name"
4 = "gender"
5 = "locale"
6 = "picture_url"
7 = "profile_url"
8 = "location"


---

Caused by: java.lang.IllegalArgumentException: The class with cn.com.ittx.cbt.oauth.provider.session.SessionDetails and name of cn.com.ittx.cbt.oauth.provider.session.SessionDetails is not whitelisted. If you believe this class is safe to deserialize, please provide an explicit mapping using Jackson annotations or by providing a Mixin. If the serialization is only done by a trusted source, you can also enable default typing. See https://github.com/spring-projects/spring-security/issues/4370 for details
	at org.springframework.security.jackson2.SecurityJackson2Modules$WhitelistTypeIdResolver.typeFromId(SecurityJackson2Modules.java:209) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at com.fasterxml.jackson.databind.jsontype.impl.TypeDeserializerBase._findDeserializer(TypeDeserializerBase.java:156) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.jsontype.impl.AsPropertyTypeDeserializer._deserializeTypedForId(AsPropertyTypeDeserializer.java:113) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.jsontype.impl.AsPropertyTypeDeserializer.deserializeTypedFromObject(AsPropertyTypeDeserializer.java:97) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.jsontype.impl.AsPropertyTypeDeserializer.deserializeTypedFromAny(AsPropertyTypeDeserializer.java:193) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.deser.std.UntypedObjectDeserializer$Vanilla.deserializeWithType(UntypedObjectDeserializer.java:712) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.deser.impl.TypeWrappedDeserializer.deserialize(TypeWrappedDeserializer.java:68) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.ObjectMapper._readMapAndClose(ObjectMapper.java:4001) ~[jackson-databind-2.9.5.jar:2.9.5]
	at com.fasterxml.jackson.databind.ObjectMapper.readValue(ObjectMapper.java:3079) ~[jackson-databind-2.9.5.jar:2.9.5]
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer.deserialize(GenericJackson2JsonRedisSerializer.java:130) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	... 68 common frames omitted



https://docs.spring.io/spring-security/site/docs/5.0.5.RELEASE/reference/htmlsingle/#jackson



http://www.cnblogs.com/yhtboke/p/5764697.html

http://mossle.com/docs/auth/html/ch203-voter.html

https://www.cnblogs.com/softidea/p/7068149.html
https://blog.csdn.net/u012367513/article/details/38866465
https://www.jianshu.com/p/839e3b3b2554
