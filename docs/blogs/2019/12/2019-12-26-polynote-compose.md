---
layout: post
title:  "Polynote Compose"
date:   2019-12-26T19:52:25.148Z
tags:   [docker]
categories: [Tools]
author: Alan Wang
---

Scala 的  Web Notebook 工具.

`docker-compose.yml`
```yaml
version: "3.4"
services:
  polynote:
    image: polynote/polynote:0.2.14-2.12-spark2.4
    environment:
      - PYSPARK_ALLOW_INSECURE_GATEWAY=1
    volumes:
      - .:/opt/config
      - ./notebooks:/opt/notebooks
    ports:
      - "8192:8192"
      - "4040-4050:4040-4050"
    entrypoint: ['./polynote/polynote.py', "--config", "/opt/config/config.yml"]
```

`config.yml`
```yaml
listen:
  host: 0.0.0.0

storage:
  dir: /opt/notebooks
  mounts:
    examples:
      dir: examples
```