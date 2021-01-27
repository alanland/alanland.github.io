---
title:  "Vue Router Load Just Once"
date:   2017-09-05 12:57:37
tags:   [vue]
---
对于`component`相同的path, 点击之后并不会重新mount

```js
{
    path: '/',
    component: Home,
    name: '资源',
    iconCls: 'el-icon-message',//图标样式class
    children: [
        { path: '/prmUser', component: require('./views/curd'), name: 'CurdUser', meta: {
            url: 'user'
        } },
        { path: '/prmCustomer', component: require('./views/curd'), name: 'Customer', meta: {
            url: 'customer'
        } },
        { path: '/service', component: Form, name: 'Form' },
        { path: '/node', component: user, name: '列表' },
    ]
},
```

一些方案:
```js
component: function (resolve) {
        require(['./components/views/UserSettings.vue'], resolve) 
    }
```
上面方案无用,

下面方案会在点击的时候刷新整个页面.
```html
<router-view :key="$route.path"></router-view>
```

---
Links:
- [Vue router shows lazy-loaded route components only once #1074
](https://github.com/vuejs/vue-router/issues/1074)
- https://forum.vuejs.org/t/reinitialize-components/2501/2
---
END
