---
layout: post
title:  "Ubuntu - Remove SSH key from known_hosts"
date:   2018-05-12 14:33:37 +0000
tags:   [ubuntu, ssh]
author: Alan Wang
---

## 删除自定主机
```
ssh-keygen -R "hostname"
```

## 删除全部
```
rm -f .ssh/known_hosts
```

## 忽略 know_hosts
修改 `~/.ssh/config`，增加：

```ruby
StrictHostKeyChecking no
UserKnownHostsFile /dev/null
```
