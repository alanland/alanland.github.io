---
layout: post
title:  "Gradle Dependency Types"
date:   2019-09-04 12:15:37 +0000
tags:   [gradle]
author: Alan Wang
---


- compile
- testCompile
- androidTestcompile
- debugCompile
- releaseCompile
- implementation
- testImplementation
- androidTestImplementation
- debugImplementation
- releaseImplementation
- provided
- api

## compile

- 依赖传递
- 编译时打包

## testCompile

- 依赖传递
- 源码不打包，测试包才打包，

## implementation

Gradle 4.1 增加

- 依赖不传递

## provided

- 参与编译，不参与打包

## api

Gradle 4.1 新增

替代 Compile

