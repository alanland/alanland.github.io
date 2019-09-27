---
layout: post
title:  "Linux: Command History"
date:   2017-11-12 09:17:37 +0000
tags:   [linux]
author: Alan Wang
---

设置格式：

```sh
export HISTTIMEFORMAT="%Y-%m-%d:%H-%M-%S:`whoami`:    "
```

测试：

```sh
$ history
```

- `history`的历史命令保存在`~/.bash_history`文件中，所以也可以查看该文件来查看历史命令；
- `~/.bashrc`文件可添加的history相关的说明
    ```sh
    HISTFILESIZE=2000      #设置保存历史命令的文件大小
    HISTSIZE=2000          #保存历史命令条数
    HISTTIMEFORMAT="%Y-%m-%d:%H-%M-%S:`whoami`:  "    #记录每条历史命令的执行时间和执行者
    export HISTTIMEFORMAT
    ```
其中：
    ```
    %Y:4位数的年份；
    %m:2位数的月份数；
    %d:2位数的一个月中的日期数；
    %H：2位数的小时数（24小时制）；
    %M：2位数的分钟数；
    %S：2位数的秒数
    ```

---