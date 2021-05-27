(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{748:function(t,e,s){"use strict";s.r(e);var a=s(6),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("最近撰写数据库设计文档使用docbook来写，不在使用其他图形设计工具，此时遇到个问题，以前的数据库设计工具都有生成建表语句的功能，设置能连接数据库直接更新设计．而用docbook来做设计，文档管理方面是上去了，但是初始化数据库表这块就缺失了．于是要写个工具，根据做好的数据库设计来生成建表语句．")]),t._v(" "),s("p",[t._v("而这样一个工具大体应该包含这样一些功能：")]),t._v(" "),s("ul",[s("li",[t._v("提供命令行接口，便于自动化")]),t._v(" "),s("li",[t._v("提供GUI界面，方便实施和销售等没有编程技能的人使用（当然也可以做几个脚本）")]),t._v(" "),s("li",[t._v("支持多个数据库系统，mysql, postgres, oracle, sqlserver")]),t._v(" "),s("li",[t._v("可以选择文档目录，输出文档目录")])]),t._v(" "),s("p",[t._v("由于公司有新同事来（新人），遍把任务交给他们做．")]),t._v(" "),s("p",[t._v("两天后，我去询问进度，部分功能实现了，看其代码，一个Main类，一个main函数，外加几个static方法，看了一眼，就实在不想看了，于是给给其讲设计．")]),t._v(" "),s("p",[t._v("大概的设计如下：")]),t._v(" "),s("ul",[s("li",[t._v("整个数据库设计对应一个DBDesign")]),t._v(" "),s("li",[t._v("DBDesign下有许多个ModuleDesign")]),t._v(" "),s("li",[t._v("ModuleDesign下有许多张TableDesign")]),t._v(" "),s("li",[t._v("每个TableDesign对应设计中的一个实体数据库表")])]),t._v(" "),s("p",[t._v("如上类可以把我们编写的设计文档很清晰地对应到代码设计中，没有复杂的关系只是简单的组合．")]),t._v(" "),s("p",[t._v("对于解析生成sql部分，由于需要支持多种数据库，有如下类：")]),t._v(" "),s("ul",[s("li",[t._v("Generator  接口")]),t._v(" "),s("li",[t._v("dbType: String")]),t._v(" "),s("li",[t._v("design: Design")]),t._v(" "),s("li",[t._v("subGenerators: List/Map")]),t._v(" "),s("li",[t._v("generate(): String")]),t._v(" "),s("li",[t._v("write(path): void")]),t._v(" "),s("li",[t._v("TableGenerator 抽象类")]),t._v(" "),s("li",[t._v("design: TableTesign")]),t._v(" "),s("li",[t._v("MysqlTableGenerator")]),t._v(" "),s("li",[t._v("PostgresTableGenerator")]),t._v(" "),s("li",[t._v("ModuleGenerator")]),t._v(" "),s("li",[t._v("design: ModuleDesign")]),t._v(" "),s("li",[t._v("subGenerators: List/Map TableGenerator的结合")]),t._v(" "),s("li",[t._v("DesignGenerator")]),t._v(" "),s("li",[t._v("design: DBDesign")]),t._v(" "),s("li",[t._v("subGenerators: List/Map ModuleGenerator的集合")])]),t._v(" "),s("p",[t._v("同样没有复杂的东西，就是一个组合模式．")]),t._v(" "),s("p",[t._v("还会有一些工具类：")]),t._v(" "),s("ul",[s("li",[t._v("FileUtil")]),t._v(" "),s("li",[t._v("XmlUtil")])]),t._v(" "),s("p",[t._v("启动程序会有CliApp和GUIApp两个类，main的主要逻辑如下：")]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("sourceDir "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\nsqlType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\noutputDir "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\ndesign "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Design")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sourceDir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 递归读取module和table")]),t._v("\ngenerator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DesignGenerator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("design"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sqlType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngenerator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("outputDir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("p",[t._v("而文章命名为"),s("strong",[t._v("设计的演变")]),t._v("，说明事实并不是如我预期的那样．在我讲完这个设计之后的几天，我又去看他的程序，仍然是一堆"),s("code",[t._v("static")]),t._v("方法和变量，无比长的方法，大段的if else，虽然有几个类，但是大都不知所以")]),t._v(" "),s("ul",[s("li",[t._v("Write")]),t._v(" "),s("li",[t._v("FileUtil")]),t._v(" "),s("li",[t._v("Table")]),t._v(" "),s("li",[t._v("GenerateTable（大家不要用动词词组命名）")]),t._v(" "),s("li",[t._v("...")])]),t._v(" "),s("p",[t._v("大多类里面的方法和类名不符，逻辑也不清晰．有一个可取的类是"),s("code",[t._v("Table")]),t._v("，里面存了一些逻辑不需要的变量和"),s("code",[t._v("title, text")]),t._v("内容，前者是表名称，后者是解析好的sql，依照其现状，对其代码进行整理．")]),t._v(" "),s("p",[t._v("首先是"),s("code",[t._v("Table")]),t._v("类，依然用来解析好的Sql等结果：")]),t._v(" "),s("ul",[s("li",[t._v("TableResult / Table")]),t._v(" "),s("li",[t._v("title: String")]),t._v(" "),s("li",[t._v("tableName: String")]),t._v(" "),s("li",[t._v("cols: List 解析好的每一行的建表语句")]),t._v(" "),s("li",[t._v("getSql(): String 生成建表语句，包含语句前的注释")]),t._v(" "),s("li",[t._v("addColumn(columnSql): void cols中插入一行")]),t._v(" "),s("li",[t._v("write(path)")]),t._v(" "),s("li",[t._v("TableGenerator")]),t._v(" "),s("li",[t._v("TableGenerator(String filePath)")]),t._v(" "),s("li",[t._v("generated: boolean 加入是否解析过的标志")]),t._v(" "),s("li",[t._v("generate: Table")]),t._v(" "),s("li",[t._v("ModuleResult")]),t._v(" "),s("li",[t._v("tableResults")]),t._v(" "),s("li",[t._v("getSql()")]),t._v(" "),s("li",[t._v("write(path)")]),t._v(" "),s("li",[t._v("ModuleGenerator")]),t._v(" "),s("li",[t._v("generated: boolean")]),t._v(" "),s("li",[t._v("tableGenerators")]),t._v(" "),s("li",[t._v("...")]),t._v(" "),s("li",[t._v("FileUtil")]),t._v(" "),s("li",[t._v("XMLUtil")])]),t._v(" "),s("p",[t._v("解析表的逻辑：")]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("generator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TableGenerator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntable "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" generator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("generate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprintln table"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSql")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("p",[t._v("generate(), writer() 里面同样用简单组合模式（Module和DB）．")]),t._v(" "),s("p",[t._v("现在是设计演变的第一步，当然也可以理解成第一到Ｎ步，后面还有东西要做，实际功能也比上面的复杂，（现实中后来我花了大半天时间自己把这个程序写了，由于急着要用）．由于时间关系，不能在这里都写出来．")]),t._v(" "),s("p",[t._v("文笔和时间所限，文章也没描述太多关于演变的内容．我想表达的演变是什么意思呢，其实就是，在开发过程各种因素的影响下，无论如何都应该：")]),t._v(" "),s("ul",[s("li",[t._v("保持程序各个元素的低耦合，")]),t._v(" "),s("li",[t._v("使其协调工作，")]),t._v(" "),s("li",[t._v("由点到面，由小到大，从原型到产品一步一步的扩张功能")]),t._v(" "),s("li",[t._v("无害地插入功能")])]),t._v(" "),s("p",[t._v("希望看到此文的人能了解一点我的意图，并以此自勉，任何时候不要因为各种因素放弃写出优秀程序的念头．")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("END")])])}),[],!1,null,null,null);e.default=n.exports}}]);