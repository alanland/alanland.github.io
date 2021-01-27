---
title:  "Jenkins get current tag name"
date:   2018-11-16 16:29:37
tags:   [git, jenkins, ci]
---

前提是 HEAD is tagged

## for jenkins pipline: 
```sh
# sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
def foo = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
```


```groovy
sh "git tag --sort version:refname | tail -1 > version.tmp"
String tag = readFile 'version.tmp'
```

## for shell

```sh
sh=`git tag --sort version:refname | tail -1`
```

```sh
git describe --tags --long --dirty --always
```

```sh
# yields the tag name name if and only if HEAD is tagged
git tag --contains
```