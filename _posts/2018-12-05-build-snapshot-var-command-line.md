---
layout: post
title:  "通过命令行参数执行不同版本的Gradle构建"
date:   2018-12-05 11:23:37 +0000
tags:   [gradle]
author: Alan Wang
---

## `build.gradle`

```groovy
group = 'com.xxx'
version = "${projectVersion}-" + new Date().format('yyyyMMddHHmmss')

if ("$nightlyBuild" == 'true') {
    version="${projectVersion}-SNAPSHOT"
}
```

## command 

release build:
```sh
 gradle clean build upload
```

snapshot build:
```sh
 gradle  -PnightlyBuild=true clean build upload
 ```