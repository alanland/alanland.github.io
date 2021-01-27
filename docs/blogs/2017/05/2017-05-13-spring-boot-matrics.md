---
title:  "Spring Boot Metrics usage"
date:   2017-05-13 01:27:37
tags:   [spring, spring-boot, metrics]
---
`Spring Boot Actuator` 提供了 metrics service, 让监控变得统一，方便管理。

### 依赖

```groovy
compile "org.springframework.boot:spring-boot-starter-actuator"
```

增加这个依赖之后 SpringBoot 默认就会增加一些监控，比如JVM、类加载、HTTP监控等。

### Application
```scala

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration

/**
  * @author 王成义
  * @version 5/13/17
  */
@SpringBootApplication(exclude = Array(classOf[SessionAutoConfiguration]))
class Application {

}

object Application extends App {
  SpringApplication.run(classOf[Application])
}

```

### `/heapdump`
dump当前堆状况，可以使用相关工具进行查看。请求时会造成系统卡顿。


### `/health`
系统健康情况。默认包含系统启动磁盘以及相关中间件信息。

```json
{
  "status": "DOWN",
  "diskSpace": {
    "status": "UP",
    "total": 125891006464,
    "free": 10786025472,
    "threshold": 10485760
  },
  "redis": {
    "status": "DOWN",
    "error": "org.springframework.data.redis.RedisConnectionFailureException: Cannot get Jedis connection; nested exception is redis.clients.jedis.exceptions.JedisConnectionException: Could not get a resource from the pool"
  }
}
```

```json
{
  "status": "UP",
  "diskSpace": {
    "status": "UP",
    "total": 125891006464,
    "free": 10797338624,
    "threshold": 10485760
  },
  "redis": {
    "status": "UP",
    "version": "3.2.0"
  }
}
```

### `/info`
```json
{}
```

### `/beans`
```json
[
  {
    "context": "application:8888",
    "parent": null,
    "beans": [
      {
        "bean": "application",
        "aliases": [],
        "scope": "singleton",
        "type": "cn.com.ittx.license.register.Application$$EnhancerBySpringCGLIB$$38ddd1d4",
        "resource": "null",
        "dependencies": []
      },
      {
        "bean": "org.springframework.boot.autoconfigure.internalCachingMetadataReaderFactory",
        "aliases": [],
        "scope": "singleton",
        "type": "org.springframework.core.type.classreading.CachingMetadataReaderFactory",
        "resource": "null",
        "dependencies": []
      },
      {
        "bean": "restTemplateBuilder",
        "aliases": [],
        "scope": "singleton",
        "type": "org.springframework.boot.web.client.RestTemplateBuilder",
        "resource": "class path resource [org/springframework/boot/autoconfigure/web/WebClientAutoConfiguration$RestTemplateConfiguration.class]",
        "dependencies": []
      },
      {
        "bean": "org.springframework.boot.autoconfigure.web.WebClientAutoConfiguration",
        "aliases": [],
        "scope": "singleton",
        "type": "org.springframework.boot.autoconfigure.web.WebClientAutoConfiguration$$EnhancerBySpringCGLIB$$bafbf9e1",
        "resource": "null",
        "dependencies": []
      }
    ]
  }
]
```

### `/env`
目前的环境变量，包含`application.yaml`和`systemProperties`能得到的。

