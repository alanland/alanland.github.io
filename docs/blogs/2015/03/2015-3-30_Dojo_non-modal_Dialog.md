---
title:  "Dojo non-modal Dialog"
date:   2015-03-30 23:29:37 +0000
tags:   [js, dojo]
---

今天有个功能需要`non-modal`的Dialog，而`dijit/Dialg`明确指名了该控件是`modal`的，google了下，相关的空间有如下几个：
```
dojox/layout/FloatingPane
dojox/widget/Dialog
dojox/widget/DialogSimple
```
有兴趣的大家可以看下效果各是什么用的．`dojox/widget/Dialog`有一个`modal`的属性．

还看到了一个不错的解决方案：
```javascript
require(['dijit/form/Button','dijit/Dialog'],
  function (Button) {
    var d = new Dialog({
                    'title':'I am nonmodal',
                    'class':'nonModal'
                  });
  });
```
```css
.nonModal_underlay {
    display:none
}
```

还有在邮件列表里面有这样一种解决方法：
```javascript
dialogObj = dijit.byId('dialogId');
dialogObj.show(); // shows the dialog.
dialogObj._underlay.hide(); // hides underlay behind the dialog.
```
上面的写法我没有尝试，不知道可行不可行，不过直接操作`_underlay`显然违背了api的初衷．

其他的方法不列举了，理论上应该使用`'class':'nonModal'`这个方案的，这也是官网推荐的diy做法．

不过在测试之后发现了一个问题，在Dialog弹出之后，虽然没有modal层，按钮点击都可以，不过下面的输入框无法获得焦点．而我这里肯定要输入内容的，所以放弃这个方案，有时间在去研究一下原因．

最后采用`dojox/layout/FloatingPane`这个控件．各方面都满足要求：

- 拖拽位置
- 拖拽大小
- 显示／隐藏
- 不影响下面的文本框的焦点获取
- CSS定制方便




参考：

- [stackoverflow 7246749](http://stackoverflow.com/questions/7246749/dojo-non-modal-dialog)
- [dojo reference guide](http://dojotoolkit.org/reference-guide/1.9/dijit/Dialog.html#coloring-the-underlay)
- http://w3facility.org/question/dojo-non-modal-dialog/
- http://mail.dojotoolkit.org/pipermail/dojo-interest/2008-December/034939.html
- http://jsfiddle.net/shoe788/W3TvW/1/
- http://www.blogjava.net/chen45257211/articles/380786.html



---
END