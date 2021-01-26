+
---
title:  "Jekins build and upload with git tag version"
date:   2018-12-14 11:23:37 +0000
tags:   [git, gradle, jenkins, ci]
categories: [DevOps]
---

如何使用git的tag版本号作为项目的版本号进行打包和发布：

1. 首先安装 [Git+Parameter+Plugin](https://wiki.jenkins.io/display/JENKINS/Git+Parameter+Plugin)
1. 配置 `This project is parameterized`，使用`TAG`作为参数和变量名，打开Advanced，进行排序等设置
1. 通过`${TAG#*v}`tag名称作为版本号（v2.1.5 => 2.1.5)
1. 构建脚本如下:
    ```sh
    gradle clean upload -x test --refresh-dependencies  -PprojectVersion=${TAG#*v} 
    ```
