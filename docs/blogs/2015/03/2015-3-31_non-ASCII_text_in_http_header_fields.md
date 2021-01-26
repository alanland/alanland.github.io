---
title:  "non-ASCII Text in HTTP Header Fields"
date:   2015-03-31 23:29:37 +0000
tags:   [js, http]
---

今天程序出现下面问题，才知道原来HttpHeader里面不能放`non ascii`的内容．

```
DOMException: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': '{"and":[{"field":"recordType","value":"数据一"}]}' is not a valid HTTP header field value.
```

网络上有关于此的详细解释，贴在文章末尾，有兴趣的看一下．

这里我的解决方法是客户端对其进行`urlEndcode`，然后服务端对`urlDecode`．
```javascript
@headers.filter = encodeURI(@headers.filter) if @headers.filter && @headers.filter.indexOf('{')==0
```
```groovy
URLDecoder.decode(filter)
```
当然，这只能使用于客户端服务端都能控制的情况，不然的话只能把 non ascii　的内容放到url,或者http body里面了．


参考：
- https://www.ietf.org/rfc/rfc2047.txt
- https://tools.ietf.org/html/rfc5987
- https://greenbytes.de/tech/webdav/draft-reschke-http-jfv-00.html
- http://stackoverflow.com/questions/4400678/http-header-should-use-what-character-encoding


---
END
