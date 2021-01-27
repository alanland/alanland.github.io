---
title:  "Java Heap GroovyClassLoader"
date:   2019-04-15 11:23:37
tags:   [jvm, heap, groovy]
---
Groovy is a dynamic language, every method call is dispatched dynamically. To optimise that Groovy creates a `MetaClass` for every `java.lang.Class` in the `MetaClassRegistry`. These MetaClass instances are created on-demand and stored using Weak references.

The reason you see a lot of `org.codehaus.groovy.runtime.metaclass.MetaMethodIndex.Entry` is because Groovy is storing a map of classes and methods in memory so that they can be quickly dispatched by the runtime. Depending on the size of the application this can be as you have discovered thousands of classes as each class can have dozens sometimes hundreds of methods.

However, there is no "memory leak" in Groovy and Grails, what you are seeing is normal behaviour. Your application is running low on memory, probably because it hasn't been allocated enough memory, this in turn causes `MetaClass` instances to be garbage collected. Now say for example you have a loop:

```groovy
for(str in strings) {
   println str.toUpperCase()
}
```

In this case we are calling a method on the String class. If you are running low on memory what will happen is that for each iteration of the loop the `MetaClass` will be garbage collected and then recreated again for the next iteration. This can dramatically slow down an application and lead to the CPU being pinned as you have seen. This state is commonly referred to as "metaclass churn" and is a sign your application is running low on heap memory.

If Groovy was not garbage collecting these MetaClass instances then yes that would mean there is a memory leak in Groovy, but the fact that it is garbage collecting these classes is a sign that all is well, except for the fact that you have not allocated enough heap memory in the first place. That is not to say that there may be a memory leak in another part of the application that is eating up all the available memory and leaving not enough for Groovy to operate correctly.

As for the other answer you refer to, adding class unloading and PermGen tweaks won't actually do anything to resolve your memory issues unless you dynamically parsing classes at runtime. PermGen space is used by the JVM to store dynamically created classes. Groovy allows you to compile classes at runtime using `GroovyClassLoader.parseClass` or `GroovyShell.evaluate`. If you are continuously parsing classes then yes adding class unloading flags can help. See also this post:

[Locating code that is filling PermGen with dead Groovy code](https://stackoverflow.com/questions/5815952/locating-code-that-is-filling-permgen-with-dead-groovy-code)

However, a typical Grails application does not dynamically compile classes at runtime and hence tweaking PermGen and class unloading settings won't actually achieve anything.

You should verify if you have allocated enough heap memory using the -Xmx flag and if not allocate more.

----

- https://stackoverflow.com/questions/24169976/understanding-groovy-grails-classloader-leak

