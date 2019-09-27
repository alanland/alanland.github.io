---
layout: post
title:  "Linux Process uptime"
date:   2017-11-15 09:23:37 +0000
tags:   [linux, uptime]
author: Alan Wang
---

As "uptime" has several meanings, here is a useful command.

```
ps -eo pid,comm,lstart,etime,time,args
```

This command lists all processes with several different time-related columns. It has the following columns:

```
PID COMMAND                          STARTED     ELAPSED     TIME COMMAND

```

`PID` = Process ID
first `COMMAND` = only the command name without options and without arguments
`STARTED` = the absolute time the process was started
`ELAPSED` = elapsed time since the process was started (wall clock time), format [[dd-]hh:]mm:ss TIME = cumulative CPU time, "[dd-]hh:mm:ss" format
second `COMMAND` = again the command, this time with all its provided options and arguments


- [How to find uptime of a linux process](https://superuser.com/questions/380520/how-to-find-uptime-of-a-linux-process)
