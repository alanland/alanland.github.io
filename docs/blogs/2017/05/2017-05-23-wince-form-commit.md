---
title:  "WinCE form key event and form commit"
date:   2017-05-23 11:27:37 +0000
tags:   [wms, wince, js]
---
部分WinCE在测试的时候发现一些JS功能不正常：

- 所有form中的输入回车都会触发commit
- 一个输入框的回车的`keydown`，`keyup`只会执行一个
 - 回车之后光标就会离开
 
修正程序做了一个简单demo：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WinCE test</title>
</head>
<body>
<h1>xxxx</h1>
<form action="abc" id="form">
  <input type="text" name="a" id="a">
  <input type="text" name="b" id="b">
  <input type="text" name="c" id="c">
  <button type="submit" id="button">Commit</button>
</form>

<script>
  var commit = false

  var a = window.document.getElementById('a')
  var b = window.document.getElementById('b')
  var c = window.document.getElementById('c')
  var button = window.document.getElementById('button')

  function keydown() {
    if (isEnter()) {
      commit.focus()
    }
  }
  function isEnter() {
    return window.event.keyCode == 13
  }
  a.onkeydown = function () {
    commit = b
    keydown()
  }
  b.onkeydown = function (e) {
    commit = c
    keydown()
  }
  c.onkeydown = function (e) {
    commit = true
  }

  form.onsubmit = function () {
    if (commit == true) {
      return true
    } else {
      commit.focus()
      return false
    }
  }
</script>

</body>
</html>

```

---
END