```json
{
  "profiles": [],
  "server.ports": {
    "local.server.port": 8888
  },
  "servletContextInitParams": {},
  "systemProperties": {
    "java.runtime.name": "Java(TM) SE Runtime Environment",
    "sun.boot.library.path": "/home/programs/java/jdk1.8.0_71/jre/lib/amd64",
    "java.vm.version": "25.71-b15",
    "java.vm.vendor": "Oracle Corporation",
    "java.vendor.url": "http://java.oracle.com/",
    "path.separator": ":",
    "java.vm.name": "Java HotSpot(TM) 64-Bit Server VM",
    "file.encoding.pkg": "sun.io",
    "user.country": "US",
    "sun.java.launcher": "SUN_STANDARD",
    "sun.os.patch.level": "unknown",
    "PID": "2296",
    "java.vm.specification.name": "Java Virtual Machine Specification",
    "user.dir": "/home/workspace/github/labs",
    "java.runtime.version": "1.8.0_71-b15",
    "java.awt.graphicsenv": "sun.awt.X11GraphicsEnvironment",
    "org.jboss.logging.provider": "slf4j",
    "java.endorsed.dirs": "/home/programs/java/jdk1.8.0_71/jre/lib/endorsed",
    "os.arch": "amd64",
    "java.io.tmpdir": "/tmp",
    "line.separator": "\n",
    "java.vm.specification.vendor": "Oracle Corporation",
    "os.name": "Linux",
    "sun.jnu.encoding": "UTF-8",
    "spring.beaninfo.ignore": "true",
    "java.library.path": "/home/programs/idea/ideau/bin::/usr/java/packages/lib/amd64:/usr/lib64:/lib64:/lib:/usr/lib",
    "java.specification.name": "Java Platform API Specification",
    "java.class.version": "52.0",
    "sun.management.compiler": "HotSpot 64-Bit Tiered Compilers",
    "os.version": "3.13.0-37-generic",
    "user.home": "/home",
    "catalina.useNaming": "false",
    "user.timezone": "Asia/Shanghai",
    "java.awt.printerjob": "sun.print.PSPrinterJob",
    "file.encoding": "UTF-8",
    "java.specification.version": "1.8",
    "catalina.home": "/tmp/tomcat.5393604846399255141.8888",
    "java.class.path": "...",
    "user.name": "wang",
    "java.vm.specification.version": "1.8",
    "sun.java.command": "cn.com.ittx.license.register.Application",
    "java.home": "/home/programs/java/jdk1.8.0_71/jre",
    "sun.arch.data.model": "64",
    "user.language": "en",
    "java.specification.vendor": "Oracle Corporation",
    "awt.toolkit": "sun.awt.X11.XToolkit",
    "java.vm.info": "mixed mode",
    "java.version": "1.8.0_71",
    "java.ext.dirs": "/java/jdk1.8.0_71/jre/lib/ext:/usr/java/packages/lib/ext",
    "sun.boot.class.path": "/...",
    "java.awt.headless": "true",
    "java.vendor": "Oracle Corporation",
    "catalina.base": "/tmp/tomcat.5393604846399255141.8888",
    "file.separator": "/",
    "java.vendor.url.bug": "http://bugreport.sun.com/bugreport/",
    "sun.io.unicode.encoding": "UnicodeLittle",
    "sun.cpu.endian": "little",
    "sun.desktop": "gnome",
    "sun.cpu.isalist": ""
  },
  "systemEnvironment": {
    "PATH": "/home/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games",
    "XAUTHORITY": "/home/.Xauthority",
    "LC_MEASUREMENT": "zh_CN.UTF-8",
    "LC_TELEPHONE": "zh_CN.UTF-8",
    "XMODIFIERS": "@im=fcitx",
    "MANDATORY_PATH": "/usr/share/gconf/cinnamon.mandatory.path",
    "GDMSESSION": "cinnamon",
    "XDG_DATA_DIRS": "/usr/share/cinnamon:/usr/share/gnome:/usr/local/share/:/usr/share/:/usr/share/mdm/",
    "TEXTDOMAINDIR": "/usr/share/locale/",
    "GTK_IM_MODULE": "fcitx",
    "DBUS_SESSION_BUS_ADDRESS": "unix:abstract=/tmp/dbus-SvvD2UurVp,guid=54715fa6df483e247ea04cb75913cec4",
    "DEFAULTS_PATH": "/usr/share/gconf/cinnamon.default.path",
    "XDG_CURRENT_DESKTOP": "X-Cinnamon",
    "SSH_AGENT_PID": "3094",
    "LD_LIBRARY_PATH": "/home/programs/idea/bin:",
    "QT4_IM_MODULE": "fcitx",
    "USERNAME": "wang",
    "SESSION_MANAGER": "local/:@/tmp/.ICE-unix/3019,unix/:/tmp/.ICE-unix/3019",
    "SDKMAN_DIR": "/home//.sdkman",
    "LC_PAPER": "zh_CN.UTF-8",
    "LOGNAME": "wang",
    "PWD": "/home/workspace/labs",
    "GJS_DEBUG_TOPICS": "JS ERROR;JS LOG",
    "SHELL": "/bin/bash",
    "LC_ADDRESS": "zh_CN.UTF-8",
    "GIO_LAUNCHED_DESKTOP_FILE": "/home/.local/share/applications/ideau.desktop",
    "GNOME_DESKTOP_SESSION_ID": "this-is-deprecated",
    "CLUTTER_IM_MODULE": "xim",
    "TEXTDOMAIN": "im-config",
    "XDG_SESSION_COOKIE": "45f50d143dd263dafff98b9d553b2bf4-1494470339.925353-1139279094",
    "MDMSESSION": "cinnamon",
    "XDG_SESSION_DESKTOP": "cinnamon",
    "LC_IDENTIFICATION": "zh_CN.UTF-8",
    "LC_MONETARY": "zh_CN.UTF-8",
    "QT_IM_MODULE": "xim",
    "XFILESEARCHPATH": "/usr/dt/app-defaults/%L/Dt",
    "XDG_CONFIG_DIRS": "/etc/xdg/xdg-cinnamon:/etc/xdg",
    "LANG": "en_US.UTF-8",
    "XDG_SESSION_ID": "c1",
    "MDM_LANG": "en_US.UTF-8",
    "DISPLAY": ":0",
    "CINNAMON_VERSION": "2.4.8",
    "LC_NAME": "zh_CN.UTF-8",
    "GDM_XSERVER_LOCATION": "local",
    "DESKTOP_SESSION": "cinnamon",
    "USER": "wang",
    "GIO_LAUNCHED_DESKTOP_FILE_PID": "28486",
    "WINDOWPATH": "8",
    "GJS_DEBUG_OUTPUT": "stderr",
    "LC_NUMERIC": "zh_CN.UTF-8",
    "XDG_SEAT": "seat0",
    "SSH_AUTH_SOCK": "/tmp/ssh-Ua1Esy6JNeRg/agent.3019",
    "MDM_XSERVER_LOCATION": "local",
    "NLSPATH": "/usr/dt/lib/nls/msg/%L/%N.cat",
    "XDG_RUNTIME_DIR": "/run/user/1000",
    "XDG_VTNR": "8",
    "HOME": "/home"
  },
  "applicationConfig: [classpath:/application.yml]": {
    "server.port": 8888,
    "spring.redis.database": 0,
    "spring.redis.host": "localhost",
    "spring.redis.password": "******",
    "spring.redis.ssl": false,
    "spring.redis.pool.max-active": 8,
    "spring.redis.pool.max-idle": 8,
    "spring.redis.pool.max-wait": -1,
    "spring.redis.pool.min-idle": 0,
    "spring.redis.port": 6379,
    "spring.redis.timeout": 0
  }
}
```

