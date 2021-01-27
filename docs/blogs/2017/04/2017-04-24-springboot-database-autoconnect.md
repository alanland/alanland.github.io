---
title:  "Spring Boot Database Auto Connect"
date:   2017-04-24 10:07:37
img:  docker-jekyll.jpg
description: "Spring Boot Database Auto Connect"
tags:   [spring, springboot, database, java]
categories: [Java]
---
SpringBoot配置数据库的自动重连：

http://stackoverflow.com/questions/22684807/spring-boot-jpa-configuring-auto-reconnect

```yml
spring.datasource:
    max-idle: 10
    max-lifetime: 10000
    min-idle: 5
    initial-size: 5
    test-on-borrow: true
    test-while-idle: true
    validationQuery: SELECT 1
    time-between-eviction-runs-millis: 18800
    jdbc-interceptors: ConnectionState;SlowQueryReport(threshold=5)
    validation-query: SELECT 1 FROM DUAL
    spring.datasource.dbcp.test-while-idle=true
    spring.datasource.dbcp.time-between-eviction-runs-millis=3600000
    spring.datasource.dbcp.validation-query=SELECT 1
```

---
END