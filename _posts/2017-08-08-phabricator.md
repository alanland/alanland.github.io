---
layout: post
title:  "Mongo Gui Tools"
date:   2017-08-08 11:57:37 +0000
tags:   [code-review, phabricator]
author: Alan Wang
---

使用 Compose:

```yml
version: '2'

services:
  mariadb:
    image: 'bitnami/mariadb:latest'
    container_name: mariadb
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
    volumes:
      - mariadb_data:/bitnami
  phabricator:
    image: bitnami/phabricator:latest
    container_name: phabricator
    depends_on:
      - mariadb
    ports:
      - '7777:80'
      - '443:443'
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
      - PHABRICATOR_USERNAME=alan
      - PHABRICATOR_PASSWORD=wang
    volumes:
      - phabricator_data:/bitnami

volumes:
  mariadb_data:
    driver: local
  phabricator_data:
    driver: local
```

如果报错:

```
Site Not Found

This request asked for "/" on host "alan.io", but no site is configured which can serve this request.
```

进入docker:
```
$ docker exec -it phabricator bash
$ /opt/bitnami/phabricator/bin/config set phabricator.base-uri 'http://alan.io:7777'
```

刷新网页,登录:

![](/assets/images/2017-08-08-phabricator/dashboard.png)


---
Links:
- https://hub.docker.com/r/bitnami/phabricator/
- http://www.jianshu.com/p/b5514474d079
- https://stackoverflow.com/questions/35628144/this-request-asked-for-on-host-example-com-but-no-site-is-configured-whic

---
END
