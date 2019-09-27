---
layout: post
title:  "Java Heap Unreachable Objects"
date:   2019-03-26 11:23:37 +0000
tags:   [jvm, heap]
author: Alan Wang
---

## Histogram of Unreachable Objects

A heap dump can contain unreachable objects, e.g. objects which should be garbage collected but stay around for various reasons. Usually this is due to optimizations in the garbage collection algorithm. The Memory Analyzer removes these objects by default from the object graph.

Now one can use the _Java Basics / Unreachable Objects Histogram_ to view the objects that have been removed. Alternatively, one can parse the heap dump providing the `-keep_unreachable_objects` flag. Using the flag, unreachable objects will be marked with the GC Root Type "unkown".

## How to analyse unreachable objects
By default unreachable objects are removed from the heap dump while parsing and will not appear in class histogram, dominator tree, etc. Yet it is possible to open a histogram of unreachable objects. You can do it:

1. From the link on the Overview page

2. From the Query Browser via **Java Basics --> Unreachable Objects Histogram**

This histogram has no object graph behind it(unreachable objects are removed during the parsing of the heap dump, only class names are stored). Thus it is not possible to see e.g. a list of references for a particular unreachable object.

But there is a possibility to keep unreachable objects while parsing. For this you need to either:

- parse the heap dump from the command line providing the argument **-keep_unreachable_objects**, i.e. `ParseHeapDump.bat -keep_unreachable_objects <heap dump>`
or

- set the preference using **'Window' > 'Preferences' > 'Memory Analyzer' > 'Keep Unreachable Objects'**, then parse the dump. Memory Analyzer version 1.1 and later has this preference page option to select keep_unreachable_objects.
Crashes

- https://www.eclipse.org/mat/0.8/noteworthy.html
- http://wiki.eclipse.org/MemoryAnalyzer/FAQ#How_to_analyse_unreachable_objects
