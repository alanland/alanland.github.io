---
layout: post
title:  "Linux Mac Address"
date:   2017-05-09 14:07:37 +0000
tags: [ linux ]
author: Alan Wang
---
Linux 上查看Mac地址：

```
ifconfig <Interface ex:eth0,eth1> | grep -o -E '([[:xdigit:]]{1,2}:){5}[[:xdigit:]]{1,2}'

# Also you can get MAC for all interface as follows
cat /sys/class/net/*/address

# For particular interface like for eth0
cat /sys/class/net/eth0/address
```

---
END
