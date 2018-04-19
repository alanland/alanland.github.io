---
layout: post
title:  "Kubernetes Dashboard UI"
date:   2018-04-19 14:23:37 +0000
tags:   [kubernetes, k8s]
author: Alan Wang
---

运行命令，deploy：
```sh
$ kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
secret "kubernetes-dashboard-certs" created
serviceaccount "kubernetes-dashboard" created
role "kubernetes-dashboard-minimal" created
rolebinding "kubernetes-dashboard-minimal" created
deployment "kubernetes-dashboard" created
service "kubernetes-dashboard" created
```

执行：
```sh
$ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

访问：
```
http://127.0.0.1:8001/ui
```

自动跳转到：
```
http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/
```
```
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {
    
  },
  "status": "Failure",
  "message": "no endpoints available for service \"https:kubernetes-dashboard:\"",
  "reason": "ServiceUnavailable",
  "code": 503
}
```

编辑这个文件：
```
$ kubectl -n kube-system edit service kubernetes-dashboard
```

看着没啥问题。


- https://stackoverflow.com/questions/38411595/kubernetes-dashboard-keeps-pending-with-message-no-endpoints-available-for-serv

The other possibility is that you have no resources in the cluster and the scheduler fails to schedule the Dashboard UI. If this is true you can see this in cluster events (`kubectl get events --namespace=kube-system`).

根据上面解答：

```sh
$ kubectl get events --namespace=kube-system
LAST SEEN   FIRST SEEN   COUNT     NAME                                                     KIND      SUBOBJECT                               TYPE      REASON    SOURCE                        MESSAGE
43m         1h           14        kubernetes-dashboard-5bd6f767c7-tfz6k.1526c8d91d9b3023   Pod       spec.containers{kubernetes-dashboard}   Warning   Failed    kubelet, docker-for-desktop   Failed to pull image "k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.3": rpc error: code = Unknown desc = Error response from daemon: Get https://k8s.gcr.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
28m         1h           262       kubernetes-dashboard-5bd6f767c7-tfz6k.1526c8d9549de21b   Pod       spec.containers{kubernetes-dashboard}   Normal    BackOff   kubelet, docker-for-desktop   Back-off pulling image "k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.3"
3m          1h           364       kubernetes-dashboard-5bd6f767c7-tfz6k.1526c8d9549e13de   Pod       spec.containers{kubernetes-dashboard}   Warning   Failed    kubelet, docker-for-desktop   Error: ImagePullBackOff
```

发现下载image失败，手动下载：
```sh
$ docker pull k8s.gcr.io/kubernetes-dashboard-amd64:v1.8.3
```

重启 dashboard container,访问：`http://127.0.0.1:8001/ui`，出现画面。

`Skip` 账户的配置，直接进入dashboard。

## [阿里云加速](https://dev.aliyun.com/detail.html?spm=5176.100239.blogcont71037.14.mqVzEj&repoId=12625)

```
docker pull registry.cn-hangzhou.aliyuncs.com/google-containers/hyperkube-amd64
```

## Docker Demos

Docker 同样为我们提供了简单的应用示范，可以直接使用如下的 Docker Compose 配置文件:

```sh
$ mkdir -p web/static
$ echo hello > web/static/index.html
```

```yml
version: '3.3'

services:
  web:
    build: web
    image: dockerdemos/lab-web
    volumes:
     - "./web/static:/static"
    ports:
     - "80:80"

  words:
    build: words
    image: dockerdemos/lab-words
    deploy:
      replicas: 5
      endpoint_mode: dnsrr
      resources:
        limits:
          memory: 16M
        reservations:
          memory: 16M

  db:
    build: db
    image: dockerdemos/lab-db
```

然后使用 stack 命令创建应用栈：

```sh
$ docker stack deploy --compose-file stack.yml demo

Stack demo was created
Waiting for the stack to be stable and running...
 - Service web has one container running
```

查看pods：

```sh
$ kubectl get pods
$ kubectl get deployments
$ kubectl get services
```

移除：
```sh
$ docker stack remove demo
$ kubectl delete deployment kubernetes-dashboard --namespace kube-system
```

---
- [Deploying the Dashboard UI](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui)
- [Dashboard Installation](https://github.com/kubernetes/dashboard/wiki/Installation#recommended-setup)
- [Github Dashboard](https://github.com/kubernetes/dashboard/blob/master/README.md#getting-started)
- [基于 Docker for MAC 的 Kubernetes 本地环境搭建与应用部署](https://segmentfault.com/a/1190000012850396)
