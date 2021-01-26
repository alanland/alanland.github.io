---
layout: post
title:  "Scala: JavaConverters"
date:   2017-07-06 10:57:37 +0000
tags:   [scala]
author: Alan Wang
---
## `scala.collection.JavaConverters`

## The following conversions are supported via `asScala` and `asJava`:
```scala
scala.collection.Iterable       <=> java.lang.Iterable
scala.collection.Iterator       <=> java.util.Iterator
scala.collection.mutable.Buffer <=> java.util.List
scala.collection.mutable.Set    <=> java.util.Set
scala.collection.mutable.Map    <=> java.util.Map
scala.collection.concurrent.Map <=> java.util.concurrent.ConcurrentMap
```

## The following conversions are supported via `asScala` and through specially-named extension methods to convert to Java collections, as shown:
```scala
scala.collection.Iterable    <=> java.util.Collection   (via asJavaCollection)
scala.collection.Iterator    <=> java.util.Enumeration  (via asJavaEnumeration)
scala.collection.mutable.Map <=> java.util.Dictionary   (via asJavaDictionary)
```

## In addition, the following one-way conversions are provided via `asJava`:

scala.collection.Seq         => java.util.List
scala.collection.mutable.Seq => java.util.List
scala.collection.Set         => java.util.Set
scala.collection.Map         => java.util.Map

## The following one way conversion is provided via `asScala`:
```scala
java.util.Properties => scala.collection.mutable.Map
```

In all cases, converting from a source type to a target type and back again will return the original source object. For example:
```scala
import scala.collection.JavaConverters._

val source = new scala.collection.mutable.ListBuffer[Int]
val target: java.util.List[Int] = source.asJava
val other: scala.collection.mutable.Buffer[Int] = target.asScala
assert(source eq other)
```

Alternatively, the conversion methods have descriptive names and can be invoked explicitly.
```scala
scala> val vs = java.util.Arrays.asList("hi", "bye")
vs: java.util.List[String] = [hi, bye]

scala> val ss = asScalaIterator(vs.iterator)
ss: Iterator[String] = non-empty iterator

scala> .toList
res0: List[String] = List(hi, bye)

scala> val ss = asScalaBuffer(vs)
ss: scala.collection.mutable.Buffer[String] = Buffer(hi, bye)
```




---
参考:

- http://www.scala-lang.org/api/current/scala/collection/JavaConverters%24.html




---
END
