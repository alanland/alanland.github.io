---
layout: post
title:  "Spark DataFrame and DataSet API"
date:   2017-08-05 13:57:37 +0000
tags:   [spark]
author: Alan Wang
---
## SparkSession
```scala
import org.apache.spark.sql.SparkSession

val spark = SparkSession
  .builder()
  .appName("Spark SQL basic example")
  .config("spark.some.config.option", "some-value")
  .getOrCreate()

// For implicit conversions like converting RDDs to DataFrames
import spark.implicits._
```


---
Links:
1. [Spark SQL, DataFrames and Datasets Guide](http://spark.apache.org/docs/latest/sql-programming-guide.html)


---
END
