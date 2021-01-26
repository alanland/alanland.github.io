---
title:  "Groovy static compilation"
date:   2017-09-28 05:57:37 +0000
tags:   [groovy]
---

## 使用gradle

```groovy
compileGroovy {
    configure(groovyOptions) {
        configurationScript = file("$rootDir/config/groovy/compiler-config.groovy")
    }
}
```

```groovy
import groovy.transform.CompileStatic

withConfig(configuration) {
    ast(CompileStatic)
}
```

## 使用idea

孔阳是上面的`compiler-config.groovy`,需要在ide里设置 config script.

- https://stackoverflow.com/questions/11866901/is-there-any-global-flag-for-groovy-static-compilation
- http://docs.groovy-lang.org/latest/html/documentation/tools-groovyc.html

---
END
