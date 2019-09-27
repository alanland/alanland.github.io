---
layout: post
title:  "Kubenetes 阿里云服务负载均衡内网IP"
date:   2019-05-21 11:23:37 +0000
tags:   [kubernetes, helm, aliyun]
author: Alan Wang
---

在使用Helm的默认模板创建Service的时候，修改`Service`类型为`LoadBalancer`，阿里云会创建一个外网的负载均衡。

如果要创建一个内网的负载均衡，需要如下配置Service：

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: "intranet"
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
  type: Loadbalancer
```

