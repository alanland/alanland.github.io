---
title:  "Container Disk Usage"
date:   2017-06-19 12:57:37
tags:   [docker, container]
categories: [DevOps]
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
