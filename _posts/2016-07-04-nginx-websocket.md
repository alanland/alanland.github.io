---
layout: post
title: Nginx Websocket
---

# Nginx with websocket and stomp

Nginx 1.9.2

```python
    location ~ /endpoint/ {
      proxy_pass http://xoms;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
      proxy_set_header Origin "";
    }
```