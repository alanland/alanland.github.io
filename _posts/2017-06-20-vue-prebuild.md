---
layout: post
title:  "Vue: runtime-only build"
date:   2017-06-20 18:27:37 +0000
tags:   [javascript, vue]
author: Alan Wang
---
```
VM17700:431 [Vue warn]: You are using the runtime-only build
of Vue where the template compiler is not available.
Either pre-compile the templates into render functions, 
or use the compiler-included build.
```
更多`rutime-only build`[参考](https://github.com/vuejs/vue/issues/2873)

### 解决方法1
添加如下内容到`Webpack config`:
```js
resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
}
```
### 解决方法2
所有的`components`都用`.vue`定义.

---
END
