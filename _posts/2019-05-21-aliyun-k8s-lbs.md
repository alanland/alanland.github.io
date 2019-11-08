---
layout: post
title:  "Kubenetes 阿里云服务负载均衡内网IP"
date:   2019-05-21 11:23:37 +0000
tags:   [kubernetes, helm, aliyun]
author: Alan Wang
---

在使用Helm的默认模板创建Service的时候，修改`Service`类型为`LoadBalancer`，阿里云会创建一个外网的负载均衡。

通过工单咨询阿里云的工程师, 如果要改成内网的 IP,

首先要删除原有的`kube-system/nginx-ingress-lb` Service,(在nginx-ingress-controller的deployment的yaml里面指定),
这个服务的 IP 就是之后 Ingress 配置的 IP.

删除后这个服务后,集群默认域名不能正常使用，因为集群默认域名是解析到nginx-ingress-lb对应的slb上的，只能是公网地址.

然后重建这个 Service:

```yaml
# aliyun ingress服务
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: intranet
    service.beta.kubernetes.io/alicloud-loadbalancer-id: "lb-xxxxx" # 你希望使用的 SLB
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
  labels:
    app: nginx-ingress-lb
  name: nginx-ingress-lb
  namespace: kube-system
spec:
  externalTrafficPolicy: Local
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 80
    - name: https
      port: 443
      protocol: TCP
      targetPort: 443
  selector:
    app: ingress-nginx
  sessionAffinity: None
  type: LoadBalancer
```

之后再创建的 Ingress 配置就会使用内网这个新 IP 了,


比如新服务:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: "intranet"
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
  type: Loadbalancer
```

