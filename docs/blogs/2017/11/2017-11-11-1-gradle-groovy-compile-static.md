---
title:  "Gradle: Groovy CompileStatic"
date:   2017-11-11 13:57:37
tags:   [gradle, groovy]
categories: [Java]
---

Create a config `groovyOptionsConfig.groovy`:

```groovy
withConfig(configuration) {
     ast(groovy.transform.CompileStatic)
}
```

and use in in your `build.gradle`:

```groovy
compileGroovy {
     groovyOptions.configurationScript = file("groovyOptionsConfig.groovy")
}
```

---

- [Use @CompileStatic for the whole Gradle 2.1 project](http://ofnir.net/posts/use-compilestatic-for-the-whole-gradle-21-project.html)
- [Groovy Goodness: Customising The Groovy Compiler](http://mrhaki.blogspot.com/2016/01/groovy-goodness-customising-groovy.html)

- [GroovyCompileOptions](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.compile.GroovyCompileOptions.html)
- [Compilation customizers](http://docs.groovy-lang.org/latest/html/documentation/#compilation-customizers)

---

