---
title:  "How to Clear Nginx Cache"
date:   2019-06-10 12:13:37 +0000
tags:   [nginx]
---

## Clear Nginx Proxy cache

default `/var/nginx/cache/`

## Cleaning the browser cache by header input

```ruby
location ~* ^.+\.(css|js|jpg|gif|png|txt|ico|swf|xml)$ {
  root /usr/local/nginx/htdocs;
  expires modified +2d;
}
```

```bash
nginx restart
```

## Disable “sendfile”



---
- https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/#limiting-or-disabling-caching
- [Limiting or Disabling Caching](https://www.techietown.info/2017/03/how-to-deleteclear-nginx-cache/)
- [Purging Content From The Cache](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/#purging-content-from-the-cache)