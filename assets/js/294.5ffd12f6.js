(window.webpackJsonp=window.webpackJsonp||[]).push([[294],{1010:function(s,a,t){"use strict";t.r(a);var n=t(6),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("PS: 原文链接在末尾")]),s._v(" "),t("h2",{attrs:{id:"变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量"}},[s._v("#")]),s._v(" 变量")]),s._v(" "),t("div",{staticClass:"language-nginx line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-nginx"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$a")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello world"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("标准 "),t("code",[s._v("ngx_rewrite")]),s._v(" 模块的 "),t("code",[s._v("set")]),s._v(" 配置指令对变量进行赋值.")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$a")]),s._v(" hello"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nset "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$b")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"$a, $a"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# hello, hello")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("第三方 "),t("code",[s._v("ngx_echo")]),s._v(" 模块的 "),t("code",[s._v("echo")]),s._v(" 配置指令将 "),t("code",[s._v("$foo")]),s._v(" 变量的值作为当前请求的响应体输出")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v(" hello"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"foo: $foo"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h4",{attrs:{id:"输出-符号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#输出-符号"}},[s._v("#")]),s._v(" 输出 $ 符号")]),s._v(" "),t("p",[s._v("标准模块 "),t("code",[s._v("ngx_geo")]),s._v(" 提供的配置指令 "),t("code",[s._v("geo")]),s._v(' 来为变量 $dollar 赋予字符串 "$"')]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    geo "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$dollar")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        default "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"$"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"This is a dollar sign: $dollar"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h4",{attrs:{id:"变量名紧跟-变量名的构成字符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量名紧跟-变量名的构成字符"}},[s._v("#")]),s._v(" 变量名紧跟 变量名的构成字符")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$first")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello "')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"${first}world"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h4",{attrs:{id:"变量创建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量创建"}},[s._v("#")]),s._v(" 变量创建")]),s._v(" "),t("p",[s._v("变量未创建就是用会报错, "),t("code",[s._v("set")]),s._v(" "),t("code",[s._v("geo")]),s._v(" 都会创建变量.")]),s._v(" "),t("p",[s._v("Nginx变量的创建只能发生在 Nginx 配置加载的时候,而赋值操作则只会发生在请求实际处理的时候")]),s._v(" "),t("ul",[t("li",[s._v("这意味着不创建而直接使用变量会导致启动失败")]),s._v(" "),t("li",[s._v("我们无法在请求处理时动态地创建新的 Nginx 变量")])]),s._v(" "),t("p",[s._v("Nginx 变量一旦创建，其变量名的可见范围就是整个 Nginx 配置，甚至可以跨越不同虚拟主机的 "),t("code",[s._v("server")]),s._v(" 配置块。")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("foo "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"foo = [$foo]"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bar "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$foo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"foo = [$foo]"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/foo'")]),s._v("\n    foo "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/bar'")]),s._v("\n    foo "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/foo'")]),s._v("\n    foo "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h2",{attrs:{id:"变量的生命周期贯穿内部跳转"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量的生命周期贯穿内部跳转"}},[s._v("#")]),s._v(" 变量的生命周期贯穿内部跳转")]),s._v(" "),t("p",[s._v("第三方模块 ngx_echo 提供的 echo_exec 配置指令")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("   server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("foo "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$a")]),s._v(" hello"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            echo_exec "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bar"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bar "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"a = [$a]"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("    $ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" localhost:8080/foo\n    a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("hello"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n\n    $ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" localhost:8080/foo\n    a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("标准 ngx_rewrite 模块的 rewrite 配置指令其实也可以发起“内部跳转”，例如上面那个例子用 rewrite 配置指令可以改写成下面这样的形式：")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    server "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        listen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("foo "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            set "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$a")]),s._v(" hello"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n            rewrite "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bar"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bar "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"a = [$a]"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("p",[s._v("另外, rewrite 还可以发起 301 和 302 这样的“外部跳转”")]),s._v(" "),t("h2",{attrs:{id:"用户变量-自定义变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用户变量-自定义变量"}},[s._v("#")]),s._v(" 用户变量 / 自定义变量")]),s._v(" "),t("p",[s._v("上面讲的都是"),t("code",[s._v("用户自定义变量")]),s._v(", 还有一些 Nginx core 或者各个模块提供的预定义变量,或者说内建变量(buildin variable).")]),s._v(" "),t("p",[s._v("例如由 "),t("code",[s._v("ngx_http_core")]),s._v(" 模块提供的内建变量 "),t("code",[s._v("$uri")]),s._v("，可以用来获取当前请求的 URI（经过解码，并且不含请求参数），而"),t("code",[s._v("$request_uri")]),s._v(" 则用来获取请求最原始的 URI （未经解码，并且包含请求参数）")]),s._v(" "),t("p",[s._v("eg:")]),s._v(" "),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"uri = $uri"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        echo "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"request_uri = $request_uri"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("div",{staticClass:"language-ruby line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ruby"}},[t("code",[s._v("    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/test'")]),s._v("\n    uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test\n    request_uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test\n\n    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/test?a=3&b=4'")]),s._v("\n    uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test\n    request_uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n\n    $ curl "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://localhost:8080/test/hello%20world?a=3&b=4'")]),s._v("\n    uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("hello world\n    request_uri "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("test"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("hello"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v("world"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v("b"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h3",{attrs:{id:"arg-xxx-变量群"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arg-xxx-变量群"}},[s._v("#")]),s._v(" $arg_XXX 变量群")]),s._v(" "),t("p",[s._v("名字以 arg_ 开头的所有变量")]),s._v(" "),t("p",[s._v("一个例子是 $arg_name，这个变量的值是当前请求名为 name 的 URI 参数的值，而且还是未解码的原始形式的值。我们来看一个比较完整的示例：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v('location /test {\n    echo "name: $arg_name";\n    echo "class: $arg_class";\n}\n')])])]),t("p",[s._v("然后在命令行上使用各种参数组合去请求这个 /test 接口：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("$ curl 'http://localhost:8080/test'\nname: \nclass: \n\n$ curl 'http://localhost:8080/test?name=Tom&class=3'\nname: Tom\nclass: 3\n\n$ curl 'http://localhost:8080/test?name=hello%20world&class=9'\nname: hello%20world\nclass: 9\n")])])]),t("p",[s._v("其实 $arg_name 不仅可以匹配 name 参数，也可以匹配 NAME 参数，抑或是 Name，等等：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("$ curl 'http://localhost:8080/test?NAME=Marry'\nname: Marry\nclass: \n\n$ curl 'http://localhost:8080/test?Name=Jimmy'\nname: Jimmy\nclass: \n")])])]),t("p",[s._v("Nginx 会在匹配参数名之前，自动把原始请求中的参数名调整为全部小写的形式。")]),s._v(" "),t("p",[s._v("如果你想对 URI 参数值中的 %XX 这样的编码序列进行解码，可以使用第三方 "),t("code",[s._v("ngx_set_misc")]),s._v(" 模块提供的 "),t("code",[s._v("set_unescape_uri")]),s._v(" 配置指令：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v('location /test {\n    set_unescape_uri $name $arg_name;\n    set_unescape_uri $class $arg_class;\n\n    echo "name: $name";\n    echo "class: $class";\n}\n')])])]),t("p",[s._v("现在我们再看一下效果：")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("$ curl 'http://localhost:8080/test?name=hello%20world&class=9'\nname: hello world\nclass: 9\n")])])]),t("p",[s._v("空格果然被解码出来了！")]),s._v(" "),t("p",[s._v("类似 $arg_XXX 的内建变量还有不少，比如用来取 cookie 值的 "),t("code",[s._v("$cookie_XXX")]),s._v(" 变量群，用来取请求头的 "),t("code",[s._v("$http_XXX")]),s._v(" 变量群，以及用来取响应头的 "),t("code",[s._v("$sent_http_XXX")]),s._v(" 变量群")]),s._v(" "),t("p",[s._v("需要指出的是，许多内建变量都是只读的，比如我们刚才介绍的 $uri 和 $request_uri. 对只读变量进行赋值是应当绝对避免的，因为会有意想不到的后果")]),s._v(" "),t("hr"),s._v(" "),t("ul",[t("li",[s._v("来源: https://openresty.org/download/agentzh-nginx-tutorials-zhcn.html#01-NginxVariables01")])])])}),[],!1,null,null,null);a.default=e.exports}}]);