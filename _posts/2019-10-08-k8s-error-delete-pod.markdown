---
layout: post
title:  "Kubernetes Error delete Pod"
date:   2019-10-08 10:58:00 +0000
tags:   [kubernetes, aliyun]
categories: [Cloud]
author: Alan Wang
---

Aliyun 的 Kubernetes 测试环境 CI 更新的时候，卡住了。 

开始以为是服务器资源不足，后来查看控制台 Pod 的状态：
```
error killing pod: [failed to "KillContainer" for "istio-proxy" with KillContainerError: "rpc error: code = Unknown desc = operation timeout: context deadline exceeded" , failed to "KillContainer" for "wms" with KillContainerError: "rpc error: code = Unknown desc = operation timeout: context deadline exceeded" , failed to "KillPodSandbox" for "35ced948-e3af-11e9-aa25-eed95802c543" with KillPodSandboxError: "rpc error: code = DeadlineExceeded desc = context deadline exceeded" ]
```

命令行查看

```sh
~ kgp
NAME                                READY   STATUS        RESTARTS   AGE
wms-6d7bcb44f6-q2qbx                1/2     Terminating   0          7d10h
```

执行
```sh
kdelp xxx
```
删除 Pod，Deployment 和 Service 均无法删除。
 
使用命令
```sh
kdelp xxx --now
```
也不行。

最后执行 
```sh
kdelp xxx --grace-period=0 --force
```

停止的 Pod 被删除掉了。


重新 apply 配置，Pod 的最后5次事件是：

```
Error creating load balancer (will retry): failed to ensure load balancer for service loghub/wms: update backend servers: error ensure vgroup: Aliyun API Error: RequestId: 62C1B690-59F7-46B4-8B45-46080E30A129 Status Code: 400 Code: BackendServerRelatedInstanceNumerOverLimit Message: There is backend server has reached to the quota limit number of load balancers that it could be related to.. k8s/32510/wms/loghub/clusterid
service-controller
```

大致意思是 load balancer 监听的后端已经到了上限，不能再添加了。（

随便搜了下，没有找个类似错误，在阿里云负载均衡的 [API 错误](https://error-center.alibabacloud.com/status/product/Slb) 里面也没有搜索到这个错误。

进入阿里云负载均衡控制台](https://slb.console.aliyun.com/slb/cn-hangzhou/slbs) 找到最可以的那一个

![](/assets/images/2019-10-08-k8s-error-delete-pod/aliyun-lbs-listeners.png)

删除了一个不可用的监听，再次 Apply Kubernetes 对象，成功了。


看了一下帮助，也没有找到


---

参考：

- https://stackoverflow.com/questions/50336665/how-do-i-force-delete-kubernetes-pods/50338057


