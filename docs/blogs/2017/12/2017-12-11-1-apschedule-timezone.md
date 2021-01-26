---
title:  "APScheduler Local Timezone"
date:   2017-12-11 10:23:37 +0000
tags:   [python, apscheduler]
---

将Python程序打包到Docker里面运行的时候，报错：

```
Unable to determine the name of the local timezone -- you must explicitly specify the name of the local timezone.
```

在创建 Scheduler 的时候，只需要指定 timezone 参数即可：

```python
scheduler = BackgroundScheduler(timezone="UTC")
```
