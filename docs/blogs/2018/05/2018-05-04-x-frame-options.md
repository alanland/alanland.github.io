---
layout: post
title:  "X-Frame-Options"
date:   2018-05-04 08:23:37 +0000
tags:   [spring, http, spring-security]
author: Alan Wang
---

测试`iframe`跨域的时候，出现 `X-Frame-Options DENY` 相关的错误，

服务端手动设置该Header：

```java
response.addHeader("x-frame-options", "ALLOW-FROM http://a.io:8080")
```

更新后测试该标记还存在，最后发现是**SpringSecurity**默认会打上次标记：
```
X-Frame-Options: DENY
```

根据文档我们可以定制该行为：

```java
@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      // ...
      .headers()
        .frameOptions();
  }
}
```

另外**SpringSecurity**为了防止`X-XSS`攻击也会加上http header，
```
X-XSS-Protection: 1; mode=block
```


最终我把他全局去掉了：
```java
http.headers().disable()
```

完整代码如下：
```java
@Configuration
@Order(14)
public static class Pac4jCentralLogoutWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

    @Autowired
    private Config config;

    @Value("${hostUrl}")
    private String hostUrl;

    protected void configure(final HttpSecurity http) throws Exception {

        final LogoutFilter filter = new LogoutFilter(config, hostUrl + "/?defaulturlafterlogoutafteridp");
        filter.setLocalLogout(false);
        filter.setCentralLogout(true);
        filter.setLogoutUrlPattern(hostUrl + "/.*");

        http
                .headers().disable()
                .antMatcher("/pac4jCentralLogout")
                .addFilterBefore(filter, BasicAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
    }
}
```

## IE11问题
网上看到的，没测试过。
```java
response.setHeader("P3P","CP=IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT");```
如果使用Nginx：
```ruby
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css)$
{    
  add_header P3P 'CP=IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'; 
} 
```

---

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
- https://docs.spring.io/autorepo/docs/spring-security/3.2.0.CI-SNAPSHOT/reference/html/headers.html#headers-frame-options
- https://docs.spring.io/spring-security/site/docs/3.2.0.CI-SNAPSHOT/reference/html/appendix-namespace.html#nsa-frame-options