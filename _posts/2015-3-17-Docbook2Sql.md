---
layout: post
title:  "设计的演变"
date:   2015-03-17 23:27:37 +0000
tags:   [design]
author: Alan Wang
---

最近撰写数据库设计文档使用docbook来写，不在使用其他图形设计工具，此时遇到个问题，以前的数据库设计工具都有生成建表语句的功能，设置能连接数据库直接更新设计．而用docbook来做设计，文档管理方面是上去了，但是初始化数据库表这块就缺失了．于是要写个工具，根据做好的数据库设计来生成建表语句．

而这样一个工具大体应该包含这样一些功能：
- 提供命令行接口，便于自动化
- 提供GUI界面，方便实施和销售等没有编程技能的人使用（当然也可以做几个脚本）
- 支持多个数据库系统，mysql, postgres, oracle, sqlserver
- 可以选择文档目录，输出文档目录

由于公司有新同事来（新人），遍把任务交给他们做．

两天后，我去询问进度，部分功能实现了，看其代码，一个Main类，一个main函数，外加几个static方法，看了一眼，就实在不想看了，于是给给其讲设计．

大概的设计如下：

- 整个数据库设计对应一个DBDesign
- DBDesign下有许多个ModuleDesign
- ModuleDesign下有许多张TableDesign
- 每个TableDesign对应设计中的一个实体数据库表

如上类可以把我们编写的设计文档很清晰地对应到代码设计中，没有复杂的关系只是简单的组合．

对于解析生成sql部分，由于需要支持多种数据库，有如下类：

- Generator  接口
 - dbType: String
 - design: Design
 - subGenerators: List/Map
 - generate(): String
 - write(path): void
- TableGenerator 抽象类
 - design: TableTesign
- MysqlTableGenerator
- PostgresTableGenerator
- ModuleGenerator
 - design: ModuleDesign
 - subGenerators: List/Map TableGenerator的结合
- DesignGenerator
 - design: DBDesign
 - subGenerators: List/Map ModuleGenerator的集合

同样没有复杂的东西，就是一个组合模式．

还会有一些工具类：

- FileUtil
- XmlUtil

启动程序会有CliApp和GUIApp两个类，main的主要逻辑如下：
```java
sourceDir = ...
sqlType = ...
outputDir = ...
design = new Design(sourceDir) // 递归读取module和table
generator = new DesignGenerator(design, sqlType)
generator.write(outputDir)
```
而文章命名为**设计的演变**，说明事实并不是如我预期的那样．在我讲完这个设计之后的几天，我又去看他的程序，仍然是一堆`static`方法和变量，无比长的方法，大段的if else，虽然有几个类，但是大都不知所以

- Write
- FileUtil
- Table
- GenerateTable（大家不要用动词词组命名）
- ...

大多类里面的方法和类名不符，逻辑也不清晰．有一个可取的类是`Table`，里面存了一些逻辑不需要的变量和`title, text`内容，前者是表名称，后者是解析好的sql，依照其现状，对其代码进行整理．

首先是`Table`类，依然用来解析好的Sql等结果：

- TableResult / Table
 - title: String
 - tableName: String
 - cols: List 解析好的每一行的建表语句
 - getSql(): String 生成建表语句，包含语句前的注释
 - addColumn(columnSql): void cols中插入一行
 - write(path)
- TableGenerator
 - TableGenerator(String filePath)
 - generated: boolean 加入是否解析过的标志
 - generate: Table
- ModuleResult
 - tableResults
 - getSql()
 - write(path)
- ModuleGenerator
 - generated: boolean
 - tableGenerators
- ...
- FileUtil
- XMLUtil

解析表的逻辑：
```java
generator = new TableGenerator(path)
table = generator.generate()
println table.getSql()
table.write()
```

generate(), writer() 里面同样用简单组合模式（Module和DB）．

现在是设计演变的第一步，当然也可以理解成第一到Ｎ步，后面还有东西要做，实际功能也比上面的复杂，（现实中后来我花了大半天时间自己把这个程序写了，由于急着要用）．由于时间关系，不能在这里都写出来．

文笔和时间所限，文章也没描述太多关于演变的内容．我想表达的演变是什么意思呢，其实就是，在开发过程各种因素的影响下，无论如何都应该：

- 保持程序各个元素的低耦合，
- 使其协调工作，
- 由点到面，由小到大，从原型到产品一步一步的扩张功能
- 无害地插入功能

希望看到此文的人能了解一点我的意图，并以此自勉，任何时候不要因为各种因素放弃写出优秀程序的念头．


---
END