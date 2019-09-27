---
layout: post
title:  "Aliyun Kubernetes Ingress"
date:   2019-05-24 14:23:37 +0000
tags:   [kubernetes, lbs, ingress, aliyun]
author: Alan Wang
---

## 说明
1. 不指定SLB实例情况下系统会自动帮您生成一个公网SLB实例。
1. SLB实例默认前端监听端口为80（HTTP协议）和443（HTTPS协议）。
1. SLB实例HTTPS证书默认会初始化为第一个创建的Ingress配置的TLS证书，否则会初始化为系统默认证书；您可根据需要自行在SLB控制台上进行修改。
1. 当您指定使用已存在的SLB实例时，要求该SLB实例规格必须是性能保障型（支持ENI）；同时确保80和443端口当前没有其他服务使用。

### 指定 LoadBalancer
```
service.beta.kubernetes.io/alicloud-loadbalancer-id	
```

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: tomcat-ingress
  annotations:
    # 配置使用指定的SLB实例（SLB ID）
    service.beta.kubernetes.io/alicloud-loadbalancer-id: lb-xxxxxxxxxx            ##替换为你的SLB ID
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
spec:
  tls:
  - hosts:
    - bar.foo.com
    # 配置TLS证书
    secretName: cert-example
  rules:
  # 配置七层域名
  - host: bar.foo.com
    http:
      paths:
      # 配置Context Path
      - path: /
        backend:
          serviceName: tomcat
          servicePort: 8080
```




---
- [通过Ingress提供7层服务访问](https://help.aliyun.com/document_detail/86398.html)
- [Ingress 支持](https://help.aliyun.com/document_detail/86533.html)
- [Ingress功能实现灰度发布使用的Annotation](https://help.aliyun.com/document_detail/96470.html)
