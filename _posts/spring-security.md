DelegatingPasswordEncoder

MessageDigestPasswordEncoder



# ava.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"


java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder$UnmappedIdPasswordEncoder.matches(DelegatingPasswordEncoder.java:238) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder.matches(DelegatingPasswordEncoder.java:198) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter$LazyPasswordEncoder.matches(WebSecurityConfigurerAdapter.java:593) ~[spring-security-config-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.authentication.dao.DaoAuthenticationProvider.additionalAuthenticationChecks(DaoAuthenticationProvider.java:86) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider.authenticate(AbstractUserDetailsAuthenticationProvider.java:166) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.authentication.ProviderManager.authenticate(ProviderManager.java:174) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.attemptAuthentication(UsernamePasswordAuthenticationFilter.java:94) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:212) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.csrf.CsrfFilter.doFilterInternal(CsrfFilter.java:124) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:66) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:215) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:178) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:357) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:270) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter.doFilter(OAuth2ClientContextFilter.java:60) ~[spring-security-oauth2-2.2.1.RELEASE.jar:na]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:109) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198) ~[tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:496) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:803) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:790) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1459) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [na:1.8.0_151]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [na:1.8.0_151]
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_151]









org.springframework.security.authentication.BadCredentialsException: Bad credentials
	at org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider.authenticate(AbstractUserDetailsAuthenticationProvider.java:151) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.authentication.ProviderManager.authenticate(ProviderManager.java:174) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.authentication.ProviderManager.authenticate(ProviderManager.java:199) ~[spring-security-core-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.attemptAuthentication(UsernamePasswordAuthenticationFilter.java:94) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter.doFilter(AbstractAuthenticationProcessingFilter.java:212) ~[spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.csrf.CsrfFilter.doFilterInternal(CsrfFilter.java:124) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:66) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:215) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:178) [spring-security-web-5.0.4.RELEASE.jar:5.0.4.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:357) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:270) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter.doFilter(OAuth2ClientContextFilter.java:60) [spring-security-oauth2-2.2.1.RELEASE.jar:na]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:109) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) [spring-web-5.0.5.RELEASE.jar:5.0.5.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:496) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:803) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:790) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1459) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [na:1.8.0_151]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [na:1.8.0_151]
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-8.5.29.jar:8.5.29]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_151]





https://spring.io/blog/2017/11/01/spring-security-5-0-0-rc1-released#password-storage-format
Password Storage Format



http://mossle.com/docs/auth/html/ch203-voter.html

WebExpressionVoter 投票失败

去掉角色
                .antMatchers("/user/**").authenticated() //.hasRole("USER")


https://www.jianshu.com/p/839e3b3b2554



Authentication authenticate(Authentication authentication)

