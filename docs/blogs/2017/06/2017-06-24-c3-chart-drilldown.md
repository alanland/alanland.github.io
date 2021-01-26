---
layout: post
title:  "C3: Simple DrillDown"
date:   2017-06-24 12:27:37 +0000
tags:   [c3, chart, drilldown]
author: Alan Wang
---

使用c3来实现数据下钻的一个例子.原理就是使用点击事件,load新的数据,
如果要返回,可以在旁边增加一个按钮,重新加载上一级的数据.

```html
<div id="chart"></div>
```

```js
var playerdata = {
    bulls: [
        ['player1', 10],
        ['player2', 20],
        ['player3', 30],
        ['player4', 40],
        ['player5', 50]
    ],
    lakers: [
        ['player1', 50],
        ['player2', 40],
        ['player3', 30],
        ['player4', 20],
        ['player5', 10]
    ]
}

var chart = c3.generate({
    data: {
        columns: [
            ['bulls', 30],
            ['lakers', 50], ],
        type: 'bar',
        onclick: function (d, element) {
            chart.load({
                unload: ['bulls', 'lakers'],
                columns: playerdata[d.id]
            });
        }
    }
});
```

---
END
