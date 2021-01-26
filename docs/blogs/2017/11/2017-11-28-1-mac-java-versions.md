---
title:  "Multiple Java Environments on MacOS"
date:   2017-11-28 10:23:37 +0000
tags:   [java, mac]
---

命令行下输入`java -version`如果没有安装就会提示去Oracle的网站下载安装。

安装后 `which java` 可以看到 `/usr/bin/java` 命令已经存在，

实际的安装路径，

```sh
# JDK 1.6：
/System/Library/Java/JavaVirtualMachines/1.6.0.jdk
 
# JDK 1.7&1.8:
/Library/Java/JavaVirtualMachines/jdk1.7.0_45.jdk
/Library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk
```

可以修改`~/.bash_profile`配置环境变量，然后`source ~/.bash_profile`生效。

```
# Mac默认 JDK 6（Mac默认自带了一个jdk6版本）  
export JAVA_6_HOME=`/usr/libexec/java_home -v 1.6`  
# 设置 JDK 7  
export JAVA_7_HOME=`/usr/libexec/java_home -v 1.7`  
# 设置 JDK 8  
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8`  
# 设置 JDK 9  
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.9`  
  
#默认JDK 6  
export JAVA_HOME=$JAVA_8_HOME  
  
#alias命令动态切换JDK版本  
alias jdk6="export JAVA_HOME=$JAVA_6_HOME"  
alias jdk7="export JAVA_HOME=$JAVA_7_HOME"  
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"  
```



---

- http://blog.csdn.net/tianxiawuzhei/article/details/48263789