---
title:  "Spark Tutorial 1"
date:   2017-12-01 22:23:37
tags:   [scala, spark]
---

这里我使用熟悉的groovy来构建项目。

## `build.gradle`

```groovy
group "com.ittx"
version "1.0-SNAPSHOT"

apply plugin: "groovy"
apply plugin: "java"
apply plugin: "scala"
apply plugin: "idea"

sourceCompatibility = 1.8

repositories {
    mavenLocal()
    maven { url "${nexusUrl}/content/groups/public/" }
}

dependencies {
    compile "org.codehaus.groovy:groovy-all:2.4.13",
            "org.apache.spark:spark-core_${scalaVersion}:${sparkVersion}",
            "org.apache.spark:spark-sql_${scalaVersion}:${sparkVersion}"
//            "org.apache.spark:spark-mllib_${scalaVersion}:${sparkVersion}",
//            "org.apache.spark:spark-streaming_${scalaVersion}:${sparkVersion}",
//            "org.apache.spark:spark-hive_${scalaVersion}:${sparkVersion}",
//            "org.apache.spark:spark-graphx_${scalaVersion}:${sparkVersion}",
//            "org.apache.hadoop:hadoop-client:2.7.3"
    testCompile "junit:junit:4.12"
}
```

## `gradle.properties`

```properties
sparkVersion=2.2.0
scalaVersion=2.11
scalaFullVersion=2.11.8
```

## `src/main/scala/SimpleApp.scala`

```scala
import org.apache.spark.sql.SparkSession

object SimpleApp {
  def main(args: Array[String]) {
    val logFile = "YOUR_SPARK_HOME/README.md" // Should be some file on your system
    val spark = SparkSession.builder.appName("Simple Application").getOrCreate()
    val logData = spark.read.textFile(logFile).cache()
    val numAs = logData.filter(line => line.contains("a")).count()
    val numBs = logData.filter(line => line.contains("b")).count()
    println(s"Lines with a: $numAs, Lines with b: $numBs")
    spark.stop()
  }
}
```

- 这里使用了`main`方法，因为使用`scala.App`的子类会产生一些问题。
- `SparkSession`是SparkContext，HiveContext等的一个封装
- `getOrCreate`方法生成SparkSession实例
- 然而上面的方法需要提交到spark的集群上才能运行

我们现在手动创建一个`SparkContext`，

```scala
val conf = new SparkConf().setAppName(appName).setMaster(master)
new SparkContext(conf)
```

- appName 会显示在 cluster UI 上
- master 可以是  Spark, Mesos or YARN cluster URL
  - 本地运行时可以传 `local`, local[x] x表示启动的线程数
  - 实际运行时通过spark-submit，而不需要传递该参数

完整的单机版程序如下：

```scala
import org.apache.spark.{SparkConf, SparkContext}

object SimpleAppLocal {
  def main(args: Array[String]): Unit = {
    val master = "local[*]"
    val appName = "spark"
    val conf = new SparkConf().setAppName(appName).setMaster(master)
    val spark = new SparkContext(conf)

    val file = "SimpleAppLocal.scala"
    val logData = spark.textFile(file).cache()
    val numAs = logData.filter(line => line.contains("a")).count()
    val numBs = logData.filter(line => line.contains("b")).count()
    println(s"Lines with a: $numAs, Lines with b: $numBs")
    spark.stop()
  }
}
```

系统会输出：

```
Lines with a: 13, Lines with b: 3
```

日志完整展示了spark的运行过程：

