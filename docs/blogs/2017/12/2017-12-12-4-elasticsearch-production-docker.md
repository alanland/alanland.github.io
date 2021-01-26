---
title:  "Use Elasticsearch in Docker for producetion use"
date:   2017-12-12 15:23:37 +0000
tags:   [elasticsearch, docker]
---

The `vm.max_map_count` kernel setting needs to be set to at least 262144 for production use. Depending on your platform:

```sh
grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144
```

To apply the setting on a live system type: `sysctl -w vm.max_map_count=262144`



---

- [Docs: Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-prod-cluster-composefile)