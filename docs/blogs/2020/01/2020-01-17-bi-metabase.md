---
layout: post
title:  "Metabase"
date:   2020-01-17T21:07:46.680Z
tags:   [metabase, bi]
categories: [Tools]
author: Alan Wang
---

## Kubernetes 安装

```
k create ns bi
k ns bi
helm install --name metabase stable/metabase
```

```
export POD_NAME=$(kubectl get pods --namespace bi -l "app=metabase,release=metabase" -o jsonpath="{.items[0].metadata.name}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl port-forward --namespace bi $POD_NAME 8080:3000
```

## 使用

