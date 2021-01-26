---
title:  "Spring get HttpServletRequest"
date:   2017-11-09 13:57:37 +0000
tags:   [spring, request]
---

## 1

```java
HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
```

## 2

scope="request"

```java
@Autowired
private  HttpServletRequest request;
```

Spring会基于`LocalThread`将请求对象绑定到当前线程以及子线程上面。

```groovy

/**
 * SessionUtils
 *
 * @author 王成义
 * @version 11/9/17
 */
class TtxSessionUtils {

    private static final ThreadLocal asyncTtxSessionHolder =
            new NamedThreadLocal<TtxSession>("Async TtxSessions")

    /**
     * Set ttx session to current thread.
     *
     * @param session
     */
    static void set(TtxSession session) {
        asyncTtxSessionHolder.set(session)
    }

    /**
     * Remove ttx session from current thread.
     */
    static void remove(){
        asyncTtxSessionHolder.remove()
    }

    static HttpServletRequest getRequest(){
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes()
        if (attrs == null) {
            null
        } else  {
            ((ServletRequestAttributes)attrs).getRequest()
        }
    }

    static HttpServletResponse getResponse(){
        RequestAttributes attrs = RequestContextHolder.getRequestAttributes()
        if (attrs == null) {
            null
        } else  {
            ((ServletRequestAttributes)attrs).getResponse()
        }
    }

    static TtxSession getSession(){
        HttpServletRequest request = getRequest()
        if (request==null) {
            if (asyncTtxSessionHolder.get()) {
                asyncTtxSessionHolder.get()
            } else {
                throw new RuntimeException('Cannot get Session.')
            }
        } else {
            getSession(request)
        }
    }

    static TtxSession getSession(HttpServletRequest request) { ... }
}
```

---

- [的RequestContextHolder使用误区](http://dinguangx.iteye.com/blog/2227049)