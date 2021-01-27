---
title:  "Stylus: loop, function and interception"
date:   2017-06-23 18:27:37
tags:   [stylus]
---
从一段scss代码翻译到stylus时候,由于`@content`没有找到合适的写法,并且部分时候插值有点问题,
使用如下方式实现:

```stylus
// MIXIN FOR RESPONSIVE CSS GRID;
// Extra small screen / phone
xs = 0
// Small screen / phone
sm = 480px
// Medium screen / tablet
md = 768px
// Large screen / desktop
lg = 1024px
// // Extra large screen / wide desktop
xl= 1200px

respond-to(fn, medias)
    for current-media in medias
        if current-media=='xs'
            @media only screen and (min-width: sm)
                fn()
        else if current-media=='sm'
            @media only screen and (min-width: sm + 1px)
                fn()
        else if current-media=='md'
            @media only screen and (min-width: md + 1px)
                fn()
        else if current-media=='lg'
            @media only screen and (min-width: lg + 1px)
                fff()
        else if current-media=='xl'
            @media only screen and (min-width: xl + 1px)
                fn()

arr = 'xs' 'sm'
hellStyle()
    width 113px
.hell
    respond-to(hellStyle, arr)

```

### 输出:     
```css
@media only screen and (min-width: 480px) {
  .hell {
    width: 113px;
  }
}
@media only screen and (min-width: 481px) {
  .hell {
    width: 113px;
  }
}
```

### 使用匿名函数:
```stylus
arr = 'xs' 'sm'
.hell
    respond-to(@(){
        padding: 184px
        border: red
    }(), arr)
```

### 匿名参数配合数组参数
```style
.hell
    respond-to(@(){
        padding: 1814px
        border: red
    }(), 'xs' 'xl' 'md')
```

---
END
