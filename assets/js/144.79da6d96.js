(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{837:function(s,t,n){"use strict";n.r(t);var a=n(6),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("对一个50多万行记录的表中更新数据,每次读取1000,根据主键id进行更新,\n每次对1000条数据进行更新,测试平局消耗时间大概在18秒.")]),s._v(" "),n("div",{staticClass:"language-markdown line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-markdown"}},[n("code",[s._v("0000\t \t 17363 finish\n1000\t \t 16465 finish\n2000\t \t 18326 finish\n3000\t \t 17717 finish\n4000\t \t 16415 finish\n5000\t \t 18335 finish\n6000\t \t 16864 finish\n7000\t \t 17836 finish\n8000\t \t 17948 finish\n9000\t \t 17993 finish\n10000\t \t 16410 finish\n11000\t \t 18368 finish\n12000\t \t 18536 finish\n13000\t \t 19096 finish\n14000\t \t 18106 finish\n15000\t \t 18973 finish\n16000\t \t 18720 finish\n17000\t \t 22946 finish\n18000\t \t 20874 finish\n19000\t \t 21129 finish\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br")])]),n("p",[s._v("jdbc连接增加参数"),n("code",[s._v("useServerPrepStmts=false&rewriteBatchedStatements=true")]),s._v(",")]),s._v(" "),n("div",{staticClass:"language-markdown line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-markdown"}},[n("code",[s._v("1000\t \t 448 finish\n2000\t \t 412 finish\n3000\t \t 411 finish\n4000\t \t 402 finish\n5000\t \t 401 finish\n6000\t \t 408 finish\n7000\t \t 395 finish\n8000\t \t 401 finish\n9000\t \t 391 finish\n10000\t \t 917 finish\n11000\t \t 1427 finish\n12000\t \t 1194 finish\n13000\t \t 1256 finish\n14000\t \t 1224 finish\n15000\t \t 1728 finish\n16000\t \t 1103 finish\n17000\t \t 1388 finish\n18000\t \t 1248 finish\n19000\t \t 1220 finish\n20000\t \t 1297 finish\n21000\t \t 1187 finish\n22000\t \t 1309 finish\n23000\t \t 1259 finish\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br")])]),n("p",[s._v("1000条数据平均1.2秒,对于更新过的数据耗时400毫秒.")]),s._v(" "),n("p",[n("code",[s._v("useServerPrepStmts")]),s._v("默认已经是false,如果改成true,可能也没有太大影响.")]),s._v(" "),n("p",[n("code",[s._v("rewriteBatchedStatements")]),s._v("设置为true的时候,jdbc发送到mysql server的sql语句会\n由:")]),s._v(" "),n("div",{staticClass:"language-sql line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sql"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" X "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("A1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("B1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("C1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" X "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("A2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("B2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("C2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" X "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("An"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("Bn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("Cn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br")])]),n("p",[s._v("变成:")]),s._v(" "),n("div",{staticClass:"language-sql line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sql"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" X "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("A1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("B1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("C1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("A2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("B2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("C2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("An"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("Bn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("Cn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("可以通过 "),n("code",[s._v("SET global general_log = 1")]),s._v(" 来监控到这些sql.")]),s._v(" "),n("hr"),s._v(" "),n("p",[s._v("Links:")]),s._v(" "),n("ul",[n("li",[s._v("https://stackoverflow.com/questions/2993251/jdbc-batch-insert-performance")])]),s._v(" "),n("hr"),s._v(" "),n("p",[s._v("END")])])}),[],!1,null,null,null);t.default=e.exports}}]);