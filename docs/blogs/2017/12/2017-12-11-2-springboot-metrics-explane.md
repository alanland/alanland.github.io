---
title:  "Springboot Metrics"
date:   2017-12-11 11:23:37 +0000
tags:   [springboot, metrics]
categories: [Java]
---

```json
{
    "mem": 323984,
    "mem.free": 239989,
    "processors": 4,
    "instance.uptime": 1670490,
    "uptime": 1691378,
    "systemload.average": 4.22265625,
    "heap.committed": 271872,
    "heap.init": 131072,
    "heap.used": 31882,
    "heap": 1864192,
    "nonheap.committed": 54056,
    "nonheap.init": 2496,
    "nonheap.used": 52113,
    "nonheap": 0,
    "threads.peak": 15,
    "threads.daemon": 5,
    "threads.totalStarted": 17,
    "threads": 15,
    "classes": 6662,
    "classes.loaded": 6662,
    "classes.unloaded": 0,
    "gc.ps_scavenge.count": 10,
    "gc.ps_scavenge.time": 153,
    "gc.ps_marksweep.count": 2,
    "gc.ps_marksweep.time": 150,
    "gauge.response.trace": 19,
    "gauge.response.autoconfig": 41,
    "gauge.response.error": 6,
    "gauge.response.configprops": 138,
    "counter.status.200.configprops": 1,
    "counter.status.404.error": 3,
    "counter.status.200.autoconfig": 1,
    "counter.status.200.trace": 2
}
```

```
The total system memory in KB (mem)
The amount of free memory in KB (mem.free)
The number of processors (processors)
The system uptime in milliseconds (uptime)
The application context uptime in milliseconds (instance.uptime)
The average system load (systemload.average)
Heap information in KB (heap, heap.committed, heap.init, heap.used)
Thread information (threads, thread.peak, thread.daemon)
Class load information (classes, classes.loaded, classes.unloaded)
Garbage collection information (gc.xxx.count, gc.xxx.time)
```