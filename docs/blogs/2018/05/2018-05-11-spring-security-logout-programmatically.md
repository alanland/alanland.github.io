---
title:  "Spring Boot OAuth2 Single Sign Off (Logout) Programmatically"
date:   2018-05-11 16:23:37 +0000
tags:   [spring-security, oauth]
---

## In the client app (WebSecurityConfigurerAdapter):

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
            .logout()
            .logoutSuccessUrl("http://your-auth-server/exit");
}
```

## In the authorization server:
```java
@Controller
public class LogoutController {

    @RequestMapping("/exit")
    public void exit(HttpServletRequest request, HttpServletResponse response) {
        // token can be revoked here if needed
        new SecurityContextLogoutHandler().logout(request, null, null);
        try {
            //sending back to client app
            response.sendRedirect(request.getHeader("referer"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---
- https://stackoverflow.com/questions/43071370/spring-boot-oauth2-single-sign-off-logout/43147567#43147567
