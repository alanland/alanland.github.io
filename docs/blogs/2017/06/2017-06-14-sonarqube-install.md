---
title:  "SonarQube Install"
date:   2017-06-11 10:57:37 +0000
tags:   [bigdata, spark]
---
主页
https://www.sonarqube.org/

```properties
sonar.jdbc.username=sonarqube
sonar.jdbc.password=mypassword
sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube

sonar.web.host=192.0.0.1
sonar.web.port=80
sonar.web.context=/sonar
```

启动：
```shell
$ sonar.sh console
```

Gradle配置：

```groovy
buildscript {
    repositories {
        maven { url "https://plugins.gradle.org/m2/" }
    }
    dependencies {
        classpath "org.sonarsource.scanner.gradle:sonarqube-gradle-plugin:2.5"
    }
}

apply plugin: "org.sonarqube"
```

---
END
