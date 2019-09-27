---
layout: post
title:  "通过命令行参数和环境变量配置 SpringBoot Config（yml）"
date:   2018-11-19 11:23:37 +0000
tags:   [spring,springboot]
author: Alan Wang
---

## 通过 Application Property Files
```
application.properties
application.yml
```

## 通过VM Options
```sh
java -Dserver.port=XXXX -jar <path/to/my/jar>
```

## 通过 SpringBoot参数 `Command Line Properties`
```sh
java -jar <path/to/my/jar> --server.port=YYYY
```

## 通过环境变量 SPRING_APPLICATION_JSON

```sh
SPRING_APPLICATION_JSON='{"acme":{"name":"test"}}' java -jar myapp.jar
ACME_NAME='test' java -jar myapp.jar
```
```sh
java -Dspring.application.json='{"name":"test"}' -jar myapp.jar
```
```sh
java -jar myapp.jar --spring.application.json='{"name":"test"}'
```

### 变量命名解释
- `acme.my-project.person.first-name`
    Kebab case, which is recommended for use in `.properties` and `.yml` files.

- `acme.myProject.person.firstName`
    Standard camel case syntax.

- `acme.my_project.person.first_name`
    Underscore notation, which is an alternative format for use in `.properties` and `.yml` files.

- `ACME_MYPROJECT_PERSON_FIRSTNAME`
    Upper case format, which is recommended when using system environment variables.

---
- https://stackoverflow.com/questions/21083170/how-to-configure-port-for-a-spring-boot-application
- https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html
