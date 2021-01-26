---
title:  "Vue v-for 数组对象属性绑定"
date:   2017-09-06 12:57:37 +0000
tags:   [js]
categories: [前端]
---

在数组循环的时候,如下绑定不起作用.

```html
<li v-for="node in nodes" 
  :key="node.id" 
  :class="{ checked: node.checked }" 
  @click="node.checked = !node.checked">
    {{node.name}} / {{node.checked}}
</li>
```

## 方案1 直接操作 dom, 不使用数据绑定
```html
<li v-for="node in nodes" 
  :key="node.id" 
  :ref="'node-'+node.id" 
  class="item-block" 
  :class="{ checked: node.checked }" 
  @click="selectItem(node, $event)">
    {{node.name}} / {{node.checked}}
</li>

<script>

  methods: {
    selectItem(item, $event) {
      item.checked = (item.checked + 1) % 2
      if (item.checked) {
        $event.target.classList.add('checked')
      } else {
        $event.target.classList.remove('checked')
      }
    },
  }
</script>
```

## 方案2 使用 `$forceUpdate`
- https://cn.vuejs.org/v2/guide/list.html#一个组件的-v-for

```html
       <li
      is="todo-item" class="item-block"  :class="{checked: todo.checked}"
      v-for="(todo, index) in nodes"
      v-bind:key="todo.id"
      v-bind:title="todo.name"
      :checked='todo.checked'
      v-on:remove="ttt(todo)"
    ></li>
```
```js
Vue.component('todo-item', {
  template: '\
    <li :class="{ checked: checked }">\
      {{ title }}  {{ checked }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
  props: ['title', 'checked']
})

export default {
  data() {
    return {
      customerId: -1,
      customer: {},
      nodes: [],
      projects: [],
      services: [],
    }
  },
  methods: {
    ttt(item){
      Vue.set(item,'checked', !item.checked)
      // item.name=item.name+1
      this.$forceUpdate()
    }
  },
```


---
END