### `/dump`
当前线程的快照信息。

### `/mappings`
`Controller` 的所有 `mapping` 信息。

```json
{
  "/webjars/**": {
    "bean": "resourceHandlerMapping"
  },
  "/**": {
    "bean": "resourceHandlerMapping"
  },
  "/**/favicon.ico": {
    "bean": "faviconHandlerMapping"
  },
  "{[/error],produces=[text/html]}": {
    "bean": "requestMappingHandlerMapping",
    "method": "public org.springframework.web.servlet.ModelAndView org.springframework.boot.autoconfigure.web.BasicErrorController.errorHtml(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse)"
  },
  "{[/error]}": {
    "bean": "requestMappingHandlerMapping",
    "method": "public org.springframework.http.ResponseEntity<java.util.Map<java.lang.String, java.lang.Object>> org.springframework.boot.autoconfigure.web.BasicErrorController.error(javax.servlet.http.HttpServletRequest)"
  },
  "{[/mappings || /mappings.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/health || /health.json],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.HealthMvcEndpoint.invoke(java.security.Principal)"
  },
  "{[/autoconfig || /autoconfig.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/env/{name:.*}],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EnvironmentMvcEndpoint.value(java.lang.String)"
  },
  "{[/env || /env.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/beans || /beans.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/metrics/{name:.*}],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.MetricsMvcEndpoint.value(java.lang.String)"
  },
  "{[/metrics || /metrics.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/configprops || /configprops.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/info || /info.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/dump || /dump.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  },
  "{[/heapdump || /heapdump.json],methods=[GET],produces=[application/octet-stream]}": {
    "bean": "endpointHandlerMapping",
    "method": "public void org.springframework.boot.actuate.endpoint.mvc.HeapdumpMvcEndpoint.invoke(boolean,javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse) throws java.io.IOException,javax.servlet.ServletException"
  },
  "{[/trace || /trace.json],methods=[GET],produces=[application/json]}": {
    "bean": "endpointHandlerMapping",
    "method": "public java.lang.Object org.springframework.boot.actuate.endpoint.mvc.EndpointMvcAdapter.invoke()"
  }
}
```

### `/trace`
每个HTTP请求的情况。

