---
title:  "Docker registry china mirror"
date:   2017-06-26 14:27:37
tags:   [docker]
categories: [DevOps]
---

`/etc/default/docker`

```
DOCKER_OPTS="-g /var/lib/docker --registry-mirror=https://mirror-hz.acs.aliyun.com "
```

## aws

`vi /etc/sysconfig/docker`


```shell script
# The max number of open files for the daemon itself, and all
# running containers.  The default value of 1048576 mirrors the value
# used by the systemd service unit.
DAEMON_MAXFILES=1048576

# Additional startup options for the Docker daemon, for example:
# OPTIONS="--ip-forward=true --iptables=true"
# By default we limit the number of open files per container
OPTIONS="--default-ulimit nofile=1024:4096 --registry-mirror=https://4t1i3u2a.mirror.aliyuncs.com "

# How many seconds the sysvinit script waits for the pidfile to appear
# when starting the daemon.
DAEMON_PIDFILE_TIMEOUT=10
```

https://gkhkf8gb.mirror.aliyuncs.com

下面转自 Xinkun Blog:

## dockerhub (docker.io)	
`dockerhub.azk8s.cn`	
- dockerhub.azk8s.cn/<repo-name>/<image-name>:<version>	
- dockerhub.azk8s.cn/microsoft/azure-cli:2.0.61 dockerhub.azk8s.cn/library/nginx:1.15

## gcr.io	
`gcr.azk8s.cn`	
- gcr.azk8s.cn/<repo-name>/<image-name>:<version>	
- gcr.azk8s.cn/google_containers/hyperkube-amd64:v1.13.5

## quay.io	
`quay.azk8s.cn`	
- quay.azk8s.cn/<repo-name>/<image-name>:<version>	
- quay.azk8s.cn/deis/go-dev:v1.10.0

Note: `k8s.gcr.io` would redirect to `gcr.io/google-containers`, following image urls are identical:

- k8s.gcr.io/pause-amd64:3.1
- gcr.io/google_containers/pause-amd64:3.1

---
END

- https://xuxinkun.github.io/2019/06/11/cn-registry/
- https://github.com/gotok8s/gotok8s
- http://mirror.azure.cn/
- [Docker Registry Proxy Cache 帮助](http://mirror.azure.cn/help/docker-registry-proxy-cache.html)
- [Azure China container registry proxy](https://github.com/Azure/container-service-for-azure-china/tree/master/aks#22-container-registry-proxy)
