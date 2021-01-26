---
layout: post
title:  "Java Application Memory Usage"
date:   2017-11-25 17:23:37 +0000
tags:   [java, memory]
author: Alan Wang
---

Top command reflects the total amount of memory used by the Java application. This includes among other things:

- A basic memory overhead of the JVM itself
- the heap space (bounded with -Xmx)
- The permanent generation space (-XX:MaxPermSize - not standard in all JVMs)
- threads stack space (-Xss per stack) which may grow significantly depending on the number of threads
- Space used by native allocations (using ByteBufer class, or JNI)

---

- [Java using up far more memory than allocated with -Xmx](https://stackoverflow.com/questions/15282178/java-using-up-far-more-memory-than-allocated-with-xmx)
