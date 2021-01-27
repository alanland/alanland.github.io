---
title:  "How to set a default namespace for kubectl"
date:   2019-04-18 11:23:37
tags:   [kubernetes]
---

```sh
# 创建一个context
$ kubectl config set-context loghub --namespace=loghub
Context "kube-cluster-ctx" created.

# 使用context
$ kubectl config use-context loghub
Switched to context "kube-cluster-ctx".
```

```
kubectl config set current-context loghub
```

```sh
# 其他命令
kubectl config view

```

--- 

- https://stuff.21zoo.com/posts/kubectl-set-default-namespace/
- [官网文档](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)
