---
layout: post
title:  "Increasing the amount of inotify watchers"
date:   2017-05-15 14:27:37 +0000
tags:   [ubuntu, ruby]
author: Alan Wang
---
来源： https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers

Ubunt等上面的解决：

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

ArchLinux 的解决：

```
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```

## 技术细节



---
END