```json
[
  {
    "timestamp": 1494613967468,
    "info": {
      "method": "GET",
      "path": "/mappings",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Content-Type": "application/json;charset=UTF-8",
          "Transfer-Encoding": "chunked",
          "Date": "Fri, 12 May 2017 18:32:47 GMT",
          "status": "200"
        }
      }
    }
  },
  {
    "timestamp": 1494613761857,
    "info": {
      "method": "GET",
      "path": "/env",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Content-Type": "application/json;charset=UTF-8",
          "Transfer-Encoding": "chunked",
          "Date": "Fri, 12 May 2017 18:29:21 GMT",
          "status": "200"
        }
      }
    }
  },
  {
    "timestamp": 1494613706219,
    "info": {
      "method": "GET",
      "path": "/beans",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Content-Type": "application/json;charset=UTF-8",
          "Transfer-Encoding": "chunked",
          "Date": "Fri, 12 May 2017 18:28:26 GMT",
          "status": "200"
        }
      }
    }
  },
  {
    "timestamp": 1494613702641,
    "info": {
      "method": "GET",
      "path": "/info",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Content-Type": "application/json;charset=UTF-8",
          "Transfer-Encoding": "chunked",
          "Date": "Fri, 12 May 2017 18:28:22 GMT",
          "status": "200"
        }
      }
    }
  },
  {
    "timestamp": 1494613660041,
    "info": {
      "method": "GET",
      "path": "/favicon.ico",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "image/webp,image/*,*/*;q=0.8",
          "referer": "http://cas:8888/health",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Last-Modified": "Wed, 28 Sep 2016 12:12:09 GMT",
          "Accept-Ranges": "bytes",
          "Content-Type": "application/octet-stream",
          "Content-Length": "946",
          "Date": "Fri, 12 May 2017 18:27:39 GMT",
          "status": "200"
        }
      }
    }
  },
  {
    "timestamp": 1494613659846,
    "info": {
      "method": "GET",
      "path": "/health",
      "headers": {
        "request": {
          "host": "cas:8888",
          "connection": "keep-alive",
          "upgrade-insecure-requests": "1",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.19 Safari/537.36",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "accept-encoding": "gzip, deflate, sdch",
          "accept-language": "en-US,en;q=0.8",
          "cookie": "org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en; username=%22root%22; password=%22root%22; host=%22cas%22; ssl=false; grafana_sess=51e66aba1bffaf4f; _ati=7052420944757; _umdata=A502B1276E6D5FEF82C19C19EABA6854ECF3036C116EB061096F73D091F97022562917E716A7D688CD43AD3E795C914C6044E0E9A39FFAA9F20101D6D5C5CB60; user=alan; client=fe2e1e89b8cf4932885557d7f7982a49; locale=zh; sso=; ssoToken=; ssoApp=; ssoClient=; token=; db="
        },
        "response": {
          "X-Application-Context": "application:8888",
          "Content-Type": "application/json;charset=UTF-8",
          "Transfer-Encoding": "chunked",
          "Date": "Fri, 12 May 2017 18:27:39 GMT",
          "status": "200"
        }
      }
    }
  }
]
```

### `/autoconfig`
`SpringBoot`已经自动配置的属性。

### `/metrics`
内存等监控的核心信息。

```json
{
  "mem": 433046,
  "mem.free": 305684,
  "processors": 8,
  "instance.uptime": 406349,
  "uptime": 411281,
  "systemload.average": 0.96,
  "heap.committed": 367616,
  "heap.init": 256000,
  "heap.used": 61931,
  "heap": 3635712,
  "nonheap.committed": 68224,
  "nonheap.init": 2496,
  "nonheap.used": 65431,
  "nonheap": 0,
  "threads.peak": 22,
  "threads.daemon": 20,
  "threads.totalStarted": 27,
  "threads": 22,
  "classes": 7706,
  "classes.loaded": 7706,
  "classes.unloaded": 0,
  "gc.ps_scavenge.count": 9,
  "gc.ps_scavenge.time": 84,
  "gc.ps_marksweep.count": 2,
  "gc.ps_marksweep.time": 143,
  "httpsessions.max": -1,
  "httpsessions.active": 0,
  "gauge.response.beans": 37,
  "gauge.response.mappings": 5,
  "gauge.response.env": 17,
  "gauge.response.trace": 13,
  "gauge.response.autoconfig": 13,
  "gauge.response.health": 173,
  "gauge.response.info": 16,
  "gauge.response.star-star.favicon.ico": 14,
  "counter.status.200.mappings": 1,
  "counter.status.200.star-star.favicon.ico": 1,
  "counter.status.200.info": 1,
  "counter.status.200.beans": 1,
  "counter.status.200.health": 1,
  "counter.status.200.autoconfig": 1,
  "counter.status.200.env": 1,
  "counter.status.200.trace": 1
}
```

---
END
