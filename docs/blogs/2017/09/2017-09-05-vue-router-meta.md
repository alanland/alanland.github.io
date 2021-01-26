---
title:  "Vue Router Meta"
date:   2017-09-05 11:57:37 +0000
tags:   [vue]
---

通过router meta向页面传递参数, 通过`this.$route.meta.url`获取.

## router.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ItemCrud from '@/views/ItemCrud'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: Hello},
    {path: '/node', name: 'Node', component: ItemCrud, meta: { label: '节点', url: '/prmNode' }},
    {
      path: '/customer',
      name: 'Node',
      component: ItemCrud,
      meta: { label: '客户', url: '/prmCustomer' }
    }
  ]
})
```

## ItemCrud/index.vue
```html
<template>
  <div>
    <h2>{{label}}</h2>
    <el-dialog :title="label+'编辑'" :visible.sync="newFormVisible">
      <el-form :model="node">
        <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :label-width="formLabelWidth">
          <el-input v-model="node[field.prop]" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNode()">保 存</el-button>
      </div>
    </el-dialog>

    <!-- Form -->
    <el-button type="text" @click="newNode()">新增</el-button>

    <data-tables ref="table" :data='nodes' :actions-def='getActionsDef()' :checkbox-filter-def='getCheckFilterDef()' :row-action-def='getRowActionsDef()'>
      <el-table-column v-for="title in titles" :key="title.name" :prop="title.prop" :label="title.label" sortable="custom">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <el-button @click="showNode(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteNode(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </data-tables>

  </div>
</template>

<script>
import { SERVER_URL } from '../../config/config'
export default {
  data() {
    return {
      label: '',
      resourceUrl: '',
      node: {},
      nodes: [],
      fields: [
        { prop: 'customerName', label: 'Customer' },
        { prop: 'name', label: 'Name' },
        { prop: 'ip', label: 'IP' },
        { prop: 'port', label: 'Port' }
      ],
      titles: [
        { prop: 'customerName', label: 'Customer' },
        { prop: 'name', label: 'Name' },
        { prop: 'ip', label: 'IP' },
        { prop: 'port', label: 'Port' }
      ],
      newFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.label = this.$route.meta.label
    this.resourceUrl = this.$route.meta.url
    this.$ajax.get(SERVER_URL + this.resourceUrl)
      .then(res => {
        this.nodes = res.data
      })
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$ajax.post('/node', this.newNode).then(res => {
          //   console.log(res.data)
          //   console.log(this.newNode)
          //   this.dialogFormVisible = false
          // })
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    getActionsDef() {
    },
    getCheckFilterDef() {
    },
    getRowActionsDef() {
    },
    newNode() {
      this.node = {}
      this.newFormVisible = true
    },
    showNode(node) {
      this.node = JSON.parse(JSON.stringify(node))
      this.newFormVisible = true
    },
    deleteNode(node) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.doDeleteNode(node)
          done()
        })
        .catch(_ => { })
    },
    doDeleteNode(node) {
      console.log(1)
      this.$ajax.delete(SERVER_URL + this.resourceUrl + '/' + node.id).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    saveNode() {
      this.$ajax.post(SERVER_URL + this.resourceUrl, this.node, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        this.newFormVisible = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    editNode() {
      this.dialogTableVisible = true
    }
  }
}
</script>
```

---
END
