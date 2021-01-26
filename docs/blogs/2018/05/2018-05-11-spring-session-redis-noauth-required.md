---
layout: post
title:  "Spring Security 5 – There is no PasswordEncoder mapped for the id “null”"
date:   2018-05-11 14:23:37 +0000
tags:   [spring-session, spring]
author: Alan Wang
---

Spring Session 使用Redis，Redis不能使用密码验证。

```
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'enableRedisKeyspaceNotificationsInitializer' defined in class path resource [org/springframework/boot/autoconfigure/session/RedisSessionConfiguration$SpringBootRedisHttpSessionConfiguration.class]: Invocation of init method failed; nested exception is org.springframework.data.redis.RedisSystemException: Error in execution; nested exception is io.lettuce.core.RedisCommandExecutionException: NOAUTH Authentication required.
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1702) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:579) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:501) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:317) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:228) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:315) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:199) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:760) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:869) ~[spring-context-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:550) ~[spring-context-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:140) ~[spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:759) [spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:395) [spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:327) [spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1255) [spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1243) [spring-boot-2.0.1.RELEASE.jar:2.0.1.RELEASE]
	at cn.com.ittx.cbt.oauth.provider.SecurityProvider.main(SecurityProvider.java:13) [classes/:na]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_151]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_151]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_151]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_151]
	at org.springframework.boot.devtools.restart.RestartLauncher.run(RestartLauncher.java:49) [spring-boot-devtools-2.0.1.RELEASE.jar:2.0.1.RELEASE]
Caused by: org.springframework.data.redis.RedisSystemException: Error in execution; nested exception is io.lettuce.core.RedisCommandExecutionException: NOAUTH Authentication required.
	at org.springframework.data.redis.connection.lettuce.LettuceExceptionConverter.convert(LettuceExceptionConverter.java:54) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.lettuce.LettuceExceptionConverter.convert(LettuceExceptionConverter.java:52) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.lettuce.LettuceExceptionConverter.convert(LettuceExceptionConverter.java:41) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.PassThroughExceptionTranslationStrategy.translate(PassThroughExceptionTranslationStrategy.java:44) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.FallbackExceptionTranslationStrategy.translate(FallbackExceptionTranslationStrategy.java:42) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.lettuce.LettuceConnection.convertLettuceAccessException(LettuceConnection.java:257) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.lettuce.LettuceServerCommands.convertLettuceAccessException(LettuceServerCommands.java:571) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.lettuce.LettuceServerCommands.getConfig(LettuceServerCommands.java:307) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.data.redis.connection.DefaultedRedisConnection.getConfig(DefaultedRedisConnection.java:1119) ~[spring-data-redis-2.0.6.RELEASE.jar:2.0.6.RELEASE]
	at org.springframework.session.data.redis.config.ConfigureNotifyKeyspaceEventsAction.getNotifyOptions(ConfigureNotifyKeyspaceEventsAction.java:76) ~[spring-session-data-redis-2.0.2.RELEASE.jar:2.0.2.RELEASE]
	at org.springframework.session.data.redis.config.ConfigureNotifyKeyspaceEventsAction.configure(ConfigureNotifyKeyspaceEventsAction.java:57) ~[spring-session-data-redis-2.0.2.RELEASE.jar:2.0.2.RELEASE]
	at org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration$EnableRedisKeyspaceNotificationsInitializer.afterPropertiesSet(RedisHttpSessionConfiguration.java:286) ~[spring-session-data-redis-2.0.2.RELEASE.jar:2.0.2.RELEASE]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1761) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1698) ~[spring-beans-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	... 21 common frames omitted
```