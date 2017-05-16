---
layout: post
title:  "Spring Boot Admin"
date:   2017-05-13 03:27:37 +0000
tags:   [spring, spring-boot, spring-boot-admin]
author: Alan Wang
---
`Spring Boot Admin` 提供了Actuator之上提供了一个WEB UI。
可以查看比如JVM、类加载、HTTP监控、活跃会话数量、当前应用并发数、延迟等信息。

该项目分为Admin和Client两部分，Admin来收集Client的信息，并且展示出来。

## 项目信息
项目地址: [https://github.com/codecentric/spring-boot-admin](https://github.com/codecentric/spring-boot-admin)

文档： [http://codecentric.github.io/spring-boot-admin/1.5.0/#getting-started](http://codecentric.github.io/spring-boot-admin/1.5.0/#getting-started)

### Spring Boot Admin Server
```groovy
compile "de.codecentric:spring-boot-admin-server:1.5.0"
compile "de.codecentric:spring-boot-admin-server-ui:1.5.0"
```

`application.yml`
```yml

```

### Spring Boot Admin Client
```groovy
compile "de.codecentric:spring-boot-admin-starter-client:1.5.0"
```

`application.yml`
```yml
spring.application.name: Spring Boot Web
spring.boot.admin.url: http://localhost:8080
```


## 服务端程序
### Application.scala
```scala
import de.codecentric.boot.admin.config.EnableAdminServer
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration

/**
  * @author 王成义
  * @version 5/13/17
  */
@SpringBootApplication(exclude = Array(classOf[SessionAutoConfiguration]))
@EnableAdminServer
class Application {

}

object Application extends App {
  SpringApplication.run(classOf[Application])
}
```

## 预览


![]({{ site.baseurl }}/assets/images/spring-boot-admin/home.png)

![]({{ site.baseurl }}/assets/images/spring-boot-admin/detail.png)

![]({{ site.baseurl }}/assets/images/spring-boot-admin/threads.png)

![]({{ site.baseurl }}/assets/images/spring-boot-admin/trace.png)


---
END