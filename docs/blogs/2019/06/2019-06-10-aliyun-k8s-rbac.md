---
layout: post
title:  "Aliyun Kubernetes RBAC"
date:   2019-06-14 12:23:37 +0000
tags:   [aliyun, kubernetes]
author: Alan Wang
---

## 创建RAM子账户

## 子账户的AliyunCS授权

## 自定义授权策略

```json
{
  "Statement": [
    {
      "Action": "cs:Get*",
      "Effect": "Allow",
      "Resource": [
        "acs:cs:*:*:cluster/<yourclusterID>"
      ]
    }
  ],
  "Version": "1"
}
```



- https://help.aliyun.com/document_detail/119596.html?spm=5176.2020520152.0.0.49fd16dd5CAc5c
