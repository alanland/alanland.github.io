---
title:  "Spark Start"
date:   2017-06-11 10:57:37 +0000
tags:   [bigdata, spark]
---
去[官网](http://spark.apache.org/downloads.html)下载Spark，比如`2.1.0,hadoop 2.7`，
现在我用本机运行测试程序，直接使用java依赖。

我计较熟悉gradle，使用gradle来构建项目。

```gradle
apply plugin: 'java'
apply plugin: 'scala'
apply plugin: 'idea'

bootRepackage.enabled = false

repositories {
    maven { url "${nexusUrl}/content/groups/public/" }
}

configurations.all {
    resolutionStrategy.cacheChangingModulesFor 0, 'seconds'
}

dependencies {
    compile fileTree(dir: 'libs')
    compile "org.scala-lang:scala-library:${SCALA_FULL_VERSION}" // 2.11.8 / 2.10.6
    compile "org.scala-lang:scala-compiler:${SCALA_FULL_VERSION}"
    compile "org.apache.spark:spark-core_${SCALA_VERSION}:${SPARK_VERSION}"
    compile "org.apache.spark:spark-sql_${SCALA_VERSION}:${SPARK_VERSION}",
            "org.codehaus.janino:commons-compiler:2.7.8"
    compile "org.apache.spark:spark-streaming_${SCALA_VERSION}:${SPARK_VERSION}"
    compile "org.apache.spark:spark-mllib_${SCALA_VERSION}:${SPARK_VERSION}"
}

[compileJava, compileTestJava]*.options*.encoding = 'UTF-8'

idea {
    module {
        downloadSources = true
    }
}
```

运行测试程序：
```scala

import org.apache.spark.sql.SparkSession

object StartingSparkSession extends App {

  // spark session
  val spark = SparkSession
    .builder()
    .master("local[*]")
    .appName("Spark Sql basic example")
    .config("spark.some.config.option", "some-value")
    .getOrCreate()

  val path = "labs-spark/src/main/resources/people.json"

  // For implicit conversions like converting RDDs to DataFrames
  import spark.implicits._

  // creating data frames
  val df = spark.read.json(path)
  df.show()

  df.printSchema()
  df.select("name").show()

  // Select everybody, but increment the age by 1
  df.select($"name", $"age" + 1).show()

  // Select people older than 21
  df.filter($"age" > 21).show()

  // Count people by age
  df.groupBy("age").count().show()

  /**
    * Running SQL Queries Programmatically
    */
  // Register the DataFrame as a SQL temporary view
  df.createOrReplaceTempView("people")
  val sqlDf = spark.sql("select * from people")
  sqlDf.show()

  /**
    * Global Temporary View
    */
  // Register the DataFrame as a global temporary view
  df.createGlobalTempView("people")

  // Global temporary view is tied to a system preserved database `global_temp`
  spark.sql("select * from global_temp.people").show()

  // Global temporary view is cross-session
  spark.newSession().sql("select * from global_temp.people").show()

}
```

---
END
