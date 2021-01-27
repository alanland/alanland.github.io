---
title:  "Scala Implicit - 1"
date:   2017-04-17 21:30:19
img:  docker-jekyll.jpg
description: Scala Implicit
categories: [Scala]
tags:   [container, docker, swarm, kubernetes, mesos]
---
`implicit`用法：

## Implicit Parameters
```scala
implicit val n: Int = 5
def add(x: Int)(implicit y: Int) = x + y
add(5) // takes n from the current scope, res: Int =
assert(add(5) == n + 5)
```
```scala
def foo[T](t: T)(implicit integral: Integral[T]): Unit = {
    println(integral)
}
```

## Implicit Conversion

如果一个的对象调用一个该对象没有的方法，那么scala就会在上下文中查找隐式转换，
转换成能够支持该方法的类的对象。

```scala
"abc".map(_.toInt)
```

`String`没有`map`方法，但是`StringOps`有。在`scala.Predef`中有定义：
`implicit def augmentString`。

## Implicit conversions as implicit parameters

当既是隐式转换又是隐士参数的时候：

```scala
def getIndex[T, CC](seq: CC, value: T)(implicit conv: CC => Seq[T]) = seq.indexOf(value)

getIndex("abc", 'a')
```

`getIndex` 方法接受任何类型参数，只要有隐式转换能将其u转换成`Seq[T]`，
所以`String`可以传递给`getIndex`并正确运行。

其实编译器是把`seq.IndexOf(value)` 转换成 `conv(seq).indexOf(value)`。

## Context Bounds
隐式参数另外一个常用的场景是`type class pattern`。

未完。。。

参考： 
- http://docs.scala-lang.org/tutorials/FAQ/finding-implicits.html
- http://stackoverflow.com/questions/5512397/passing-scala-math-integral-as-implicit-parameter
