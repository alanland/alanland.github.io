---
layout: post
title:  "Js获取Url参数"
date:   2017-09-06 11:57:37 +0000
tags:   [js]
author: Alan Wang
---
```js
var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5";
var url = new URL(url_string);
var c = url.searchParams.get("c");
console.log(c);
```

Links:
- https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters

---
END
