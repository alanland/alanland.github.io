---
layout: post
title:  "Jackson Java Time"
date:   2018-05-21 13:23:37 +0000
tags:   [java, jackson]
author: Alan Wang
---

Jackson为Java 8 Time Api专门推出了一个Modlue，`jackson-modules-java8`，不再使用之前的`jsr310module`.

使用 Module 的示例：

```java
val JSON: ObjectMapper = new ObjectMapper()
    .registerModule(new ParameterNamesModule())
    .registerModule(new Jdk8Module())
    .registerModule(new JavaTimeModule()).setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"))
    .registerModule(new DefaultScalaModule())
```

---
- https://github.com/FasterXML/jackson-modules-java8
- https://stackoverflow.com/questions/27952472/serialize-deserialize-java-8-java-time-with-jackson-json-mapper
- [FasterXML/jackson-module-scala的坑](https://www.jianshu.com/p/b278baa16a88)
