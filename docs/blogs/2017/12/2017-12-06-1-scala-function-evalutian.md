---
title:  "Scala: Evaluation of Function Applications"
date:   2017-12-06 23:23:37
tags:   [scala, fp]
---

有参数的函数，和表达式的计算方法类似：

1. 从左至右计算所有的函数参数
1. 从左手边替换函数程序
1. 同时，把形参替换成实参

### call-by-value
```
sumOfSquares(3, 2+2)
sumOfSquares(3, 4)
squares(3) + squares(4)
3*3 + square(4)
9 + square(4)
9 + 16
25
```

### call-by-name

```
sumOfSquares(3, 2+2)
square(3) + square(2+2)
3*3 + square(2+2)
9 + sqare(2+2)
9 + (2+2) * (2+2)
9 + 4*4
25
```

满足一下条件，则两种策略会计算出想通的值：

- reduced expression 由 pure function 组成
  - c++ 就有副作用
- both evaluation termitate
  - val loop: Int = loop 就没有terminate

### 各自的优势

Call-by-value 只会计算每个函数参数一次，

Call-by-name 相关的参数在没有使用的时候，参数根本不会被计算

## 思考

如下的函数定义

```scala
def test(x: Int, y: Int) = x * x
```

下面的程序，哪种策略更快(has the fewest reductino steps)

```
test(2,3) // same
test(3+4,6) // CBV
test(2. 3+4) // CBN
test(3+4, 2*4) // same

test(2,3)
2*2
4

test(3+4, 8)
CBV          CBN
test(7,8)   （3+4）* （3+4）
7*7          7 * （3*4）
49           7 * 7
             49
            
test(3, 2*4)
CBV          CBN
test(3,8)    3*3
3*3          9
9
```

## Call-by-name, Call-by-value and termination

- 如果 CBV e terminate, CBN 同样 e termiante
- 反过来不成立

```
def first(x: Int, y: Int) = x
```

```
CBN                CBV
first(1, loop)     first(1, loop)
1                  ...
```

Scala 通常使用 call-by-value, 但是如果函数参数使用 `=>` 开始，那么使用 call-by-name.

Example:

```scala
def constOne(x: Int, y: => Int) = 1
```

```
constOne(1+2, loop)      constOne(loop, 1+2)
constOne(3, loop)        ....
1
```

## Condional Expression

def abs(x: Int) = if(x>=0) x else -x 

## Value Definitions and Termination

```
def loop: Boolean = loop
def x = loop // is ok
val x = loop // will lead to an infinite loop.
```


- and(x, y) == x && y

```scala
def and(x:Boolean, y: => Boolean) = if(x) y else false
def and(x:Boolean, y: => Boolean) = if(!x) false else y
```

- or(x, y) == x || y

```scala
def or(x: Boolean, y: => Boolean) = if(x) true else y
def or(x: Boolean, y: => Boolean) = if(!x) y else true
```



## Value Definitions

The `def` form is **by-name**, 右手边只有在使用的时候才进行计算

`val` form is **by-value**， 右手边部分在定义的时候就进行计算

def loop: Boolean = loop 
val loop: Boolean = loop
