---
title:  "Nginx: Variable Usage"
date:   2017-11-11 21:17:37 +0000
tags:   [nginx]
---

Nginx的配置文件也算是一门编程语言，设计上受 Perl 和 Bourne shell 的影响。

这种“语言”的变量只有一种类型，那就是字符串，设置变量如下：

```perl
set $a "hello world";
```

`set`指令是标准模块 `ngx_rewrite` 提供的。

语法要求变量名字都以`$`开头。

类似Perl的variable interpolation。

```perl
set $a hello;
set $b "$a, $a"; # $b: hello hello
```

比如配置一个简单的server：

```perl
server {
  listen 8080;

  location /test {
    set $foo hello;
    echo "foo: $foo";
  }
}
```

`echo`指令是第三方模块`ngx_echo`提供的。

```sh
$ curl 'http://localhost:8080/test'
foo: hello
```


字符串中使用`$`,

```perl
geo $dollar {
  default "$";
}

server {
  listen 8080;

  location /test {
    echo "This is a dollar sign: $dollar";
  }
}
```

测试：

```
$ curl 'http://localhost:8080/test'
This is a dollar sign: $
```

`geo`指令由标准模块`ngx_geo`提供。

### `${}` 格式来消除歧义

```
server {
  listen 8080;

  location /test {
    set $first "hello ";
    echo "${first}world";
  }
}
```


### `set`和`geo`由创建变量的功能，如果变量未定义就使用会报错:

```perl
 server {
  listen 8080;

  location /bad {
    echo $foo;
  }
 }
```

```
[emerg] unknown "foo" variable
```

## 变量的作用范围

- 定义后这个配置可见
- 每个请求都有独立的变量副本
  - Nginx 变量的生命期是不可能跨越请求边界

```perl
server {
  listen 8080;

  location /foo {
    echo "foo = [$foo]";
  }

  location /bar {
    set $foo 32;
    echo "foo = [$foo]";
  }
}
```

```sh
$ curl 'http://localhost:8080/foo'
foo = []
$ curl 'http://localhost:8080/bar'
foo = [32]
$ curl 'http://localhost:8080/foo'
foo = []
```

### 内部跳转

`echo_exec` 由第三方模块 `ngx_echo` 提供

```perl
server {
  listen 8080;
  location /foo {
    set $a hello;
    echo_exec /bar;
  }
  location /bar {
    echo "a = [$a]";
  }
}
```

```
$ curl localhost:8080/foo
a = [hello]
```

标准 `ngx_rewrite` 模块的 `rewrite` 配置指令也可以发起“内部跳转”

```perl
server {
  listen 8080;
  location /foo {
    set $a hello;
    rewrite ^ /bar;
  }
  location /bar {
    echo "a = [$a]";
  }
}
```

## 内建变量

最常见的用途就是获取关于请求或响应的各种信息

### ngx_http_core 模块提供的内建变量 $uri

$uri，可以用来获取当前请求的 URI（经过解码，并且不含请求参数），
而 $request_uri 则用来获取请求最原始的 URI （未经解码，并且包含请求参数）

```perl
location /test {
  echo "uri = $uri";
  echo "request_uri = $request_uri";
}
```

```
$ curl 'http://localhost:8080/test'
uri = /test
request_uri = /test
$ curl 'http://localhost:8080/test?a=3&b=4'
uri = /test
request_uri = /test?a=3&b=4
$ curl 'http://localhost:8080/test/hello%20world?a=3&b=4'
uri = /test/hello world
request_uri = /test/hello%20world?a=3&b=4
```

## `$arg_XXX` 变量

```perl
location /test {
  echo "name: $arg_name";
  echo "class: $arg_class";
}
```

```
$ curl 'http://localhost:8080/test'
name:
class:
$ curl 'http://localhost:8080/test?name=Tom&class=3'
name: Tom
class: 3
$ curl 'http://localhost:8080/test?name=hello%20world&class=9'
name: hello%20world
class: 9
```

### Base64 解码

ngx_set_misc 模块提供的 set_unescape_uri

```perl
location /test {
  set_unescape_uri $name $arg_name;
  set_unescape_uri $class $arg_class;
  echo "name: $name";
  echo "class: $class";
}
```

```
$ curl 'http://localhost:8080/test?name=hello%20world&class=9'
name: hello world
class: 9
```

看到空格被解码出来了。

### 取cookie值的 `$cookie_XXX`

### 取请求头的 `$http_XXX`

### 取响应头的 `$sent_http_XXX`

## `$args` 改写，影响 `$arg_XXX`

```perl
location /test {
  set $orig_args $args;
  set $args "a=3&b=4";
  echo "original args: $orig_args";
  echo "args: $args";
}
```

```
$ curl 'http://localhost:8080/test'
original args:
args: a=3&b=4
$ curl 'http://localhost:8080/test?a=0&b=1&c=2'
original args: a=0&b=1&c=2
args: a=3&b=4
```

通过修改 $args 变量影响标准的 HTTP 代理模块 ngx_proxy 的例子:

```perl
server {
  listen 8080;
  location /test {
    set $args "foo=1&bar=2";
    proxy_pass http://127.0.0.1:8081/args;
  }
}
server {
  listen 8081;
  location /args {
    echo "args: $args";
  }
}
```

```
$ curl 'http://localhost:8080/test?blah=7'
args: foo=1&bar=2
```
