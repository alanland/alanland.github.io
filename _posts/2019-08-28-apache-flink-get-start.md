---
layout: post
title:  "Apache Flink 初探1"
date:   2019-08-29 12:13:37 +0000
tags:   [flink, scala]
author: Alan Wang
---

## 安装

可以从网上更新最新的安装包，现在是 [1.9.0]()，执行：

```sh 
sh bin/start-cluster.sh
```

访问 http://localhost:8081 即可以看到管理界面。

和 spark 类似，可以用 flink 命令提交写好的程序，那么在控制台上就可以看到运行结果了。

## 程序编写

我们还是采用本地编写运行程序的方式来开始，首先使用 gradle 创建项目：

### gradle.properties
```properties
flinkVersion=1.9.0
scalaVersion=2.12.9
```

### build.gradle

```gradle
buildscript {
    repositories {
        mavenLocal()
        maven { url "${nexusUrl}/${nexusPublicUri}" }
    }
}

plugins {
    id "java"
    id "scala"
}

group "com.github.alanland"
version "1.0-SNAPSHOT"

sourceCompatibility = 1.8

repositories {
    mavenLocal()
    maven { url "${nexusUrl}/${nexusPublicUri}" }
}

dependencies {
    implementation "org.apache.flink:flink-clients_2.12:${flinkVersion}",
        "org.scala-lang:scala-library:${scalaVersion}"

    compile "org.apache.flink:flink-streaming-java_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-streaming-scala_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-connector-twitter_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-connector-kafka_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-shaded-jackson:2.9.8-7.0"
    compile "org.apache.flink:flink-statebackend-rocksdb_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-core:${flinkVersion}"
    compile "org.apache.flink:force-shading:${flinkVersion}"

    compile "org.apache.flink:flink-table-api-java-bridge_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-table-api-scala-bridge_2.12:${flinkVersion}"
    compile "org.apache.flink:flink-table-planner_2.12:${flinkVersion}"

    compile "org.slf4j:slf4j-log4j12:1.7.15"
    compile "log4j:log4j:1.2.17"
    compile "org.slf4j:slf4j-api:1.7.15"
    compile "com.google.code.findbugs:jsr305:1.3.9"
}

tasks.withType(JavaCompile) {
    options.encoding = "UTF-8"
}
```

## DataStream / DataSet / DataTable

- DataStream 流处理
- DataSet 批处理，来自文件、Java集合等数据


## DataStream WordCount

```scala

import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.api.windowing.time.Time

object SocketWindowWordCount {

  def main(args: Array[String]): Unit = {

    var hostname: String = "localhost"
    var port: Int = 12345

    val env: StreamExecutionEnvironment = StreamExecutionEnvironment.getExecutionEnvironment
    val text: DataStream[String] = env.socketTextStream(hostname, port, '\n')
    val windowCounts = text
      .flatMap { w => w.split("\\s") }
      .map { w => WordWithCount(w, 1) }
      .keyBy("word")
      .timeWindow(Time.seconds(5))
      .sum("count")

    // print the results with a single thread, rather than in parallel
    windowCounts.print().setParallelism(1)

    env.execute("Socket Window WordCount")
  }

  case class WordWithCount(word: String, count: Long)

}
```

控制台执行：

```sh
nc -l 12345
```

通过 Socket 输入数据。

程序里面我们设置了通过回车读取数据，用空格分割单词，时间窗口是5秒，同一个时间窗口内的多行（回车）会一起统计。

本地运行 main 程序，程序就会从socket读取数据进行统计。


## DataSet WordCount

```scala

import org.apache.flink.api.scala.{DataSet, ExecutionEnvironment}
import org.apache.flink.streaming.api.scala._

object WordCountFile extends App {
  val file = "TPCHQuery3Table.scala"

  val env = ExecutionEnvironment.createLocalEnvironment(1)
  val text: DataSet[String] = env.readTextFile(file)

  val counts = text
    .flatMap(_.toLowerCase.split("\\W+"))
    .filter(_.nonEmpty)
    .map((_, 1))
    .groupBy(0)
    .sum(1)

  counts.writeAsText("count.txt")
  env.execute("File word count")
}
````

注意 env 创建的时候， `createLocalEnvironment` 的参数不填的话默认是当前 JVM 可用的 processors 数目。

输入如下：
```
(0,8)
(03,1)
(0f,1)
(1,4)
(10,1)
(12,1)
(16,2)
...
(additional,1)
(agreed,1)
(agreements,1)
(an,1)
(and,5)
(any,1)
(apache,6)
(api,4)
(applicable,1)
(are,1)
...
```

如果想用程序连接远程 Server，可以创建一个远程的环境：

```scala
  val env = ExecutionEnvironment.createRemoteEnvironment("flink-master", 8081);
```

提交作业之后，执行失败，看服务端报错：
```
org.apache.flink.runtime.jobmanager.scheduler.NoResourceAvailableException: 
No pooled slot available and request to ResourceManager for new slot failed
```

调整 conf/flink-conf.yaml 的配置：

```yaml
taskmanager.numberOfTaskSlots: 10
```

参数调优可参考[Aliyun的文档](https://help.aliyun.com/document_detail/62491.html?spm=a2c4g.11186623.2.14.1c39f7e4AYCpSr)

之后提交任务，任务一直处于 RUNNING 状态，


