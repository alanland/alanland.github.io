---
title:  "Listening Events using Slot"
date:   2017-09-11 11:57:37
tags:   [vue, slot]
categories: [前端]
---

```
You cannot listen to events on <slot>. It can end up rendering anything: text, plain element, multiple nodes... the behavior will be unpredictable.

It seems you are trying to make a slot container communicate with a slot child - in most cases this means the two components are coupled by-design, so you can do something like this.$parent.$emit(...) from the child, and listen to that event in the parent with this.$on(...).

I am still open to ideas on improving the ways slot parent and child can communicate, but events on <slot> doesn't really sound like a right direction to me.
```

### Parent
```js
  mounted(){
      this.$on('clickStep', ()=>{
          console.log(1)
      })
  }
```
### Child
```html
<template>
  <div
    class="el-step"
    :style="[style,  isLast ? '' : { marginRight: - $parent.stepOffset + 'px' }]"
    :class="['is-' + $parent.direction]"
    @click="$parent.$emit('clickStep')">
    ...

```
### other answer
```
I'm having this same problem. I don't think it is possible to listen to events on slots. However, you can listen in the child component and just emit the same event, then it works. This is not ideal, but I think this due to some limitation with slots. Here is a related issue. https://github.com/vuejs/vue/issues/43322

This is my child component

<template>
    <li class="action-item">
        <a :href="url" @click="clicked($event)">
            <slot></slot>
        </a>
    </li>
</template>

<script>
    export default {
        props: ['records', 'url'],
        methods: {
            clicked($event) {
                this.$emit('click', $event);
            }
        }
    }
</script>
Then in the parent component, I can do this.

<parent>
    <child @click="doSomething"></child>
    <child @click="doSomethingElse"></child>
</parent>
I would be really happy if I didn't have to do this. So, someone please correct me if I'm wrong here.
```

---
Links:
- [Is it possible to emit event from component inside slot #4332](https://github.com/vuejs/vue/issues/4332)
- https://forum.vuejs.org/t/listen-on-events-when-using-slots/2519/2
- https://cn.vuejs.org/v2/guide/components.html#使用插槽分发内容
---
END
