---
title:  "Nginx 配置学习 - 1"
date:   2019-01-16 11:23:37
tags:   [nginx]
---

 PS: 原文链接在末尾


## 变量

```nginx
set $a "hello world";
```

标准 `ngx_rewrite` 模块的 `set` 配置指令对变量进行赋值.

```ruby
set $a hello;
set $b "$a, $a"; # hello, hello
```

第三方 `ngx_echo` 模块的 `echo` 配置指令将 `$foo` 变量的值作为当前请求的响应体输出
```ruby
    server {
        listen 8080;

        location /test {
            set $foo hello;
            echo "foo: $foo";
        }
    }
```

#### 输出 $ 符号
标准模块 `ngx_geo` 提供的配置指令 `geo` 来为变量 $dollar 赋予字符串 "$"

```ruby
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

#### 变量名紧跟 变量名的构成字符

```ruby
    server {
        listen 8080;

        location /test {
            set $first "hello ";
            echo "${first}world";
        }
    }
```

#### 变量创建

变量未创建就是用会报错, `set` `geo` 都会创建变量.

Nginx变量的创建只能发生在 Nginx 配置加载的时候,而赋值操作则只会发生在请求实际处理的时候

- 这意味着不创建而直接使用变量会导致启动失败
- 我们无法在请求处理时动态地创建新的 Nginx 变量

Nginx 变量一旦创建，其变量名的可见范围就是整个 Nginx 配置，甚至可以跨越不同虚拟主机的 `server` 配置块。

```ruby
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

```ruby
    $ curl 'http://localhost:8080/foo'
    foo = []

    $ curl 'http://localhost:8080/bar'
    foo = [32]

    $ curl 'http://localhost:8080/foo'
    foo = []
```

## 变量的生命周期贯穿内部跳转

第三方模块 ngx_echo 提供的 echo_exec 配置指令

```ruby
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

```sh
    $ curl localhost:8080/foo
    a = [hello]

    $ curl localhost:8080/foo
    a = []
```

标准 ngx_rewrite 模块的 rewrite 配置指令其实也可以发起“内部跳转”，例如上面那个例子用 rewrite 配置指令可以改写成下面这样的形式：

```ruby
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

另外, rewrite 还可以发起 301 和 302 这样的“外部跳转”

## 用户变量 / 自定义变量

上面讲的都是`用户自定义变量`, 还有一些 Nginx core 或者各个模块提供的预定义变量,或者说内建变量(buildin variable).

例如由 `ngx_http_core` 模块提供的内建变量 `$uri`，可以用来获取当前请求的 URI（经过解码，并且不含请求参数），而` $request_uri` 则用来获取请求最原始的 URI （未经解码，并且包含请求参数）

eg:

```ruby
    location /test {
        echo "uri = $uri";
        echo "request_uri = $request_uri";
    }
```

```ruby
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

###  $arg_XXX 变量群

名字以 arg_ 开头的所有变量

一个例子是 $arg_name，这个变量的值是当前请求名为 name 的 URI 参数的值，而且还是未解码的原始形式的值。我们来看一个比较完整的示例：

    location /test {
        echo "name: $arg_name";
        echo "class: $arg_class";
    }
然后在命令行上使用各种参数组合去请求这个 /test 接口：

    $ curl 'http://localhost:8080/test'
    name: 
    class: 

    $ curl 'http://localhost:8080/test?name=Tom&class=3'
    name: Tom
    class: 3

    $ curl 'http://localhost:8080/test?name=hello%20world&class=9'
    name: hello%20world
    class: 9
其实 $arg_name 不仅可以匹配 name 参数，也可以匹配 NAME 参数，抑或是 Name，等等：

    $ curl 'http://localhost:8080/test?NAME=Marry'
    name: Marry
    class: 

    $ curl 'http://localhost:8080/test?Name=Jimmy'
    name: Jimmy
    class: 

Nginx 会在匹配参数名之前，自动把原始请求中的参数名调整为全部小写的形式。

如果你想对 URI 参数值中的 %XX 这样的编码序列进行解码，可以使用第三方 `ngx_set_misc` 模块提供的 `set_unescape_uri` 配置指令：

    location /test {
        set_unescape_uri $name $arg_name;
        set_unescape_uri $class $arg_class;

        echo "name: $name";
        echo "class: $class";
    }
现在我们再看一下效果：

    $ curl 'http://localhost:8080/test?name=hello%20world&class=9'
    name: hello world
    class: 9
空格果然被解码出来了！

类似 $arg_XXX 的内建变量还有不少，比如用来取 cookie 值的 `$cookie_XXX` 变量群，用来取请求头的 `$http_XXX` 变量群，以及用来取响应头的 `$sent_http_XXX` 变量群

需要指出的是，许多内建变量都是只读的，比如我们刚才介绍的 $uri 和 $request_uri. 对只读变量进行赋值是应当绝对避免的，因为会有意想不到的后果



---
- 来源: https://openresty.org/download/agentzh-nginx-tutorials-zhcn.html#01-NginxVariables01

