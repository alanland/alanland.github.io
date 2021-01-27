---
title:  "Vue 父子组件数据双向绑定"
date:   2017-09-05 13:57:37
tags:   [vue, element-ui]
categories: [前端]
---
## 子组件

```html
<template>
    <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
const options = [
    { value: 'wms', label: 'WMS' },
    { value: 'oms', label: 'OMS' },
    { value: 'bms', label: 'BMS' },
    { value: 'tms', label: 'TMS' }
]
export default Vue.extend({
    name: 'prm-product-select',
    data() {
        return {
            options: options
        }
    },
    props: ['value'],
    model: {
        prop: 'value',
        event: 'change'
    },
    watch: {
        value(val) {
            this.$emit('change', val);
        }
    }
})
</script>
```

## 父组件调用

```html
<el-form-item label="产品">
    <prm-product-select v-model="addForm.product"></prm-product-select>
</el-form-item>
```

---
Links:
- https://www.xiaoboy.com/topic/vue-parent-child-communication-by-v-model.html
- https://vuefe.cn/v2/guide/components.html
- https://my.oschina.net/prettypice/blog/1118864
- [vue 自定义组件 v-model双向绑定、 父子组件同步通信](http://www.cnblogs.com/gsgs/archive/2017/08/06/7294160.html)

---
END
