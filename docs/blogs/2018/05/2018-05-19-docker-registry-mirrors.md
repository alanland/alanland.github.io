---
title:  "Docker registry mirrors"
date:   2018-05-19 14:23:37 +0000
tags:   [ubuntu, docker]
---

## Ubuntu
```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://gwu7r07s.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
