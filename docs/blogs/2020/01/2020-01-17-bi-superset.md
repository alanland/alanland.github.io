---
title:  "Bi: Superset"
date:   2020-01-17T22:14:46.424Z
tags:   [superset, bi]
categories: [Tools]
---

## Kubernetes 安装

```
k create ns bi
k ns bi
git clone https://github.com/digitalist-se/redash-helm.git --depth=1
cd redash-helm
helm dep up
helm install --name=redash .
```

```
export POD_NAME=$(kubectl get pods --namespace bi -l "app.kubernetes.io/name=redash,app.kubernetes.io/instance=redash" -o jsonpath="{.items[0].metadata.name}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl port-forward $POD_NAME 8080:5000
```

## 使用


