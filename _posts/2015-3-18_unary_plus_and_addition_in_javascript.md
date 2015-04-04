---
layout: post
title: JavaScript中的加号[+]
---

昨天看到一个问题， `var a=+new Data`是什么意思．

看了提问者的[Blog](http://www.cnblogs.com/Raoh/p/4212075.html)，明白了点儿东西，又产生了新的疑惑．

```javascript
function Person() {
}
Person.prototype = {
    valueOf: function () {
        return "valueOf";
    },
    toString: function () {
        return "toString";
    }
};
var foo = new Person();
console.log("a\t" + foo);

// Date tests
var date = new Date();
console.log(123 + date);
console.log(123 + +date);// or 123 + + data
console.log('a\t' + date);
console.log('a\t' + +date);
```

上面的程序输出是：
```
a	valueOf
123Wed Mar 18 2015 16:15:24 GMT+0800 (CST)
1426666524753
a	Wed Mar 18 2015 16:15:24 GMT+0800 (CST)
a	1426666524630
```

从上面的测试程序可以看出，对于自定义的`Person`类型，确实使用了`valueOf`方法．但是对于`Data`类型的对象，却不尽然．
```javascript
number + date // >> number + date.valueOf()
string + date // >> string + date.toString()
string + customerObject // >> string + customerObject.valueOf() !! not toString
```

上面的结果让我很惊异，至今也没有找到合理的参考来解释`自定义对象和Date对象表现不一致`的原因．只能感叹`JavaScript是一门神奇的语言`．

两把刚才查阅的一些资料贴在下面：（[来源MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)）

### 关于Addition
```javascript
Addition (+)

The addition operator produces the sum of numeric operands or string concatenation.

Syntax

Operator: x + y

Examples

// Number + Number -> addition
1 + 2 // 3

// Boolean + Number -> addition
true + 1 // 2

// Boolean + Boolean -> addition
false + false // 0

// Number + String -> concatenation
5 + "foo" // "5foo"

// String + Boolean -> concatenation
"foo" + false // "foofalse"

// String + String -> concatenation
"foo" + "bar" // "foobar"
```

### 关于Unary plus
```javascript
Unary plus (+)

The unary plus operator precedes its operand and evaluates to its operand but attempts to converts it into a number, if it isn't already. Although unary negation (-) also can convert non-numbers, unary plus is the fastest and preferred way of converting something into a number, because it does not perform any other operations on the number. It can convert string representations of integers and floats, as well as the non-string values true, false, and null. Integers in both decimal and hexadecimal ("0x"-prefixed) formats are supported. Negative numbers are supported (though not for hex). If it cannot parse a particular value, it will evaluate to NaN.

Syntax

Operator: +x

Examples

+3     // 3
+"3"   // 3
+true  // 1
+false // 0
+null  // 0
```

### 关于Object.valueOf [来源MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
```javascript
Summary

The valueOf() method returns the primitive value of the specified object.
Syntax

object.valueOf()

Description

JavaScript calls the valueOf method to convert an object to a primitive value. You rarely need to invoke the valueOf method yourself; JavaScript automatically invokes it when encountering an object where a primitive value is expected.

By default, the valueOf method is inherited by every object descended from Object. Every built-in core object overrides this method to return an appropriate value. If an object has no primitive value, valueOf returns the object itself, which is displayed as:

[object Object]

You can use valueOf within your own code to convert a built-in object into a primitive value. When you create a custom object, you can override Object.prototype.valueOf() to call a custom method instead of the default Object method.
Overriding valueOf for custom objects

You can create a function to be called in place of the default valueOf method. Your function must take no arguments.

Suppose you have an object type myNumberType and you want to create a valueOf method for it. The following code assigns a user-defined function to the object's valueOf method:

myNumberType.prototype.valueOf = function() { return customPrimitiveValue; };

With the preceding code in place, any time an object of type myNumberType is used in a context where it is to be represented as a primitive value, JavaScript automatically calls the function defined in the preceding code.

An object's valueOf method is usually invoked by JavaScript, but you can invoke it yourself as follows:

myNumber.valueOf()

Note: Objects in string contexts convert via the toString() method, which is different from String objects converting to string primitives using valueOf. All objects have a string conversion, if only "[object type]". But many objects do not convert to number, boolean, or function.
Examples
Example: Using valueOf

o = new Object();
myVar = o.valueOf();      // [object Object]
```
