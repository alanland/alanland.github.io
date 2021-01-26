---
title:  "Scala: Underscore usage"
date:   2017-07-06 10:27:37 +0000
tags:   [scala]
---

##  `:_*` 
`:_*` 作为一个整体，告诉编译器你希望将某个参数当作参数序列处理

```scala
val s = sum(1 to 5:_*)
```

就是将1 to 5当作参数序列处理。


## Existential types
```scala
def foo(l: List[Option[_]]) = ...
```

## Higher kinded type parameters
```scala
case class A[K[_],T](a: K[T])
```

## Ignored variables
```scala
val _ = 5
```

## Ignored parameters
```scala
List(1, 2, 3) foreach { _ => println("Hi") }
```

## Ignored names of self types
```scala
trait MySeq { _: Seq[_] => }
```

## Wildcard patterns
```scala
Some(5) match { case Some(_) => println("Yes") }
```
## Wildcard imports

```scala
import java.util._
import xx.SomeUtil._ // impport static 
```
## Hiding imports

```scala
import java.util.{ArrayList => _, _}
```
## Joining letters to punctuation

```scala
def bang_!(x: Int) = 5
```
## Assignment operators

```scala
def foo_=(x: Int) { ... }
```
## Placeholder syntax

```scala
List(1, 2, 3) map (_ + 2)
```
## Partially applied functions

```scala
List(1, 2, 3) foreach println _
```
## Converting call-by-name parameters to functions

```scala
def toFunction(callByName: => Int): () => Int = callByName _
```

## 对变量进行默认初始化
```scala
var i:Int=_
```

## 用于将方法转换成函数
比如`val f=sqrt _`，以后直接调用`f(250)`就能求平方根了
```scala
class Test {
  def fun = {
    // some code
  }
  val funLike = fun _
}
```

## 访问tuple变量的某个元素时通过索引`_n`来取得第n个元素

---
参考:

- https://stackoverflow.com/questions/8000903/what-are-all-the-uses-of-an-underscore-in-scala
- https://www.zhihu.com/question/21622725/answer/21588672
- http://ananthakumaran.in/2010/03/29/scala-underscore-magic.html

---
END
