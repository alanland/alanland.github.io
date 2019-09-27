---
layout: post
title:  "Scala List"
date:   2017-04-28 19:07:37 +0000
tags:   [scala]
author: Alan Wang
---
Scala list 常用操作：

`scala.collection.immutable.List`

## Create a List
### Create a Scala List in the Lisp style
```scala
val list = 1 :: 2 :: 3 :: Nil
// x: List[Int] = List(1, 2, 3)
```

### Create a Scala List in the Java style
```scala
val list = List(1,2,3)
// x: List[Int] = List(1, 2, 3)
val x = List[Number](1, 2.0, 33d, 0x1)
// x: List[java.lang.Number] = List(1, 2.0, 33.0, 1)
```

### Create a Scala List with the `range` method
```scala
val x = List.range(1, 10)
// x: List[Int] = List(1, 2, 3, 4, 5, 6, 7, 8, 9)
val x = List.range(0, 10, 2)
// x: List[Int] = List(0, 2, 4, 6, 8)
```

### Create a Scala List with the List class `fill` method
```scala
val x = List.fill(3)("foo")
// x: List[java.lang.String] = List(foo, foo, foo)
```

### Create a Scala List with the List class `tabulate` method
```scala
val x = List.tabulate(5)(n => n * n)
// x: List[Int] = List(0, 1, 4, 9, 16)
```

## Operations
- The scala.List class is a pointer to the scala.collection.immutable.List class
- The List class extends LinearSeq with Product (and some others).
- The trait LinearSeq extends Seq
- The trait Seq extends Iterable
- Iterable extends trait Traversable

### How to prepend items to a List
 very fast, constant-time, `O(1)` operation.
```scala
// create a List
val x = List(1,2,3)
// x: List[Int] = List(1, 2, 3)

// prepend an element to the list
val y = 0 :: x
// y: List[Int] = List(0, 1, 2, 3)
```

### Appending and merging Lists
```scala
val a = List(1,2,3)
// a: List[Int] = List(1, 2, 3)

val b = List(4,5,6)
// b: List[Int] = List(4, 5, 6)

val c = a ::: b
// c: List[Int] = List(1, 2, 3, 4, 5, 6)

List.concat(a, b)
// List(1, 2, 3, 4, 5, 6)
```

This operation is said to have O(n) speed, where n is the number of elements in the first List.


### Iterating lists with foreach
```scala
val x = List(1,2,3)
x.foreach { println }
// 1
// 2
// 3

var sum = 0
x.foreach(sum += _)
// sum == 6
```

### Scala Lists and the for expression
```scala
val names = List("Bob", "Fred", "Joe", "Julia", "Kim")

for (name <- names) println(name)

for (name <- names if name.startsWith("J")) {
  println(name)
}
```

### Filtering Scala lists
```scala
val x = List(1,2,3,4,5,6,7,8,9,10)

val evens = x.filter(a => a % 2 == 0)
// evens: List[Int] = List(2, 4, 6, 8, 10)

val y = x.takeWhile(a => a < 6)
// y: List[Int] = List(1, 2, 3, 4, 5)

var i = x.find(5<)
// i: 6

### Drop, DropWhile
```scala
x.drop(5)
// res0: List[Int] = List(6, 7, 8, 9, 10)

// dropWhire 遇到地一个不符合条件的就停下了
numbers.dropWhile(_ % 2 != 0)
// res0: List[Int] = List(2, 3, 4, 5, 6, 7, 8, 9, 10)

List(1, 2, 6, 4, 5,1) dropWhile (_ < 4)
// res1: List[Int] = List(6, 4, 5, 1)

```

### take, takeWhile
```scala

```

### map
```scala
List(1,2,3).map(_*2)
// List(2, 4, 6)

List("Fred", "Joe", "Bob").map(_.toLowerCase)
```

### Sorting Scala Lists
```scala
List(10, 2, 5).sort(_ < _)
// List(2, 5, 10)
```

- sortWith
- sorted

### forall, exists
```scala
List(1, 7, 3, 4, 5) forall (_ >= 4) // false
List(1, 7, 3, 4, 5) forall (_ >= 4) // true

List(1, 7, 3, 4, 5) exists (_ >= 4) // true
List(11, 7, 13, 4, 5) exists (_ >= 4) // true
```

### Partition and Span
Returns a pair of lists, one where the predicate is true,
the other where the predicate is false

```scala
val (a,b) = List(1,2,3,4,5).partition(_%2==0)
// (List(2,4), List(1,3,5))
```

```scala
List(1,9,2,4,5).span(_<3)
// (List(1),List(9, 2, 4, 5))，碰到不符合就结束

List(1,9,2,4,5).partition(_<3)
// (List(1, 2),List(9, 4, 5))，扫描所有
```

### SplitAt
```scala
List(1,3,5,7,9) splitAt 2
// (List(1, 3),List(5, 7, 9))
```

### GroupBy
```scala
List(1,3,5,7,9) groupBy (5<)
// Map((true,List(7, 9)), (false,List(1, 3, 5)))
```



### others
```
length  - returns the length of a List
head    - returns the first element of a List
last    - returns the last element of a List
init    - returns a List consisting of all elements except the last one
tail    - returns every elements of a List except the first element
isEmpty - returns a Boolean indicating if the List is empty

reverse - returns a reversed version of the List
flatten - takes a list of lists and flattens it out to a single list

mkString - converts a List to a String

iterator
toArray

foldLeft
reduceLeft

map
flatMap
foreach

forall
exists

Folding lists: /: and :\

sortWith
```







---
END