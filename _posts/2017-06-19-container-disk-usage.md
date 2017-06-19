---
layout: post
title:  "Count Source Code Lines"
date:   2017-06-19 12:57:37 +0000
tags:   [docker, container]
author: Alan Wang
---
```shell
docker ps -s
```

After docker 1.13.0:
```shell
docker system df
docker system df -v
```

Other command: 
```shell
du -d 2 -h /var/lib/docker/devicemapper | grep `docker inspect -f "{{.Id}}" <container_name>`
```

---
END
