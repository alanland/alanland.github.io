---
title: oauth2-proxy 使用
date: 2021-03-29
categories: [DevOps]
tags: [oauth2-proxy]
---

- 项目地址： https://github.com/oauth2-proxy/oauth2-proxy
- 文档地址： https://oauth2-proxy.github.io/oauth2-proxy/docs/

配置过程中经常出现 403 等错误，最终的配置如下：

```sh
./oauth2-proxy --provider=gitlab \
        --oidc-issuer-url=https://git.com \
        --client-id=d2c4a21ae \
        --client-secret=e34c2d566 \
        --cookie-secret=0Wbf2lcF \
        --email-domain=* \
        --upstream=http://localhost:8080 \
        --http-address=0.0.0.0:4180 \
        --cookie-secure=true \
        --whitelist-domain=* \
        --cookie-domain=* \
        --redirect-url=http://127.0.0.1:4180/oauth2/callback \
        --skip-provider-button=false \
        --set-xauthrequest=true \
        --skip-auth-preflight=false \
        --ssl-insecure-skip-verify \
        --pass-access-token=true \
        --pass-authorization-header=true \
        --set-authorization-header=true

```

生成 cookie secure 可以使用：
```sh
$ sha256sum -c sha256sum.txt 2>&1 | grep OK
oauth2-proxy-x.y.z.linux-amd64: OK
```