---
layout: post
title:  "TProfiler"
date:   2018-08-09 10:23:37 +0000
tags:   [java, tprofiler, profile]
author: Alan Wang
---

## 安装配置

```ini
#log file name
logFileName = tprofiler.log
methodFileName = tmethod.log
samplerFileName = tsampler.log

#basic configuration items
startProfTime = 9:00:00 # 开始时间
endProfTime = 23:00:00 # 结束时间
eachProfUseTime = 5
eachProfIntervalTime = 50
samplerIntervalTime = 20
port = 30000 # 启动端口
debugMode = false
needNanoTime = false
ignoreGetSetMethod = true

#file paths
logFilePath = ${user.home}/logs/${logFileName}
methodFilePath = ${user.home}/logs/${methodFileName}
samplerFilePath = ${user.home}/logs/${samplerFileName}

#include & excludes items
excludeClassLoader = org.eclipse.osgi.internal.baseadaptor.DefaultClassLoader
# 要监控的包
includePackageStartsWith = com.caucho;com.defonds;com.fasterxml;com.sun.jersey;com.sun.jmx;org.apache;org.codehaus;org.jdbcdslog;org.mybatis;org.quartz;org.springframework
excludePackageStartsWith = com.taobao.sketch;org.apache.velocity;com.alibaba;com.taobao.forest.domain.dataobject
```

## 使用

JVM应用启动参数：

```sh
-javaagent:/home/ic/tprofiler/tprofiler.jar -Dprofile.properties=/home/ic/tprofiler/profile.properties
```

Tomcat的话，修改`catalina.sh`:

```sh
JAVA_OPTS=" -javaagent:/home/ic/tprofiler/tprofiler.jar -Dprofile.properties=/home/ic/tprofiler/profile.properties"
```

分析tsampler.log采样文件，输出method.log与thread.log两文件

```sh
java -cp tprofiler.jar com.taobao.profile.analysis.SamplerLogAnalysis  /home/ic/logs/tsampler.log /home/ic/logs/method.log /home/ic/logs/thread.log
```

分析tprofiler.log采样文件，输出topmethod.log与topobject.log两文件，需要tmethod.log文件为输入

1. 首先生成tmethod.log文件(必需等到profile.properties文件中endProfTime属性定义的时间点结束后，才能生成，因此需人工提前生成)，由此命令

```sh
java -cp tprofiler.jar com.taobao.profile.client.TProfilerClient 127.0.0.1 50000 flushmethod    
```

2. 生成topmethod.log与topobject.log两文件，

```sh
java -cp tprofiler.jar com.taobao.profile.analysis.ProfilerLogAnalysis /home/ic/logs/tprofiler.log /home/ic/logs/tmethod.log /home/ic/logs/topmethod.log /home/ic/logs/topobject.log
```

## 启动停止

```sh
java -cp tprofiler.jar com.taobao.profile.client.TProfilerClient 127.0.0.1 50000 stauts
java -cp tprofiler.jar com.taobao.profile.client.TProfilerClient 127.0.0.1 50000 stop
java -cp tprofiler.jar com.taobao.profile.client.TProfilerClient 127.0.0.1 50000 start
```

## 文件格式
###topobject.log

```
方法信息 执行次数 平均执行时间 全部执行时间
sketch/compile/parser/node/PropertyExecutor:<init>:32 573 1 636
sketch/util/introspection/UberspectImpl:<init>:282 34 7 241
```

**实验时，文件没有写入内容。分析代码是方法名必需包括<init>，才会写入。**

### tprofiler.log

```
线程ID 线程栈深度 方法ID 方法执行时间
13        2       14558       6
```

### topmethod.log

```
方法信息     执行次数    平均执行时间       全部执行时间 
com/tcs/server/mpush/connect/MessageReceivedHandler:received:13613022 2472
com/tcs/server/mpush/connect/Login:validateToken:56682 138
com/tcs/server/mpush/connect/Login:sendOfflineMessage:112102 20
```

### method.log文件格式说明:
方法信息 采样过程中方法出现次数
```
org.quartz.simpl.SimpleThreadPool.getNextRunnable(SimpleThreadPool.java:428) 19728
org.quartz.simpl.SimpleThreadPool$WorkerThread.run(SimpleThreadPool.java:518) 19728
org.quartz.simpl.SimpleThreadPool.access$000(SimpleThreadPool.java:47) 19728
org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:51) 17558
```

### thread.log文件格式说明:

线程信息 采样过程中线程出现次数
```
56 DefaultQuartzScheduler_Worker-3 TIMED_WAITING 661
55 DefaultQuartzScheduler_Worker-2 TIMED_WAITING 661
60 DefaultQuartzScheduler_Worker-7 TIMED_WAITING 661
```

---

- [TProfiler GitHub](https://github.com/alibaba/TProfiler)
- [TProfiler.log的内容为空](https://github.com/alibaba/TProfiler/issues/33)
- [JVM 性能调优实战之：使用阿里开源工具 TProfiler 在海量业务代码中精确定位性能代码](https://blog.csdn.net/defonds/article/details/52605670)
- [](https://blog.csdn.net/wh0426/article/details/51994054)