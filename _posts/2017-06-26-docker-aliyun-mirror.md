---
layout: post
title:  "Docker aliyun mirror"
date:   2017-06-26 14:27:37 +0000
tags:   [docker]
author: Alan Wang
---

`/etc/default/docker`

```
DOCKER_OPTS="-g /var/lib/docker --registry-mirror=https://mirror-hz.acs.aliyun.com "
```

---
END
