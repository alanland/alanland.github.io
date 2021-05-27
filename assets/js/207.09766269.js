(window.webpackJsonp=window.webpackJsonp||[]).push([[207],{914:function(s,a,t){"use strict";t.r(a);var n=t(6),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"手动方案"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#手动方案"}},[s._v("#")]),s._v(" 手动方案")]),s._v(" "),t("p",[s._v("限制并发、下载传输速率, Nginx gonf:")]),s._v(" "),t("div",{staticClass:"language-conf line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("location /download_internal/ {\n    internal;\n    send_timeout 10 s;\n    limit_conn perserver 100;\n    limit_rate 0 k;\n\n    chunked_transfer_encoding off;\n    default_type application/octet-stream;\n\n    alias ../download/;\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("通过修改"),t("code",[s._v("limit_rate")]),s._v("的值，然后 "),t("code",[s._v("nginx -s reload")]),s._v("手动加载。")]),s._v(" "),t("h2",{attrs:{id:"通过lua控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#通过lua控制"}},[s._v("#")]),s._v(" 通过lua控制")]),s._v(" "),t("div",{staticClass:"language-lua line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-lua"}},[t("code",[s._v("location "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("download_internal"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    internal"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    send_timeout "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" s"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    limit_conn perserver "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    limit_rate "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" k"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    chunked_transfer_encoding off"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    default_type application"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("octet"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("stream"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    alias "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("download"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("PS: ngx.var.limit_rate 限速是基于请求的，如果相同终端发起两个连接，那么终端的最大速度将是 limit_rate 的两倍，原文如下：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("Syntax: limit_rate rate;\nDefault:\nlimit_rate 0;\nContext: http, server, location, if in location\n\nLimits the rate of response transmission to a client. The rate is specified in bytes per second. The zero value disables rate limiting. The limit is set per a request, and so if a client simultaneously opens two connections, the overall rate will be twice as much as the specified limit.\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("hr"),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"http://wiki.jikexueyuan.com/project/openresty-best-practice/lua-limit.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("OpenResty 最佳实践 动态限速"),t("OutboundLink")],1)])]),s._v(" "),t("hr")])}),[],!1,null,null,null);a.default=e.exports}}]);