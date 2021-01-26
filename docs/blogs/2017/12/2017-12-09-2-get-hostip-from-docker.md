---
layout: post
title:  "Get host Ip from docker"
date:   2017-12-09 14:23:37 +0000
tags:   [docker, macos]
author: Alan Wang
---

## MacOS
special Mac-only DNS name `docker.for.mac.localhost`

## Linux

```sh
/sbin/ip route|awk '/default/ { print $3 }'
```

- [Networking features in Docker for Mac](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds)
- [How to get the IP address of the docker host from inside a docker container](https://stackoverflow.com/questions/22944631/how-to-get-the-ip-address-of-the-docker-host-from-inside-a-docker-container)