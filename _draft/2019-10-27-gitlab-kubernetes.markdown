---
layout: post
title:  "Gitlab CI Kubernetes"
date:   2019-10-24T16:46:42.992Z
tags:   [ngixn]
categories: [Cloud]
author: Alan Wang
---

### API URL
```sh
kubectl cluster-info | grep 'Kubernetes master' | awk '/http/ {print $NF}'
```
### CA certificate

List the secrets with `kubectl get secrets`, and one should named similar to
`default-token-xxxxx`. Copy that token name for use below.
Get the certificate by running this command:

```sh
kubectl get secret <secret name> -o jsonpath="{['data']['ca\.crt']}" | base64 --decode
```

default-token-pnndn

kubectl get secret default-token-pnndn -o jsonpath="{['data']['ca\.crt']}" | base64 --decode





----
- http://git.ittx.com.cn/help/user/project/clusters/index.md#add-existing-kubernetes-cluster