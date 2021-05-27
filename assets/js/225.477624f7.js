(window.webpackJsonp=window.webpackJsonp||[]).push([[225],{936:function(s,n,e){"use strict";e.r(n);var a=e(6),t=Object(a.a)({},(function(){var s=this,n=s.$createElement,e=s._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("ul",[e("li",[e("code",[s._v("brew install openresty/brew/openresty")])]),s._v(" "),e("li",[e("code",[s._v("sudo mkdir /usr/local/opt")])]),s._v(" "),e("li",[e("code",[s._v('sudo chown -R "$USER":admin /usr/local/opt')])])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("Error: /usr/local/opt/pcre not present or broken\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("ul",[e("li",[e("code",[s._v("brew link pcre")])])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(" ==> Installing openresty from openresty/brew\nError: /usr/local/opt/openresty-openssl not present or broken\nPlease reinstall openresty/brew/openresty-openssl. Sorry :(\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("ul",[e("li",[e("code",[s._v("brew reinstall openresty/brew/openresty-openssl")])]),s._v(" "),e("li",[e("code",[s._v("brew reinstall openresty/brew/openresty")])])]),s._v(" "),e("p",[s._v("测试安装成功没有：")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("$ resty -e "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'print(\"hello, world!\")'")]),s._v("\nhello, world"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("应用安装在了")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("ls -al  /usr/local/opt/openresty\nlrwxr-xr-x  1 alan  admin  28 Dec  4 11:07 /usr/local/opt/openresty -> ../Cellar/openresty/1.13.6.1\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("$ ls /usr/local/Cellar/openresty/1.13.6.1/\nCOPYRIGHT\t\t\tlualib\nINSTALL_RECEIPT.json\t\tnginx\nREADME.markdown\t\t\tpod\nbin\t\t\t\tresty.index\nhomebrew.mxcl.openresty.plist\tsite\nluajit\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("h2",{attrs:{id:"开始一份简单的配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开始一份简单的配置"}},[s._v("#")]),s._v(" 开始一份简单的配置")]),s._v(" "),e("p",[s._v("准备目录：")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("mkdir ~/work\ncd ~/work\nmkdir logs/ conf/\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("p",[s._v("创建配置： "),e("code",[s._v("conf/nginx.conf")])]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("worker_processes  1;\nerror_log logs/error.log;\nevents {\n    worker_connections 1024;\n}\nhttp {\n    server {\n        listen 8080;\n        location / {\n            default_type text/html;\n            content_by_lua '\n                ngx.say(\"<p>hello, world</p>\")\n            ';\n        }\n    }\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br")])]),e("p",[s._v("使用nginx：")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/opt/openresty/nginx/sbin:"),e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("启动Server：")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("nginx -p "),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("pwd")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("/ -c conf/nginx.conf\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("访问测试：")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" http://localhost:8080/\n"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("p"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("hello, world"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("/p"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("当前的目录结构：")]),s._v(" "),e("div",{staticClass:"language-$ tree line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(".\n├── client_body_temp\n├── conf\n│   └── nginx.conf\n├── fastcgi_temp\n├── logs\n│   └── error.log\n├── proxy_temp\n├── scgi_temp\n└── uwsgi_temp\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br")])]),e("p",[s._v("在MacOS上使用"),e("code",[s._v("ab (Apache's benchmark tool)")]),s._v("压了测试")]),s._v(" "),e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("$ ab -k -c10 -n10000 -t1 -r "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http://127.0.0.1:8080/'")]),s._v("\nThis is ApacheBench, Version "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.3")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$Revision")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1796539")]),s._v(" $"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\nCopyright "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1996")]),s._v(" Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/\nLicensed to The Apache Software Foundation, http://www.apache.org/\n\nBenchmarking "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("be patient"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("15000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("20000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("25000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("30000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("35000")]),s._v(" requests\nCompleted "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("40000")]),s._v(" requests\nFinished "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("43735")]),s._v(" requests\n\n\nServer Software:        openresty/1.13.6.1\nServer Hostname:        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1\nServer Port:            "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v("\n\nDocument Path:          /\nDocument Length:        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v(" bytes\n\nConcurrency Level:      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\nTime taken "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" tests:   "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.000")]),s._v(" seconds\nComplete requests:      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("43735")]),s._v("\nFailed requests:        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\nKeep-Alive requests:    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("43305")]),s._v("\nTotal transferred:      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("7564005")]),s._v(" bytes\nHTML transferred:       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("874700")]),s._v(" bytes\nRequests per second:    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("43734.65")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#/sec] (mean)")]),s._v("\nTime per request:       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.229")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("ms"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("mean"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nTime per request:       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.023")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("ms"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("mean, across all concurrent requests"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nTransfer rate:          "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("7386.66")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Kbytes/sec"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" received\n\nConnection Times "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ms"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n              min  mean"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("+/-sd"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" median   max\nConnect:        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("   "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v("      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nProcessing:     "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("   "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nWaiting:        "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("   "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\nTotal:          "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("    "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("   "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("       "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\nPercentage of the requests served within a certain "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("time")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ms"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("50")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("66")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("75")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("90")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("95")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("98")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("99")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("%      "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("longest request"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br"),e("span",{staticClass:"line-number"},[s._v("44")]),e("br"),e("span",{staticClass:"line-number"},[s._v("45")]),e("br"),e("span",{staticClass:"line-number"},[s._v("46")]),e("br"),e("span",{staticClass:"line-number"},[s._v("47")]),e("br"),e("span",{staticClass:"line-number"},[s._v("48")]),e("br"),e("span",{staticClass:"line-number"},[s._v("49")]),e("br"),e("span",{staticClass:"line-number"},[s._v("50")]),e("br"),e("span",{staticClass:"line-number"},[s._v("51")]),e("br"),e("span",{staticClass:"line-number"},[s._v("52")]),e("br"),e("span",{staticClass:"line-number"},[s._v("53")]),e("br")])]),e("hr"),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"http://openresty.org/en/installation.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("OpenResty Installation"),e("OutboundLink")],1)]),s._v(" "),e("li",[e("a",{attrs:{href:"http://openresty.org/en/getting-started.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("OpenResty Getting Started"),e("OutboundLink")],1)]),s._v(" "),e("li",[e("a",{attrs:{href:"http://openresty.org/en/benchmark.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Benchmark"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);n.default=t.exports}}]);