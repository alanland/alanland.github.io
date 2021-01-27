---
title:  "Java 8 Method Reference"
date:   2017-08-03 11:57:37
tags:   [java]
---
```java
Stream.iterate(0, n->n+1)
        .peek(n->System.out.println(n))
        .allmatch(n->n<100);
```

使用 method reference:
```java
Stream.iterate(0, n->n+1)
        .peek(System.out::println)
        .allmatch(n->n<100;
```

---
END
