---
title:  "Docker ERROR: could not find an available, non-overlapping IPv4 address pool among the defaults to assign to the network"
date:   2017-12-11 12:23:37 +0000
tags:   [springboot, metrics]
---

I've seen it suggested docker may be at its maximum of created networks. The command 

```sh
docker network prune
```

can be used to remove all networks not used by at least one container.

---

```
docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')
```


---

https://stackoverflow.com/questions/43720339/docker-error-could-not-find-an-available-non-overlapping-ipv4-address-pool-am

