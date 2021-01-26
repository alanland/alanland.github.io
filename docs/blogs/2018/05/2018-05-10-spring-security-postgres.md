---
title:  "Spring Security Postgresql"
date:   2018-05-10 08:23:37 +0000
tags:   [spring-security, postgres]
categories: [Java]
---

```java
auth.jdbcAuthentication()
            .dataSource(dataSource)
            .withDefaultSchema();
```

Spring 默认的建表语句不兼容postgers，会出现如下错误：

```
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'org.springframework.boot.autoconfigure.security.oauth2.authserver.OAuth2AuthorizationServerConfiguration': Bean instantiation via constructor failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.springframework.boot.autoconfigure.security.oauth2.authserver.OAuth2AuthorizationServerConfiguration$$EnhancerBySpringCGLIB$$8f3b1526]: Constructor threw exception; nested exception is org.springframework.jdbc.datasource.init.ScriptStatementFailedException: Failed to execute SQL script statement #1 of class path resource [org/springframework/security/core/userdetails/jdbc/users.ddl]: create table users(username varchar_ignorecase(50) not null primary key,password varchar_ignorecase(500) not null,enabled boolean not null); nested exception is org.postgresql.util.PSQLException: ERROR: type "varchar_ignorecase" does not exist
  Position: 29
```

没去搜索相关的解决方案，暂时去掉`withDefaultSchema`，手动建表。


