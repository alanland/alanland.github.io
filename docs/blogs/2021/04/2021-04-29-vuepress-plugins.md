---
title:  "VuePress插件"
date:   2021-04-29 14:58:00
tags:   [vuepress]
categories: [Blog]
---

## 彩带

```sh
npm install vuepress-plugin-ribbon-animation -D
```
```js
[
  "ribbon",
  {
    size: 90, // 彩带的宽度，默认为 90
    opacity: 0.8, // 彩带的不透明度，默认为 0.3
    zIndex: -9999, // 彩带的 z-index 属性，默认值为 -1
  },
]
```

## 动态彩带
```sh
npm install vuepress-plugin-ribbon-animation -D
```
```js
["ribbon-animation", {
  size: 90,   // 默认数据
  opacity: 0.3,  //  透明度
  zIndex: -1,   //  层级
  opt: {
    // 色带HSL饱和度
    colorSaturation: "80%",
    // 色带HSL亮度量
    colorBrightness: "60%",
    // 带状颜色不透明度
    colorAlpha: 0.65,
    // 在HSL颜色空间中循环显示颜色的速度有多快
    colorCycleSpeed: 6,
    // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
    verticalPosition: "center",
    // 到达屏幕另一侧的速度有多快
    horizontalSpeed: 200,
    // 在任何给定时间，屏幕上会保留多少条带
    ribbonCount: 2,
    // 添加笔划以及色带填充颜色
    strokeSize: 0,
    // 通过页面滚动上的因子垂直移动色带
    parallaxAmount: -0.5,
    // 随着时间的推移，为每个功能区添加动画效果
    animateSections: true
  },
  ribbonShow: false, //  点击彩带  true显示  false为不显示
  ribbonAnimationShow: true  // 滑动彩带
}]
```

## 樱花
```sh
npm install vuepress-plugin-sakura -D
```
```js
["sakura", {
    num: 20,  // 默认数量
    show: true, //  是否显示
    zIndex: -1,   // 层级
    img: {
      replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
      httpUrl: '...'     // 绝对路径
    }     
}]
```

参考：

- http://www.zpzpup.com/blog/blogs/category1/2020/20201206.html#%F0%9F%92%8C-vuepress-plugin-sakura