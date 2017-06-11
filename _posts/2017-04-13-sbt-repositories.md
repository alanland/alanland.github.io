---
layout: post
title:  "Sbt Repositories"
date:   2017-04-13 23:10:46 +0000
img:  docker-jekyll.jpg
description: Docker 2017
categories: docker
tags:   [container, docker, swarm, kubernetes, mesos]
author: Alan Wang
---
为Sbt更改仓库配置：

配置文件： `～/.sbt/repositories`，如果没有则创建一个，内容如下：

```
[repositories]
local
osc: http://maven.oschina.net/content/groups/public/
typesafe: http://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
sonatype-oss-releases
maven-central
sonatype-oss-snapshots
```

然而并不管用。

参考[http://www.ituring.com.cn/article/132055](http://www.ituring.com.cn/article/132055)

> 最后发现文档中的配置文件是在`sbt\0.13\bin\sbt-launch.jar`中的`\sbt\sbt.boot.properties`中，修改后内容如下：

文档地址： [http://www.scala-sbt.org/0.13/docs/Launcher-Configuration.html](http://www.scala-sbt.org/0.13/docs/Launcher-Configuration.html)

```properties
[scala]
  version: ${sbt.scala.version-auto}

[app]
  org: ${sbt.organization-org.scala-sbt}
  name: sbt
  version: ${sbt.version-read(sbt.version)[0.13.7]}
  class: ${sbt.main.class-sbt.xMain}
  components: xsbti,extra
  cross-versioned: ${sbt.cross.versioned-false}
  resources: ${sbt.extraClasspath-}

[repositories]
  local
  ttx: http://121.199.167.84:30001/nexus/content/groups/public/
  oschina: http://maven.oschina.net/content/groups/public/
  typesafe-ivy-releases: https://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
  maven-central
  sbt-plugins-repo: http://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext]
  play: http://private-repo.typesafe.com/typesafe/maven-releases/
  sonatype-snapshots: https://oss.sonatype.org/content/repositories/snapshots

[boot]
  directory: ${sbt.boot.directory-${sbt.global.base-${user.home}/.sbt}/boot/}

[ivy]
  ivy-home: H:\repository\jar
  checksums: ${sbt.checksums-sha1,md5}
  override-build-repos: ${sbt.override.build.repos-false}
  repository-config: ${sbt.repository.config-${sbt.global.base-${user.home}/.sbt}/repositories}
```

仍然会从 maven central 下载。


增加参数 `-Dsbt.override.build.repos=true` 仍然无效果。


配置文件：

[http://www.scala-sbt.org/0.13/docs/Launcher-Configuration.html](http://www.scala-sbt.org/0.13/docs/Launcher-Configuration.html)

这个时间我已经把包下载好了，等以后在研究。

---
END