---
title:  "semaphore"
date:   2017-09-14 14:57:37 +0000
tags:   [ansible, semaphore]
categories: [DevOps]
---

写程序遇到问题,想看下源码,才发现这个是用`go`写的,继续转向google.

- Copy download link for your OS from Releases page
- (linux) curl -L <link> > /usr/bin/semaphore
- Run semaphore -setup
- Continue setup (see below for more detail)


 You are all setup Alan!
 Re-launch this program pointing to the configuration file

./semaphore -config /home/alan/workspace/ansible/semaphore/semaphore_config.json

 To run as daemon:

nohup ./semaphore -config /home/alan/workspace/ansible/semaphore/semaphore_config.json &

 You can login with awang@ittx.com.cn or alan.


- http://dockone.io/article/1899
---
END
