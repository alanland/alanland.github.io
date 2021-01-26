---
title:  "Nginx/OpenResty: Rate Limit"
date:   2017-11-11 12:57:37 +0000
tags:   [ratelimite, nginx, openresty, lua]
categories: [DevOps]
---

## 手动方案

限制并发、下载传输速率, Nginx gonf:

```conf
location /download_internal/ {
    internal;
    send_timeout 10 s;
    limit_conn perserver 100;
    limit_rate 0 k;

    chunked_transfer_encoding off;
    default_type application/octet-stream;

    alias ../download/;
}
```

通过修改`limit_rate`的值，然后 `nginx -s reload`手动加载。


## 通过lua控制

```lua
location /download_internal/ {
    internal;
    send_timeout 10 s;
    limit_conn perserver 100;
    limit_rate 0 k;

    chunked_transfer_encoding off;
    default_type application/octet-stream;

    alias ../download/;
}
```

PS: ngx.var.limit_rate 限速是基于请求的，如果相同终端发起两个连接，那么终端的最大速度将是 limit_rate 的两倍，原文如下：

```
Syntax: limit_rate rate;
Default:
limit_rate 0;
Context: http, server, location, if in location

Limits the rate of response transmission to a client. The rate is specified in bytes per second. The zero value disables rate limiting. The limit is set per a request, and so if a client simultaneously opens two connections, the overall rate will be twice as much as the specified limit.
```



---

- [OpenResty 最佳实践 动态限速](http://wiki.jikexueyuan.com/project/openresty-best-practice/lua-limit.html)

---

