---
title:  "Spring Security Logout"
date:   2018-06-25 12:23:37 +0000
tags:   [spring, security]
---

## Logout inviladate session

```java
http
  .logout
  .invalidateHttpSession(true)
```

## 手动Logout

```java
val session = request.getSession()
if (session != null) {
  val id = session.getId
  val auth = SecurityContextHolder.getContext.getAuthentication
  new SecurityContextLogoutHandler().logout(request, response, auth)
  sessionRegistry.getSessionInformation(id).expireNow()
  sessionRegistry.removeSessionInformation(id)
}
try {
  response.sendRedirect(request.getHeader("referer"))
} catch {
  case e: IOException =>
    e.printStackTrace()
}
```

## 用户Session失效
在使用
```java
 sessionRegistry.getSessionInformation(session.getId()).expireNow()
 ```
`expireNow`并不是说直接从redis删除session，而是在session上加上了expired标记。

在`ConcurrentSessionFilter`的`doFilter`方法里面，expired的session会自动登出。

然而通过源码（spring-security-5.0.5），**并没有找到删除的逻辑，只是进行了一个跳转**。

```java
HttpSession session = request.getSession(false);

if (session != null) {
  SessionInformation info = sessionRegistry.getSessionInformation(session
      .getId());

  if (info != null) {
    if (info.isExpired()) {
      // Expired - abort processing
      if (logger.isDebugEnabled()) {
        logger.debug("Requested session ID "
            + request.getRequestedSessionId() + " has expired.");
      }
      doLogout(request, response);

      this.sessionInformationExpiredStrategy.onExpiredSessionDetected(new SessionInformationExpiredEvent(info, request, response));
      return;
    }
    else {
      // Non-expired - update last request date/time
      sessionRegistry.refreshLastRequest(info.getSessionId());
    }
  }
}
```

## Session的删除
- https://stackoverflow.com/questions/28992395/data-stored-in-spring-http-session-is-not-removed-from-redis-during-destroy

测试下来，Session并没有从Redis里面删除，从文档 [Session Expiration section Spring Session reference](https://docs.spring.io/spring-session/docs/current/reference/html5/#api-redisoperationssessionrepository-expiration) 中可以看到，session在失效后仍然会保留5分钟，但是
```java
SessionRepository.findById(String)
```
方法并不会查找到失效的session。

SpringSession使用`SessionDeletedEvent`和`SessionExpiredEvent`来确保session相关的资源被清除。

## 真正的删除逻辑

最后找到实际删除session的地方，
`SecurityContextLogoutHandler`
```java
public void logout(HttpServletRequest request, HttpServletResponse response,
    Authentication authentication) {
  Assert.notNull(request, "HttpServletRequest required");
  if (invalidateHttpSession) {
    HttpSession session = request.getSession(false);
    if (session != null) {
      logger.debug("Invalidating session: " + session.getId());
      session.invalidate();
    }
  }
```
session.invalidate方法则调用了，`SessionRepositoryRequestWrapper`下`HttpSessionWrapper`的invalidate方法：
```java
public void invalidate() {
  super.invalidate();
  SessionRepositoryRequestWrapper.this.requestedSessionInvalidated = true;
  setCurrentSession(null);
  SessionRepositoryFilter.this.sessionRepository.deleteById(getId());
}
```

而最终的删除逻辑在`RedisOperationsSessionRepository`：
```java
public void deleteById(String sessionId) {
  RedisSession session = getSession(sessionId, true);
  if (session == null) {
    return;
  }

  cleanupPrincipalIndex(session);
  this.expirationPolicy.onDelete(session);

  String expireKey = getExpiredKey(session.getId());
  this.sessionRedisOperations.delete(expireKey);

  session.setMaxInactiveInterval(Duration.ZERO);
  save(session);
}
```
然而，实际执行过之后，session key, sessio expried key在redis里面仍然存在。

对于expried key，在debug时时显示删除成功了，玄学操作。有空在继续研究。

`RedisTemplate`的删除方法：
```java
@Override
public Boolean delete(K key) {
  byte[] rawKey = rawKey(key);
  Long result = execute(connection -> connection.del(rawKey), true);
  return result != null && result.intValue() == 1;
}
```


---

未完待续。
