---
layout post
title  "Flask Gunicorn Nginx 部署"
date   2017-10-23 04:57:37 +0000
tags   [python, flask, supervisor]
author Alan Wang
---

## Gunicorn

```
pip3 install Gunicorn
```

```sh
BUILD_ID=DONTKILLME
gunicorn -D -w 4 -b 0.0.0.0:9900 app:app
```

### Gunicorn Logging

- http://docs.gunicorn.org/en/latest/settings.html#logging

### supervisord

```sh
[program:itms]
directory=/path/to/source
command = /path/to/gunicorn app_module:app -c /path/to/gunicorn_config.py
```

```sh
# 重启supervisor,让配置文件生效,然后启动itms进程
supervisorctl reload
supervisorctl start itms
```


### 配置文件 gunicorn_config.py

```python
# coding=utf-8
import sys
import os
import multiprocessing

path_of_current_file = os.path.abspath(__file__)
path_of_current_dir = os.path.split(path_of_current_file)[0]

_file_name = os.path.basename(__file__)

sys.path.insert(0, path_of_current_dir)


worker_class = 'sync'
workers = multiprocessing.cpu_count() * 2 + 1

chdir = path_of_current_dir

worker_connections = 1000
timeout = 30
max_requests = 2000
graceful_timeout = 30

loglevel = 'info'

reload = True
debug = False


bind = "%s:%s" % ("0.0.0.0", 8811)
pidfile = '%s/run/%s.pid' % (path_of_current_dir, _file_name)
errorlog = '%s/logs/%s_error.log' % (path_of_current_dir, _file_name)
accesslog = '%s/logs/%s_access.log' % (path_of_current_dir, _file_name)

```

## Nginx

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

Links:

- https://segmentfault.com/q/1010000003788857/a-1020000003790672

---
END