```
Using Spark's default log4j profile: org/apache/spark/log4j-defaults.properties
17/12/02 23:44:52 INFO SparkContext: Running Spark version 2.2.0
17/12/02 23:44:53 WARN NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
17/12/02 23:44:58 INFO SparkContext: Submitted application: spark
17/12/02 23:44:58 INFO SecurityManager: Changing view acls to: alan
17/12/02 23:44:58 INFO SecurityManager: Changing modify acls to: alan
17/12/02 23:44:58 INFO SecurityManager: Changing view acls groups to: 
17/12/02 23:44:58 INFO SecurityManager: Changing modify acls groups to: 
17/12/02 23:44:58 INFO SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users  with view permissions: Set(alan); groups with view permissions: Set(); users  with modify permissions: Set(alan); groups with modify permissions: Set()
17/12/02 23:44:59 INFO Utils: Successfully started service 'sparkDriver' on port 53672.
17/12/02 23:44:59 INFO SparkEnv: Registering MapOutputTracker
17/12/02 23:44:59 INFO SparkEnv: Registering BlockManagerMaster
17/12/02 23:44:59 INFO BlockManagerMasterEndpoint: Using org.apache.spark.storage.DefaultTopologyMapper for getting topology information
17/12/02 23:44:59 INFO BlockManagerMasterEndpoint: BlockManagerMasterEndpoint up
17/12/02 23:44:59 INFO DiskBlockManager: Created local directory at /private/var/folders/w9/ktmgj7193rn9nqlwgmnl9slr0000gn/T/blockmgr-bc2a1866-0885-40af-91eb-6414c93f64ab
17/12/02 23:44:59 INFO MemoryStore: MemoryStore started with capacity 2.2 GB
17/12/02 23:44:59 INFO SparkEnv: Registering OutputCommitCoordinator
17/12/02 23:44:59 INFO Utils: Successfully started service 'SparkUI' on port 4040.
17/12/02 23:44:59 INFO SparkUI: Bound SparkUI to 0.0.0.0, and started at http://192.168.1.102:4040
17/12/02 23:44:59 INFO Executor: Starting executor ID driver on host localhost
17/12/02 23:44:59 INFO Utils: Successfully started service 'org.apache.spark.network.netty.NettyBlockTransferService' on port 53673.
17/12/02 23:44:59 INFO NettyBlockTransferService: Server created on 192.168.1.102:53673
17/12/02 23:44:59 INFO BlockManager: Using org.apache.spark.storage.RandomBlockReplicationPolicy for block replication policy
17/12/02 23:44:59 INFO BlockManagerMaster: Registering BlockManager BlockManagerId(driver, 192.168.1.102, 53673, None)
17/12/02 23:44:59 INFO BlockManagerMasterEndpoint: Registering block manager 192.168.1.102:53673 with 2.2 GB RAM, BlockManagerId(driver, 192.168.1.102, 53673, None)
17/12/02 23:44:59 INFO BlockManagerMaster: Registered BlockManager BlockManagerId(driver, 192.168.1.102, 53673, None)
17/12/02 23:44:59 INFO BlockManager: Initialized BlockManager: BlockManagerId(driver, 192.168.1.102, 53673, None)
17/12/02 23:45:00 INFO MemoryStore: Block broadcast_0 stored as values in memory (estimated size 107.1 KB, free 2.2 GB)
17/12/02 23:45:00 INFO MemoryStore: Block broadcast_0_piece0 stored as bytes in memory (estimated size 20.4 KB, free 2.2 GB)
17/12/02 23:45:00 INFO BlockManagerInfo: Added broadcast_0_piece0 in memory on 192.168.1.102:53673 (size: 20.4 KB, free: 2.2 GB)
17/12/02 23:45:00 INFO SparkContext: Created broadcast 0 from textFile at SimpleAppLocal.scala:11
17/12/02 23:45:00 WARN ClosureCleaner: Expected a closure; got SimpleAppLocal$$$Lambda$97/1902094533
17/12/02 23:45:00 INFO FileInputFormat: Total input paths to process : 1
17/12/02 23:45:00 INFO SparkContext: Starting job: count at SimpleAppLocal.scala:12
17/12/02 23:45:00 INFO DAGScheduler: Got job 0 (count at SimpleAppLocal.scala:12) with 2 output partitions
17/12/02 23:45:00 INFO DAGScheduler: Final stage: ResultStage 0 (count at SimpleAppLocal.scala:12)
17/12/02 23:45:00 INFO DAGScheduler: Parents of final stage: List()
17/12/02 23:45:00 INFO DAGScheduler: Missing parents: List()
17/12/02 23:45:00 INFO DAGScheduler: Submitting ResultStage 0 (MapPartitionsRDD[2] at filter at SimpleAppLocal.scala:12), which has no missing parents
17/12/02 23:45:00 INFO MemoryStore: Block broadcast_1 stored as values in memory (estimated size 3.8 KB, free 2.2 GB)
17/12/02 23:45:00 INFO MemoryStore: Block broadcast_1_piece0 stored as bytes in memory (estimated size 2.2 KB, free 2.2 GB)
17/12/02 23:45:00 INFO BlockManagerInfo: Added broadcast_1_piece0 in memory on 192.168.1.102:53673 (size: 2.2 KB, free: 2.2 GB)
17/12/02 23:45:00 INFO SparkContext: Created broadcast 1 from broadcast at DAGScheduler.scala:1006
17/12/02 23:45:00 INFO DAGScheduler: Submitting 2 missing tasks from ResultStage 0 (MapPartitionsRDD[2] at filter at SimpleAppLocal.scala:12) (first 15 tasks are for partitions Vector(0, 1))
17/12/02 23:45:00 INFO TaskSchedulerImpl: Adding task set 0.0 with 2 tasks
17/12/02 23:45:00 INFO TaskSetManager: Starting task 0.0 in stage 0.0 (TID 0, localhost, executor driver, partition 0, PROCESS_LOCAL, 4887 bytes)
17/12/02 23:45:01 INFO TaskSetManager: Starting task 1.0 in stage 0.0 (TID 1, localhost, executor driver, partition 1, PROCESS_LOCAL, 4887 bytes)
17/12/02 23:45:01 INFO Executor: Running task 0.0 in stage 0.0 (TID 0)
17/12/02 23:45:01 INFO Executor: Running task 1.0 in stage 0.0 (TID 1)
17/12/02 23:45:01 INFO HadoopRDD: Input split: file:/Users/alan/workspace/spark/src/main/scala/SimpleAppLocal.scala:0+313
17/12/02 23:45:01 INFO HadoopRDD: Input split: file:/Users/alan/workspace/spark/src/main/scala/SimpleAppLocal.scala:313+314
17/12/02 23:45:01 INFO MemoryStore: Block rdd_1_1 stored as values in memory (estimated size 712.0 B, free 2.2 GB)
17/12/02 23:45:01 INFO MemoryStore: Block rdd_1_0 stored as values in memory (estimated size 824.0 B, free 2.2 GB)
17/12/02 23:45:01 INFO BlockManagerInfo: Added rdd_1_1 in memory on 192.168.1.102:53673 (size: 712.0 B, free: 2.2 GB)
17/12/02 23:45:01 INFO BlockManagerInfo: Added rdd_1_0 in memory on 192.168.1.102:53673 (size: 824.0 B, free: 2.2 GB)
17/12/02 23:45:01 INFO Executor: Finished task 1.0 in stage 0.0 (TID 1). 1572 bytes result sent to driver
17/12/02 23:45:01 INFO Executor: Finished task 0.0 in stage 0.0 (TID 0). 1572 bytes result sent to driver
17/12/02 23:45:01 INFO TaskSetManager: Finished task 0.0 in stage 0.0 (TID 0) in 234 ms on localhost (executor driver) (1/2)
17/12/02 23:45:01 INFO TaskSetManager: Finished task 1.0 in stage 0.0 (TID 1) in 215 ms on localhost (executor driver) (2/2)
17/12/02 23:45:01 INFO TaskSchedulerImpl: Removed TaskSet 0.0, whose tasks have all completed, from pool 
17/12/02 23:45:01 INFO DAGScheduler: ResultStage 0 (count at SimpleAppLocal.scala:12) finished in 0.265 s
17/12/02 23:45:01 INFO DAGScheduler: Job 0 finished: count at SimpleAppLocal.scala:12, took 0.429026 s
17/12/02 23:45:01 WARN ClosureCleaner: Expected a closure; got SimpleAppLocal$$$Lambda$105/1843397873
17/12/02 23:45:01 INFO SparkContext: Starting job: count at SimpleAppLocal.scala:13
17/12/02 23:45:01 INFO DAGScheduler: Got job 1 (count at SimpleAppLocal.scala:13) with 2 output partitions
17/12/02 23:45:01 INFO DAGScheduler: Final stage: ResultStage 1 (count at SimpleAppLocal.scala:13)
17/12/02 23:45:01 INFO DAGScheduler: Parents of final stage: List()
17/12/02 23:45:01 INFO DAGScheduler: Missing parents: List()
17/12/02 23:45:01 INFO DAGScheduler: Submitting ResultStage 1 (MapPartitionsRDD[3] at filter at SimpleAppLocal.scala:13), which has no missing parents
17/12/02 23:45:01 INFO MemoryStore: Block broadcast_2 stored as values in memory (estimated size 3.8 KB, free 2.2 GB)
17/12/02 23:45:01 INFO MemoryStore: Block broadcast_2_piece0 stored as bytes in memory (estimated size 2.2 KB, free 2.2 GB)
17/12/02 23:45:01 INFO BlockManagerInfo: Added broadcast_2_piece0 in memory on 192.168.1.102:53673 (size: 2.2 KB, free: 2.2 GB)
17/12/02 23:45:01 INFO SparkContext: Created broadcast 2 from broadcast at DAGScheduler.scala:1006
17/12/02 23:45:01 INFO DAGScheduler: Submitting 2 missing tasks from ResultStage 1 (MapPartitionsRDD[3] at filter at SimpleAppLocal.scala:13) (first 15 tasks are for partitions Vector(0, 1))
17/12/02 23:45:01 INFO TaskSchedulerImpl: Adding task set 1.0 with 2 tasks
17/12/02 23:45:01 INFO TaskSetManager: Starting task 0.0 in stage 1.0 (TID 2, localhost, executor driver, partition 0, PROCESS_LOCAL, 4887 bytes)
17/12/02 23:45:01 INFO TaskSetManager: Starting task 1.0 in stage 1.0 (TID 3, localhost, executor driver, partition 1, PROCESS_LOCAL, 4887 bytes)
17/12/02 23:45:01 INFO Executor: Running task 0.0 in stage 1.0 (TID 2)
17/12/02 23:45:01 INFO Executor: Running task 1.0 in stage 1.0 (TID 3)
17/12/02 23:45:01 INFO BlockManager: Found block rdd_1_0 locally
17/12/02 23:45:01 INFO BlockManager: Found block rdd_1_1 locally
17/12/02 23:45:01 INFO Executor: Finished task 1.0 in stage 1.0 (TID 3). 832 bytes result sent to driver
17/12/02 23:45:01 INFO Executor: Finished task 0.0 in stage 1.0 (TID 2). 832 bytes result sent to driver
17/12/02 23:45:01 INFO TaskSetManager: Finished task 1.0 in stage 1.0 (TID 3) in 15 ms on localhost (executor driver) (1/2)
17/12/02 23:45:01 INFO TaskSetManager: Finished task 0.0 in stage 1.0 (TID 2) in 18 ms on localhost (executor driver) (2/2)
17/12/02 23:45:01 INFO TaskSchedulerImpl: Removed TaskSet 1.0, whose tasks have all completed, from pool 
17/12/02 23:45:01 INFO DAGScheduler: ResultStage 1 (count at SimpleAppLocal.scala:13) finished in 0.019 s
17/12/02 23:45:01 INFO DAGScheduler: Job 1 finished: count at SimpleAppLocal.scala:13, took 0.041909 s
Lines with a: 13, Lines with b: 3
17/12/02 23:45:01 INFO SparkUI: Stopped Spark web UI at http://192.168.1.102:4040
17/12/02 23:45:01 INFO MapOutputTrackerMasterEndpoint: MapOutputTrackerMasterEndpoint stopped!
17/12/02 23:45:01 INFO MemoryStore: MemoryStore cleared
17/12/02 23:45:01 INFO BlockManager: BlockManager stopped
17/12/02 23:45:01 INFO BlockManagerMaster: BlockManagerMaster stopped
17/12/02 23:45:01 INFO OutputCommitCoordinator$OutputCommitCoordinatorEndpoint: OutputCommitCoordinator stopped!
17/12/02 23:45:01 INFO SparkContext: Successfully stopped SparkContext
17/12/02 23:45:01 INFO ShutdownHookManager: Shutdown hook called
17/12/02 23:45:01 INFO ShutdownHookManager: Deleting directory /private/var/folders/w9/ktmgj7193rn9nqlwgmnl9slr0000gn/T/spark-634f225f-d4f7-4e1e-83e1-211979ac52c1

Process finished with exit code 0

```






- [Spark Programming Guide](http://spark.apache.org/docs/latest/rdd-programming-guide.html)
- 
