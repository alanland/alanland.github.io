---
layout: post
title:  "Spring get HttpServletRequest"
date:   2017-11-10 13:57:37 +0000
tags:   [lau]
author: Alan Wang
---

# Lua 基本语法

## 交互式编程

```lua
$ lua -i
$ Lua 5.3.0  Copyright (C) 1994-2015 Lua.org, PUC-Rio
>
```

```lua
> print("Hello World！")
Hello World！
>
```

## 脚本式编程

`hello.lua`

```lua
print("Hello World！")
print("www.w3cschool.cn")
```

执行以上脚本:


```lua
$ lua test.lua
Hello World！
www.w3cschool.cn
```

指定执行程序：

```lua
#!/usr/local/bin/lua

print("Hello World！")
print("www.w3cschool.cn")
```

```sh
./test.lua
Hello World！
www.w3cschool.cn
```

## 注释

### 单行注释

```lua
-- 单行注释
```

### 多行注释

```lua
--[[
 多行注释
 多行注释
--]]
```

## 关键词

```
and	break	do	else
elseif	end	false	for
function	if	in	local
nil	not	or	repeat
return	then	true	until
while
```

一般约定，以下划线开头连接一串大写字母的名字（比如 _VERSION）被保留用于 Lua 内部全局变量。

## 全局变量

在默认情况下，变量总是认为是全局的。

全局变量不需要声明，给一个变量赋值后即创建了这个全局变量，访问一个没有初始化的全局变量也不会出错，
只不过得到的结果是：nil。

如果你想删除一个全局变量，只需要将变量赋值为nil。

```lua
> print(b)
nil
> b=10
> print(b)
10

b = nil
print(b)      --> nil
```

# Lua 数据类型

Lua是动态类型语言，变量不要类型定义,只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。

Lua中有8个基本类型分别为：nil、boolean、number、string、userdata、function、thread和table。

```lua
print(type("Hello world"))      --> string
print(type(10.4*3))             --> number
print(type(print))              --> function
print(type(type))               --> function
print(type(true))               --> boolean
print(type(nil))                --> nil
print(type(type(X)))            --> string
```

## table

```lua
-- 创建一个空的 table
local tbl1 = {}

-- 直接初始表
local tbl2 = {"apple", "pear", "orange", "grape"}
```

## unction（函数）

在 Lua 中，函数是被看作是"第一类值（First-Class Value）"，函数可以存在变量里:

```lua
-- function_test.lua 脚本文件
function factorial1(n)
    if n == 0 then
        return 1
    else
        return n * factorial1(n - 1)
    end
end
print(factorial1(5))
factorial2 = factorial1
print(factorial2(5))
```

function 可以以匿名函数（anonymous function）的方式通过参数传递:

```lua
-- function_test2.lua 脚本文件
function anonymous(tab, fun)
    for k, v in pairs(tab) do
        print(fun(k, v))
    end
end
tab = { key1 = "val1", key2 = "val2" }
anonymous(tab, function(key, val)
    return key .. " = " .. val
end)
```

# Lua 变量

Lua 变量有三种类型：全局变量、局部变量、表中的域。

函数外的变量默认为全局变量，除非用 local 显示声明。函数内变量与函数的参数默认为局部变量。

局部变量的作用域为从声明位置开始到所在语句块结束（或者是直到下一个同名局部变量的声明）。
变量的默认值均为 nil。

```lau
-- test.lua 文件脚本
a = 5               -- 全局变量
local b = 5         -- 局部变量

function joke()
    c = 5           -- 全局变量
    local d = 6     -- 局部变量
end

joke()
print(c,d)          --> 5 nil

do
    local a = 6     -- 局部变量
    b = 6           -- 全局变量
    print(a,b);     --> 6 6
end

print(a,b)      --> 5 6
```

```lua
a, b = 10, 2*x       <-->       a=10; b=2*x
x, y = y, x                     -- swap 'x' for 'y'
a[i], a[j] = a[j], a[i]         -- swap 'a[i]' for 'a[i]'

a, b = a+1, b+1, b+2     -- value of b+2 is ignored
print(a,b)               --> 1   2

a, b, c = 0
print(a,b,c)             --> 0   nil   nil
```


```lua
> site = {}
> site["key"] = "www.w3cschool.cn"
> print(site["key"])
www.w3cschool.cn
> print(site.key)
www.w3cschool.cn
```

# 循环

```lua
while( true )
do
   print("循环将永远执行下去")
end
```

# if

```lua
--[ 0 为true ]
if(0)
then
    print("0 为真")
end
```

```lua
if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end
```

```lua
if( 布尔表达式 1)
then
   --[ 在布尔表达式 1 为 true 时执行该语句块 --]

else if( 布尔表达式 2)
   --[ 在布尔表达式 2 为 true 时执行该语句块 --]

else if( 布尔表达式 3)
   --[ 在布尔表达式 3 为 true 时执行该语句块 --]
else
   --[ 如果以上布尔表达式都不为 true 则执行该语句块 --]
end
```


---

- https://www.w3cschool.cn/lua
- https://www.w3cschool.cn/lua/lua-functions.html

---

