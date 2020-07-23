---
title: Kong HMAC Authentication 插件
date: 2020-07-21T12:44:07.160Z
categories:
 - 网关
tags:
 - kong
---

Kong 提供了多种认证的插件，其中就包括 [HMAC-Authentication](https://docs.konghq.com/hub/kong-inc/hmac-auth/)。

hmac-auth 几个要注意的配置项：

- `config.clock_skew`： 默认3000秒，用来防止重放攻击。请求的时间戳和服务器时间相隔超过这个时间，客户端会提示 invalid date。
  - docker 环境运行 kong 的时候要特别主意时区
- `config.validate_request_body`： 默认 false 
- `config.enforce_headers`：HTTP 签名的必须的头信息列表
- `config.algorithms`： 算法。比如 hmac-sha256

请求的格式：

```sh
curl -i -X GET http://localhost:8000/requests \
      -H "Host: hmac.com" \
      -H "Date: Thu, 22 Jun 2017 17:15:21 GMT" \
      -H 'Authorization: hmac username="alice123", algorithm="hmac-sha256", headers="date request-line", signature="ujWCGHeec9Xd6UD2zlyxiNMCiXnDOWeVFMu5VeRUxtw="'
```

其中 date 必须是GMT格式的。

signature 的算法：
```sh
signing_string="date: Thu, 22 Jun 2017 17:15:21 GMT\nGET /requests HTTP/1.1"
digest=HMAC-SHA256(<signing_string>, "secret")
base64_digest=base64(<digest>)
```

如果 headers 为 `date host request-line`，那么 signing string 为：
```sh
date: Thu, 22 Jun 2017 17:15:21 GMT
host: hmac.com
GET /requests HTTP/1.1
```

:::tip
header key 为小写，然后冒号空格，值后面加回车。最后一行后面不能跟回车。
:::


如果有 request-line，那么 signing string 后拼接 http request line。

如果 hmac-auth 配置里面 header 不要求 request-line，那么 signing string 就是：

```sh
date: Thu, 22 Jun 2017 17:15:21 GMT
```

HMAC-SHA 可以通过这个[在线工具](https://www.devglan.com/online-tools/hmac-sha256-online) 来计算。

:::tip 关于签名
一般我们要求 `host`，`date`，`request-line` 来进行签名。要求高的话，就开启 request-body 校验。
:::

:::tip HMAC Auth的优点
- 不传播密码
- 参数加密，防止敏感信息
- HMAC 摘要防篡改
- 加入时间戳，防止重放攻击
:::