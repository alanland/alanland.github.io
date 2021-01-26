---
title:  "Broccoli Coffee 插件处理已经存在的同名js文件"
date:   2015-04-04 23:29:37 +0000
tags:   [js, broccoli, coffee]
---

今天测试`Broccoli`这个工具,前面都好好的,谁知到coffe编译的时候出了问题.
```

Error: EEXIST, file already exists '/broccoli/tmp/coffee_script_filter-tmp_dest_dir-StlJGvvi.tmp/a.js'
  at Object.fs.openSync (fs.js:432:18)
  at Object.fs.writeFileSync (fs.js:971:15)
  at Object.copyPreserveSync (/broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/broccoli-kitchen-sink-helpers/index.js:153:8)
  at /broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/index.js:44:19
  at /broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/promise-map-series/index.js:11:14
  at lib$rsvp$$internal$$tryCatch (/broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/rsvp/dist/rsvp.js:489:16)
  at lib$rsvp$$internal$$invokeCallback (/broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/rsvp/dist/rsvp.js:501:17)
  at lib$rsvp$$internal$$publish (/broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/rsvp/dist/rsvp.js:472:11)
  at Object.lib$rsvp$asap$$flush [as _onImmediate] (/broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/rsvp/dist/rsvp.js:1290:9)
  at processImmediate [as _immediateCallback] (timers.js:330:15)
```

原因也很简单,就是我本地的coffeescript是已经有编译成js,测试过程中,把同名js文件删除,broccoli编译可以成功.

不过这肯定不是办法,虽然自动化的环境下载来的代码是没有js文件的,但是我自己没事肯定会编个译啥的吧.

先去插件的[主页](https://github.com/joliss/broccoli-coffee),没有找到有用的信息.

干脆找到报错代码:
```
broccoli/node_modules/broccoli-coffee/node_modules/broccoli-filter/node_modules/broccoli-kitchen-sink-helpers/index.js:153:8
```
以及出错位置:
```javascript
// This function is deprecated in favor of
// https://github.com/broccolijs/node-copy-dereference
//
// srcStats is optional; use it as an optimization to avoid double stats
// This function refuses to overwrite files.
exports.copyPreserveSync = copyPreserveSync
function copyPreserveSync (src, dest, srcStats) {
  if (srcStats == null) srcStats = fs.statSync(src)
  if (srcStats.isFile()) {
    // 下面就是出错的一行
    fs.writeFileSync(dest, content, { flag: 'wx' })
    fs.utimesSync(dest, srcStats.atime, srcStats.mtime)
  } else {
    throw new Error('Unexpected file type for ' + src)
  }
}
```
改成了下面,
```javascript
// This function is deprecated in favor of
// https://github.com/broccolijs/node-copy-dereference
//
// srcStats is optional; use it as an optimization to avoid double stats
// This function refuses to overwrite files.
exports.copyPreserveSync = copyPreserveSync
function copyPreserveSync (src, dest, srcStats) {
  if (srcStats == null) srcStats = fs.statSync(src)
  if (srcStats.isFile()) {
    var content = fs.readFileSync(src)
    // begin hack
    if(fs.existsSync(dest)){
      fs.unlinkSync(dest)
    }
    // end hack
    fs.writeFileSync(dest, content, { flag: 'wx' })
    fs.utimesSync(dest, srcStats.atime, srcStats.mtime)
  } else {
    throw new Error('Unexpected file type for ' + src)
  }
}
```
这次运行可以了.

当然这事情没有完,因为这个插件不是我写的,所以这样该肯定是不对滴.在debug编译过程的时候发现,在coffee插件运行的时候是不报错的,直到最后一步`mergeTrees`的时候才报错,猜测是异步更新文件或者使用回调函数.

既然是`mergeTrees`才报错,那么找到[mergeTrees插件的主页](https://github.com/broccolijs/broccoli-merge-trees),看到这样一个参数:

 - **overwrite**: By default, broccoli-merge-trees throws an error when a file exists in multiple trees. If you pass `{ overwrite: true }`, the resulting tree will contain the version of the file as it exists in the last input tree that contains it.

顿时信息若狂,马上使用:
```javascript
module.exports = mergeTrees([appHtml, appJs, appCss],{overwrite: true});
```

重新编译,结果仍然出错,心中一万只草泥马狂奔而过,想17岁的雨季表白被拒绝一样失落.

不过想想也释然了,`overwrite: true`应是对多个`trees`之间的overwrite,而我这个问题明显不再次之列.

ps: 完全是一个tree里的重复.

## 插件本身
心想这个事儿不能这么不明不白的放着啊.只能使用`神追溯`,找到报错的`broccoli-coffee`插件代码:
```javascript

Filter.prototype.write = function (readTree, destDir) {
  var self = this

  return readTree(this.inputTree).then(function (srcDir) {
    var paths = walkSync(srcDir)

    return mapSeries(paths, function (relativePath) {
      if (relativePath.slice(-1) === '/') {
        mkdirp.sync(destDir + '/' + relativePath)
      } else {
        if (self.canProcessFile(relativePath)) {
          return self.processAndCacheFile(srcDir, destDir, relativePath)
        } else {
          // 就是下面这句 line no:44
          helpers.copyPreserveSync(
            srcDir + '/' + relativePath, destDir + '/' + relativePath)
        }
      }
    })
  })
}
```

总览了下代码,也也证明我之前的猜想,更新文件使用的`Promise`.

既然插件不提供配置参数而本身又有问题,最大限度的容忍也就是作者更新之前自己写/改一个插件本地先用着,好在broccoli的插件都是很端的(当然就 compile and write file也不能用多少代码).

事情到此告一段落.

参考:
 - [NodeJs Api](https://nodejs.org/api/fs.html#fs_fs_writefilesync_filename_data_options)


---
END