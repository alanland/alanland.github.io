---
layout post
title  "Flask Gunicorn Nginx 部署"
date   2017-10-23 04:57:37 +0000
tags   [python]
author Alan Wang
---

pip3 install Gunicorn

```sh
BUILD_ID=DONTKILLME
gunicorn -D -w 4 -b 0.0.0.0:9900 app:app
```

```conf
    upstream itms {
        server localhost:9900;
    }

    # itms
    server {
      listen       30012;
      server_name  localhost;
      root  /root/app/itms-client/dist;

      location ~ /rest/ {
               proxy_pass http://itms;
      }
      location ~ /opt/ {
                 proxy_pass http://itms;
      }

      location ~ ^/(WEB-INF)/ {
        deny all;
      }
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
        root   html;
      }
    }
```

---
END

