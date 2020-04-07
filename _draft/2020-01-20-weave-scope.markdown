---
layout: post
title:  "WeaveScope"
date:   2020-01-20T19:50:04.396Z
tags:   [redash, bi]
categories: [Tools]
author: Alan Wang
---

https://www.weave.works/docs/scope/latest/installing/#k8s

```shell script
kubectl port-forward -n weave "$(kubectl get -n weave pod --selector=weave-scope-component=app -o jsonpath='{.items..metadata.name}')" 4040
```



