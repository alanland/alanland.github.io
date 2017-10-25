---
layout post
title  "Python动态获取修改属性"
date   2017-10-19 04:57:37 +0000
tags   [python]
author Alan Wang
---

## object

- `hasattr`,  `getattr`, `setattr`

    ```python
    if hasattr(obj, 'name'):
        setattr(obj, 'name', 'alan')
    ```

- `dir`

    ```python
    dir(obj)
    ```

返回包含obj大多数属性名的列表（会有一些特殊的属性不包含在内）。obj的默认值是当前的模块对象。

## module

- __doc__ 文档字符串。如果模块没有文档，这个值是None
- __name__ 始终是定义时的模块名；即使你使用import .. as 为它取了别名，或是赋值给了另一个变量名。
- __dict__ 包含了模块里可用的属性名-属性的字典；也就是可以使用模块名.属性名访问的对象。
- __file__ 包含了该模块的文件路径。需要注意的是内建的模块没有这个属性，访问它会抛出异常！


## class

- __doc__ 文档字符串。如果类没有文档，这个值是None。
- __name__ 始终是定义时的类名。
- __dict__ 包含了类里可用的属性名-属性的字典；也就是可以使用类名.属性名访问的对象。
- __module__ 包含该类的定义的模块名；需要注意，是字符串形式的模块名而不是模块对象。
- __bases__ 直接父类对象的元组；但不包含继承树更上层的其他类，比如父类的父类。

## instance

- __dict__ 包含了可用的属性名-属性对象字典。
- __class__ 该实例的类对象。对于类Cat，cat.__class__ == Cat 为 True。

## built-in functions and methods

根据定义，内建的(built-in)模块是指使用C写的模块，
可以通过sys模块的builtin_module_names字段查看都有哪些模块是内建的。
这些模块中的函数和方法可以使用的属性比较少，不过一般也不需要在代码中查看它们的信息。

- __doc__ 函数或方法的文档。
- __name__ 函数或方法定义时的名字。
- __self__ 仅方法可用，如果是绑定的(bound)，则指向调用该方法的类（如果是类方法）或实例（如果是实例方法），否则为None。
- *__module__ 函数或方法所在的模块名。

## function

这里特指非内建的函数。注意，在类中使用def定义的是方法，方法与函数虽然有相似的行为，但它们是不同的概念。

- __doc__ 函数的文档；另外也可以用属性名func_doc。
- __name__ 函数定义时的函数名；另外也可以用属性名func_name。
- *__module__ 包含该函数定义的模块名；同样注意，是模块名而不是模块对象。
- *__dict__ 函数的可用属性；另外也可以用属性名func_dict。  不要忘了函数也是对象，可以使用函数.属性名访问属性（赋值时如果属性不存在将新增一个），或使用内置函数has/get/setattr()访问。不过，在函数中保存属性的意义并不大。
- func_defaults 这个属性保存了函数的参数默认值元组；因为默认值总是靠后的参数才有，所以不使用字典的形式也是可以与参数对应上的。
- func_code 这个属性指向一个该函数对应的code对象，code对象中定义了其他的一些特殊属性，将在下文中另外介绍。
- func_globals 这个属性指向当前的全局命名空间而不是定义函数时的全局命名空间，用处不大，并且是只读的。
- *func_closure 这个属性仅当函数是一个闭包时有效，指向一个保存了所引用到的外部函数的变量cell的元组，这个属性也是只读的。（通过func_closure可以查看必报）

## method

方法虽然不是函数，但可以理解为在函数外面加了一层外壳；拿到方法里实际的函数以后，就可以使用2.5节的属性了。

- __doc__ 与函数相同。
- __name__ 与函数相同。
- *__module__ 与函数相同。
- im_func 使用这个属性可以拿到方法里实际的函数对象的引用。另外如果是2.6以上的版本，还可以使用属性名__func__。
- im_self 如果是绑定的(bound)，则指向调用该方法的类（如果是类方法）或实例（如果是实例方法），否则为None。如果是2.6以上的版本，还可以使用属性名__self__。
- im_class 实际调用该方法的类，或实际调用该方法的实例的类。注意不是方法的定义所在的类，如果有继承关系的话。

这里讨论的是一般的实例方法，另外还有两种特殊的方法分别是类方法(classmethod)和静态方法(staticmethod)。
类方法还是方法，不过因为需要使用类名调用，所以他始终是绑定的；
而静态方法可以看成是在类的命名空间里的函数（需要使用类名调用的函数），
它只能使用函数的属性，不能使用方法的属性。

## generator


生成器是调用一个生成器函数(generator function)返回的对象，多用于集合对象的迭代。

- __iter__ 仅仅是一个可迭代的标记。
- gi_code 生成器对应的code对象。
- gi_frame 生成器对应的frame对象。
- gi_running 生成器函数是否在执行。生成器函数在yield以后、执行yield的下一行代码前处于frozen状态，此时这个属性的值为0。
- next|close|send|throw 这是几个可调用的方法，并不包含元数据信息，如何使用可以查看生成器的相关文档。


## inspect module

inspect模块提供了一系列函数用于帮助使用自省。下面仅列出较常用的一些函数，
想获得全部的函数资料可以查看inspect模块的文档。

### 检查对象类型

- is{module|class|function|method|builtin}(obj)
    检查对象是否为模块、类、函数、方法、内建函数或方法。
- isroutine(obj)
    用于检查对象是否为函数、方法、内建函数或方法等等可调用类型。
    用这个方法会比多个is*()更方便，不过它的实现仍然是用了多个is*()。

```python
#coding:utf-8
import inspect

print inspect.ismodule(inspect) #True
print inspect.isfunction(inspect.isfunction) #True
print inspect.isbuiltin(sorted) #True
print inspect.isroutine(sorted) #True
```

### 获取对象信息

- getmembers(object[, predicate])
    这个方法是dir()的扩展版，它会将dir()找到的名字对应的属性一并返回，形如[(name, value), ...]。另外，predicate是一个方法的引用，如果指定，则应当接受value作为参数并返回一个布尔值，如果为False，相应的属性将不会返回。使用is*作为第二个参数可以过滤出指定类型的属性。
- getmodule(object)
    还在为第2节中的__module__属性只返回字符串而遗憾吗？这个方法一定可以满足你，它返回object的定义所在的模块对象。
- get{file|sourcefile}(object)
    获取object的定义所在的模块的文件名|源代码文件名（如果没有则返回None）。用于内建的对象（内建模块、类、函数、方法）上时会抛出TypeError异常。
- get{source|sourcelines}(object)
    获取object的定义的源代码，以字符串|字符串列表返回。代码无法访问时会抛出IOError异常。只能用于module/class/function/method/code/frame/traceack对象。
- getargspec(func)
    仅用于方法，获取方法声明的参数，返回元组，分别是(普通参数名的列表, *参数名, **参数名, 默认值元组)。如果没有值，将是空列表和3个None。如果是2.6以上版本，将返回一个命名元组(Named Tuple)，即除了索引外还可以使用属性名访问元组中的元素。

---
Links:

- [python动态获取对象的属性和方法 （转载）](http://www.cnblogs.com/zh1164/p/6031464.html)

---
END

