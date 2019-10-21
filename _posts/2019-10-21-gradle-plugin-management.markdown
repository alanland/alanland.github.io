---
layout: post
title:  "Gradle Plugin Management"
date:   2019-10-21T15:52:50.200Z
tags:   [gradle]
categories: [Java]
author: Alan Wang
---

Gradle plugins 的私服设置：

`setting.gradle`

```groovy
pluginManagement {
    plugins {
    }
    resolutionStrategy {
    }
    repositories {
        maven { url "${nexusUrl}/${nexusPublicUri}" }
    }
}
```

`init.gradle`

```groovy
settingsEvaluated { settings ->
    settings.pluginManagement {
        plugins {
        }
        resolutionStrategy {
        }
        repositories {
            maven { url "${nexusUrl}/${nexusPublicUri}" }
        }
    }
}
```

---

参考：

- https://docs.gradle.org/current/userguide/plugins.html
