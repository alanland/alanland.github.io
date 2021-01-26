---
title:  "Docker Registry"
date:   2016-01-31 23:29:37 +0000
tags:   [docker]
---

主页上的介绍：

[Docker Registry](https://www.docker.com/products/docker-registry)  is an open source application dedicated to the storage and distribution of your Docker images.

## 运行 docker registry v2.
```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

## Tag image 到你的 registry
```
docker tag ubuntu localhost:5000/ubuntu
#or some other name
docker tag ubuntu localhost:5000/ubuntu_new_image_name
```
`localhost:5000` 是你的本机地址.

用 `docker images` 命令来查看结果


## push to your registry
```
docker push localhost:5000/ubuntu
```

## pull in other machine
```
docker pull 182.168.xxx.xxx:5000/ubuntu_new_image_name
```

## stop registry
```
docker stop registry && docker rm -v registry
```

## 启动参数
### 存储位置

```
docker run -d -p 5000:5000 --restart=always --name registry \
  -v `pwd`/data:/var/lib/registry \
  registry:2
```

`pwd/data` 就是你要本机存储的位置。

### 配置文件

指定本地路径（如 `/home/user/registry-conf` ）下的配置文件

```
sudo docker run -d -p 5000:5000 \
   -v /home/user/registry-conf:/registry-conf \
   -e DOCKER_REGISTRY_CONFIG=/registry-conf/config.yml \
   registry
```

---
END