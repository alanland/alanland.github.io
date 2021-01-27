---
title:  "Aliyun Kubernetes LBS"
date:   2019-05-24 12:23:37
tags:   [kubernetes, lbs, aliyun]
categories: [DevOps]
---

## 使用已有的内网 SLB

需要指定三个annotation。注意修改成您自己的 Loadbalancer-id。

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: "intranet"
    service.beta.kubernetes.io/alicloud-loadbalancer-id: "your-loadbalancer-id"
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true" 
  labels:
    run: nginx
  name: nginx
  namespace: default
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    run: nginx
  sessionAffinity: None
  type: LoadBalancer
```

## 创建HTTP类型的负载均衡

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-protocol-port: "http:80"
  name: nginx
  namespace: default
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    run: nginx
  type: LoadBalancer
```

---
- [通过负载均衡（Server Load Balancer）访问服务](https://help.aliyun.com/document_detail/86531.html)
- [Aliyun SLB参数](https://help.aliyun.com/document_detail/53759.html)
