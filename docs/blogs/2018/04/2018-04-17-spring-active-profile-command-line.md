---
layout: post
title:  "Spring Active Profile by Command Line"
date:   2018-04-17 20:23:37 +0000
tags:   [spring]
author: Alan Wang
---

## Option 1: Java System Properties (VM Arguments)

**It's important that the -D parameters are before your application.jar otherwise they are not recognized.**

```sh
java -jar -Dspring.profiles.active=prod application.jar
```

## Option 2: Program arguments

```sh
java -jar application.jar --spring.profiles.active=prod --spring.config.location=c:\config
```

---
Links:
- [Setting active profile and config location from command line in spring boot](https://stackoverflow.com/questions/31038250/setting-active-profile-and-config-location-from-command-line-in-spring-boot)
- [Profiles](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html)