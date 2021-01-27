---
title:  "Aliyun Kubernetes 使用 Nas 作为 PersistentVolume "
date:   2019-11-08T11:21:07.449Z
tags:   [aliyun, nas, kubernetes, pv, pvc]
categories: [DevOps]
---

阿里云 Kubernetes 服务支持 Nas,OSS,云盘作为 PV, 但是 OSS 有一些限制, 比如无法进行`chmod`操作, 有些镜像比如 redis 在镜像中就包含了
chmod 操作, 所以无法使用 NAS.

使用 NAS 作为 PV 时, 首先创建 Nas 存储, 购买存储包, 挂载, 然后声明对象即可. 

创建 PV, PVC 使用 PVC 的 API 如下: 

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  finalizers:
    - kubernetes.io/pv-protection
  labels:
    alicloud-pvname: pv-test.redis-nas-static.data
  name: pv-test.redis-nas-static.data
spec:
  accessModes:
    - ReadWriteMany
  capacity:
    storage: 20Gi
  flexVolume:
    driver: alicloud/nas
    options:
      modeType: non-recursive
      path: /k8s/mongo/data
      server: xxxx.cn-hangzhou.nas.aliyuncs.com
      vers: '3'
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nas

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  annotations:
    pv.kubernetes.io/bind-completed: 'yes'
    pv.kubernetes.io/bound-by-controller: 'yes'
  finalizers:
    - kubernetes.io/pvc-protection
  name: pvc-test.redis-nas-static.data
  namespace: test
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 20Gi
  selector:
    matchLabels:
      alicloud-pvname: pv-test.redis-nas-static.data
  storageClassName: nas
  volumeName: pv-test.redis-nas-static.data


---
apiVersion: v1
kind: Service
metadata:
  name: redis-nas-static
  namespace: test
  labels:
    app: redis
    tier: backend
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: intranet
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
    service.beta.kubernetes.io/alicloud-loadbalancer-slb-network-type: vpc
spec:
  type: ClusterIP # ClusterIP, NodePort, LoadBalancer
  selector:
    app: redis-nas-static
    tier: backend
  ports:
    - port: 6379
      protocol: TCP
      targetPort: 6379


---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-nas-static
  namespace: test
  labels:
    app: redis-nas-static
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis-nas-static
  template:
    metadata:
      labels:
        app: redis-nas-static
        tier: backend
    spec:
      volumes:
        - name: test-redis
          persistentVolumeClaim:
            claimName: pvc-test.redis-nas-static.data
      containers:
        - name: redis
          image: redis:5-alpine
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
          ports:
            - containerPort: 6379
          volumeMounts:
            - mountPath: "/data"
              name: test-redis
```


动态创建 PVC 示例如下, 但是 StatefulSet 查看时不方便,. 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis-dynamic
  namespace: test
  labels:
    app: redis
    tier: backend
  annotations:
    service.beta.kubernetes.io/alicloud-loadbalancer-address-type: intranet
    service.beta.kubernetes.io/alicloud-loadbalancer-force-override-listeners: "true"
    service.beta.kubernetes.io/alicloud-loadbalancer-slb-network-type: vpc
spec:
  type: ClusterIP # ClusterIP, NodePort, LoadBalancer
  selector:
    app: redis-dynamic
    tier: backend
  ports:
    - port: 6379
      protocol: TCP
      targetPort: 6379

---
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: redis-dynamic
  namespace: test
  labels:
    app: redis-dynamic
spec:
  serviceName: redis-dynamic
  replicas: 1
  selector:
    matchLabels:
      app: redis-dynamic
  volumeClaimTemplates:
    - metadata:
        name: data-redis-data
      spec:
        accessModes:
          - ReadWriteMany
        storageClassName: alicloud-nas
        resources:
          requests:
            storage: 2Gi
  template:
    metadata:
      labels:
        app: redis-dynamic
        tier: backend
    spec:
      volumes:
        - name: test-redis
          persistentVolumeClaim:
            claimName: nas-test-redis
      containers:
        - name: redis
          image: redis:5-alpine
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
          ports:
            - containerPort: 6379
          volumeMounts:
            - mountPath: "/data"
              name: test-redis-data

```
