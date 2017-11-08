---
layout: post
title:  "Nginx Websocket"
date:   2016-07-04 23:29:37 +0000
tags:   [nginx, websocket]
author: Alan Wang
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

---
END