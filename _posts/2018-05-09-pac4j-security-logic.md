---
layout: post
title:  "Pac4j - SpringMVC - SecurityLogic"
date:   2018-05-09 08:23:37 +0000
tags:   [spring, springmvc, pac4j]
author: Alan Wang
---

Pac4j-SpringMVC 使用 intercepter 来实现实现权限控制：

```scala
@Configuration
@ComponentScan(basePackages = Array("org.pac4j.springframework.web"))
class SecurityConfig extends WebMvcConfigurer {
  @Autowired private val config: Config = null

  override def addInterceptors(registry: InterceptorRegistry): Unit = {
    registry.addInterceptor(new SecurityInterceptor(config, "FacebookClient"))
        .addPathPatterns("/facebook/*")
        .excludePathPatterns("/facebook/notprotected.html")
  }
}
```

`SecurityInterceptor`的`preHandle`中调用`SecurityLogic`的`perform`方法：

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
    throws Exception {

    assertNotNull("securityLogic", securityLogic);
    assertNotNull("config", config);
    final J2EContext context = new J2EContext(request, response, config.getSessionStore());

    return securityLogic.perform(context, config, (context1, profiles, parameters) -> true
        , (code, webCtx) -> false, clients, authorizers, matchers, multiProfile);
}
```

## jwt Paramerter perfom的逻辑

判断是否配置 `multiProfile`
```java
final boolean multiProfile;
if (inputMultiProfile == null) {
    multiProfile = false;
} else {
    multiProfile = inputMultiProfile;
}
```

matchingChecker 检查是否 match
```java
if (matchingChecker.matches(context, matchers, config.getMatchers())) 
```

从 session 中获取 profiles
```java
final boolean loadProfilesFromSession = profileStorageDecision.mustLoadProfilesFromSession(context, currentClients);
logger.debug("loadProfilesFromSession: {}", loadProfilesFromSession);
final ProfileManager manager = getProfileManager(context, config);
List<CommonProfile> profiles = manager.getAll(loadProfilesFromSession);
```

如果session中未获取到，便利 clients 获取 credentials 进行验证
如果 client 是 DirectClient ,获取 credentials 
```java
final Credentials credentials = currentClient.getCredentials(context)
```

获取 profile
```java
final CommonProfile profile = currentClient.getUserProfile(credentials, context);
```

获取成功则判断是否保存session，
```java
if (profile != null) {
    final boolean saveProfileInSession = profileStorageDecision.mustSaveProfileInSession(context,
        currentClients, (DirectClient) currentClient, profile);
    logger.debug("saveProfileInSession: {} / multiProfile: {}", saveProfileInSession, multiProfile);
    manager.save(saveProfileInSession, profile, multiProfile);
    updated = true;
    if (!multiProfile) {
        break;
    }
}
```

> 对于 jwt 通过 ParameterClient 进行验证是，默认不保存到Session里。

## Facebook Client
对于不是直接验证的客户端，在从Session中找不到profile之后，就跳转进行登录了：
```java
if (startAuthentication(context, currentClients)) {
    logger.debug("Starting authentication");
    saveRequestedUrl(context, currentClients);
    action = redirectToIdentityProvider(context, currentClients);
} else {
    logger.debug("unauthorized");
    action = unauthorized(context, currentClients);
}
```

第三方登录成功后，调用系统的 callback 接口，
```java
@RequestMapping("/callback")
public void callback(final HttpServletRequest request, final HttpServletResponse response) {

    assertNotNull("callbackLogic", callbackLogic);
    assertNotNull("config", config);
    final J2EContext context = new J2EContext(request, response, config.getSessionStore());

    callbackLogic.perform(context, config, J2ENopHttpActionAdapter.INSTANCE, this.defaultUrl,
        this.saveInSession, this.multiProfile, this.renewSession,
        this.defaultClient);
}
```

主要逻辑在`CallbackLogic`里面，
```java
// 查找clients，比如FacebookClient
final List<Client> foundClients = clientFinder.find(clients, context, client);
assertTrue(foundClients != null && foundClients.size() == 1,
    "unable to find one indirect client for the callback: check the callback URL for a client name parameter or suffix path"
        + " or ensure that your configuration defaults to one indirect client");
final Client foundClient = foundClients.get(0);
logger.debug("foundClient: {}", foundClient);
assertNotNull("foundClient", foundClient);

final Credentials credentials = foundClient.getCredentials(context);
logger.debug("credentials: {}", credentials);

// 查找profile
final CommonProfile profile = foundClient.getUserProfile(credentials, context);
logger.debug("profile: {}", profile);
saveUserProfile(context, config, profile, saveInSession, multiProfile, renewSession);
// 跳转
action = redirectToOriginallyRequestedUrl(context, defaultUrl);
```



---
- https://github.com/pac4j/pac4j
- http://www.pac4j.org/docs/index.html
