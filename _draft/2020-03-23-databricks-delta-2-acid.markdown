---
layout: post
title:  "Databricks Delta - 1 - ACID / Transaction Log"
date:   2020-03-23T14:28:27.314Z
tags:   [bigdata]
categories: [Tools]
author: Alan Wang
---

传统的数据湖客户在载入数据的时候，比如数据存在 S3 上，是不能满足 ACID 事务的。Delta 通过一个 Transaction Log 来实现ACID事务。

下面来看一下 Delta 怎么在文件层面实现一个优雅的，支持多并发读写的事务日志。

事务日志（DeltaLog）是Dalta 数据库上所有事务的一个顺序记录。

## Transaction Log 用来干啥

Delta Lake 在 Apache Spark 的基础上构建，允许多用户同时进行读写。为了能给用户一直显示正确的数据视图，Delta Lake 事务提供了一个集中的
仓库来追踪用户对表进行的所有操作。

当用户第一次读取表或者对一个刚刚修改过的已经打开的表运行查询是，Spark 就会检查事物日志，看是不是已经有新的事务已经在这张表上提交，然后把
这些改动更新到用户表。这样能保证一张表对于用户的版本，一直和和主表是同步的。 同时保证用户不能对表做有冲突或者有歧义的修改。

## Delta Lake 的原子性

ACID 四个属性之一的原子性，保证了操作（比如插入或者更新）要么全部完成，要么全部不完成。没有这个特性，在硬件故障或者软件 Bug 发生的时候，
数据就会变得一团糟。

事务日志就是 Delta Lake 保证原子性的机制。总而言之，只有把日志记录完整，并且让记录是『唯一的真相』，事物日志让能让用户放心他们的数据。

## 事务日志如何工作

### 将事物拆分成原子提交

当用户提交一个修改表的操作，Delta Lake 将这个操作打散成由下面这些行为组成的一步一步：

- `Add File` -  增加一个数据文件
- `Remove File` - 移除一个数据文件
- `Update metadata` - 更新表的元数据（比如更改表名，表结构，或者分区）
- `Set transaction` -  记录一个给定 ID 的结构化流任务已经提交了
- `Change protocal` - 通过更新事务日志到最新的软件协议来开启新特性
- `Commit info` -  保持提交的前后信息：什么操作、什么时候、在哪里发生的

这些行为会被事务日志以原子性有序的记录，也就是我们说的提交（commits）。

比如：假设用户创建了一个对表增加了一列同时插入一些数据的事务。Delta Lake 会将之拆分成：

- Update Metadata - 修改 schema 增加一列
- Add File - 添加新文件

### 事务日志在文件级别

用户创建一张表时，表的事务日志会自动创建一个`_delta_log`的子目录，当用户对表进行更改的时候，这些更改会被事务日志有序的记录成原子提交。

每个提交都被写成 JSON 文件，从 `000000.json` 开始，新的变化会被写到`000001.json`，然后是 `000002.json`，以此类推。

![](/images/2020-03-23-databricks-delta-2-acid/image7.png)

比如我们要添加两个数据文件 `1.parquet` 和 `2.parquet`，这个事务会自动保存在磁盘上 `000000.json`。后来我们又想天健一个新文件 
`3.parquet` 替换原来的，那么这个事务就会记录在 ``000001.json`。

![](/images/2020-03-23-databricks-delta-2-acid/image3-6.png)

即使前两个文件已经不在我们的表里面了，但是事务日志还是会把他们的改动记录下来。Delta Lake 保存这些原子提交，以保证在使用时间旅行功能的时候，
可以看到给定任意时间的表状态。

同时，Spark 并不急于移除这些日志文件，即使表的数据文件已经删除了。用户可以通过 `VACUUM` 命令来清理这些记录。

## 通过 Checkpoint 文件快速重算状态

Delta 每 10 次提交就会自动生成一次 checkpoint 文件。

![](/images/2020-03-23-databricks-delta-2-acid/image6-1.png)

这些检查点文件会使用原生的Parquet格式，保存当时表的完整状态。也就是说，可以让 Spark 读这些快照，而不是上千个小的、低效的 Json 文件。

为了加速，Spark 可以运行一个`listForm`命令来查看所有的事务日志文件，快速找到最新的检查点文件，然后只处理后面的哪些 JSON 文件。


## 处理并发读写

答案很简单，基于 Spark，Delta Lake 引入了 `优化并发控制`。

## 什么是优化并发控制 Optimistic Concurrency Control

优化并发控制是一种处理并发事务的方法，它假定不同用户的事务可以不冲突的提交给表。因为它只处理数据很少的字节，所以它难以置信的快，
这就提供了一种让用户工作在数据不同部分的可能，并且允许他们有序的完成不冲突的事务。

就像我们在玩儿拼图玩具一样。只要我们都在处理不同的部分（你在处理转角、我在处理边），就没有可能我们不会更快的完成拼图。只有我们在同时
处理相同的片段时候，才会产生冲突。这就是优化并发控制。

当然即使是优化并发控制，也有可能两个用户同时处理一小份数据。Delta Lake 为这种情况有一个专门的协议。

## 处理冲突

为了提供 ACID 事务，Delta Lake 有一个协议指出提交应该如何组织顺序，以及确定在两个或者多个提交同时发生时应当如何处理。Delta Lake 实现
了一个互斥规则来处理这些场景，然后尝试去处理冲突。 



- https://databricks.com/blog/2019/08/21/diving-into-delta-lake-unpacking-the-transaction-log.html
- https://github.com/delta-io/delta/blob/master/PROTOCOL.md
