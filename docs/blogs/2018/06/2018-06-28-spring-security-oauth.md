---
title:  "Spring Security Errors"
date:   2018-06-25 12:23:37
tags:   [spring, security]
---

凌乱一对错

# Bean method 'clientRegistrationRepository' not loaded because OAuth2 Clients Configured Condition registered clients is not available

https://github.com/spring-projects/spring-boot/issues/12654

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-security-oauth2-client

配置格式更新了

# Caused by: java.lang.ClassNotFoundException: org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter


  compile 'org.springframework.security:spring-security-oauth2-client'

## order
```
Caused by: java.lang.IllegalStateException: @Order on WebSecurityConfigurers must be unique. Order of 100 was already used on cn.com.ittx.cbt.oauth.client.UiSecurityConfig$$EnhancerBySpringCGLIB$$eb64ae96@d34cee7, so it cannot be used on cn.com.ittx.cbt.oauth.client.config.Config1$$EnhancerBySpringCGLIB$$5225a823@2057c0e2 too.
	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration.setFilterChainProxySecurityConfigurer(WebSecurityConfiguration.java:148) ~[spring-security-config-5.0.6.RELEASE.jar:5.0.6.RELEASE]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_151]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_151]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_151]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_151]
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor$AutowiredMethodElement.inject(AutowiredAnnotationBeanPostProcessor.java:699) ~[spring-beans-5.0.7.RELEASE.jar:5.0.7.RELEASE]
	at org.springframework.beans.factory.annotation.InjectionMetadata.inject(InjectionMetadata.java:91) ~[spring-beans-5.0.7.RELEASE.jar:5.0.7.RELEASE]
	at org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor.postProcessPropertyValues(AutowiredAnnotationBeanPostProcessor.java:373) ~[spring-beans-5.0.7.RELEASE.jar:5.0.7.RELEASE]
	... 23 common frames omitted
```