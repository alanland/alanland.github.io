---
layout: post
title:  "Tomcat: Zip exception: Invalid end header"
date:   2017-11-07 04:57:37 +0000
tags:   [tomcat, vpn]
author: Alan Wang
---

```
Caused by: java.util.zip.ZipException: invalid END header (bad central directory offset)
	at java.util.zip.ZipFile.open(Native Method)
	at java.util.zip.ZipFile.<init>(ZipFile.java:219)
	at java.util.zip.ZipFile.<init>(ZipFile.java:149)
	at java.util.jar.JarFile.<init>(JarFile.java:166)
	at java.util.jar.JarFile.<init>(JarFile.java:103)
	at org.apache.catalina.webresources.JarResourceSet.initInternal(JarResourceSet.java:88)
	... 17 more
```

经过检查服务的`war`和build的MD5不一样：

```
$ md5sum wms.zip | cut -d ' ' -f1
829e8207a5a4efaa62c685001551ea78
```

```
$ md5sum xwms.zip | cut -d ' ' -f1
617cb46b7ce633c0727e40866221d5dd
```

可以确定下载或者上传的文件不一致，测试发现使用vpn下载文件就会出错。


---
END

