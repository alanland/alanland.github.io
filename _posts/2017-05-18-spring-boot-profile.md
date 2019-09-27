---
layout: post
title:  "Spring Boot Profile"
date:   2017-05-18 21:27:37 +0000
tags:   [spring, spring-boot, profile, yml]
author: Alan Wang
ref:
 - https://docs.spring.io/spring-boot/docs/current/reference/html/howto-properties-and-configuration.html
---
`yaml`文件是根据`---`行来分割的一个一个的文档，每个文档都会被解析成一个平铺的Map。

如果一个`yaml`配置包含`spring.profiles`，那么profile值（用逗号分隔）会被装进`Environment.acceptsProfiles()`
并最终合并起来。

比如下面的配置：

```yaml
server:
    port: 9000
---

spring:
    profiles: development
server:
    port: 9001

---

spring:
    profiles: production
server:
    port: 0

```

会有两个profile，每个profile的配置还可以有单独的一个文件来配置，文件名称为`application-${profile}.yaml`。

最终每个profile的配置会被合并起来，`active`的profile配置内容会生效。

---
END
