---
layout: post
title:  "Vue Dynamic Tag"
date:   2017-09-11 12:57:37 +0000
tags:   [vue]
author: Alan Wang
---

```html
<div id="app">
  <div class="row">
      <input type="text" v-model="message" />
  </div>
  <div class="row">
      <dynamic-tag v-model="message" tag="textarea"></dynamic-tag>
  </div>

  {{ message }}
</div>
```

```js
const tag = Vue.component('dynamic-tag', {
  name: 'dynamic-tag',
  render: function(createElement) {
    var self = this
    return createElement(this.tag, {
      domProps: {
        value: self.value
      },
      on: {
        input: function(event) {
          self.value = event.target.value
          //self.$emit('input', event.target.value)
        }
      }
    })
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    message: ''
  },
  components: {
    tag
  }
})
```

---
Links:
- https://codepen.io/asolopovas/pen/OpWVxa
- https://stackoverflow.com/questions/41748934/how-to-create-dynamic-tag-based-on-props-with-vue-2

---
END
