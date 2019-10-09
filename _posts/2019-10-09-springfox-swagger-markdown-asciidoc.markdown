---
layout: post
title:  "Springfox, Swagger, Asciidoc"
date:   2019-10-09T15:23:34.498Z
tags:   [java, gradle, swagger]
categories: [Java]
author: Alan Wang
---

重新把文档纳入到 CI 里面，方案还是 Swagger 做注解，  用 Springfox 做集成，使用 Swagger2Markdown 插件转换成 Adoc，最后通过
Asciidoc 插件发不成 html 和 pdf 等格式。

## 添加 Springfox 依赖

我们这里使用 Snapshot 版本：

```groovy

    compile 'org.springframework.boot:spring-boot-starter-web'
    compile 'org.springframework.boot:spring-boot-starter-integration'
    compile('org.springframework.integration:spring-integration-http') {
        exclude(module: 'commons-logging')
        exclude(module: 'commons-logging-api')
    }
    compile group: 'io.springfox', name: 'springfox-swagger2', version: '3.0.0-SNAPSHOT'
    compile group: 'io.springfox', name: 'springfox-spring-webmvc', version: '3.0.0-SNAPSHOT'
    compile group: 'io.springfox', name: 'springfox-spring-integration-webmvc', version: '3.0.0-SNAPSHOT'
    compile group: 'io.springfox', name: 'springfox-swagger-ui', version: '3.0.0-SNAPSHOT'

    testCompile "org.springframework.boot:spring-boot-starter-test"
```

此时访问 `/swagger-ui.html` 就可以访问到界面了。

ps：swagger-ui 界面加载比较慢，如果服务启动好了，还不能访问，请耐心等待。

## 使用 Swagger2Markdown 转换成 adoc

为了自动化，我们使用 SpringBoot 单元测试的形式

添加依赖

```groovy
    testCompile "io.github.swagger2markup:swagger2markup:1.3.3
```

编写测试类 `Swagger2MarkupTest`

```groovy

import io.github.swagger2markup.Swagger2MarkupConverter
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.junit4.SpringRunner

import java.nio.file.Paths

@RunWith(SpringRunner.class)
@SpringBootTest
@Import([SwaggerConfig, Application])
class Swagger2MarkupTest {
    @Test
    void convertRemoteSwaggerToAsciiDoc() {
        // Remote Swagger source
        Swagger2MarkupConverter.from(new URL("http://localhost:8080/v2/api-docs")).build()
            .toFolder(Paths.get("src/docs/asciidoc/generated"))
    }
}
```

当然也可以用 MockMvc 而不是直接指定端口号：
```groovy
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@RunWith(value = SpringJUnit4ClassRunner)
@SpringBootTest
@Import([SwaggerConfig, Application])
class Swagger2MarkupTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
    }

    @Test
    public void convertSwaggerToAsciiDoc() throws Exception {
        this.mockMvc.perform(get("/documentation/v2/api-docs")
            .accept(MediaType.APPLICATION_JSON))
            .andDo(Swagger2MarkupResultHandler
                .outputDirectory("src/docs/asciidoc/generated").build())
            .andExpect(status().isOk());
    }
}
```

如此生成了 adoc

```sh
```

## 使用 asciidoctor 插件生成文档

```groovy
plugins {
    id 'org.asciidoctor.jvm.convert' version '2.3.0'
    id 'org.asciidoctor.jvm.pdf' version '2.3.0'
}
asciidoctor {
    sourceDir file('src/docs/asciidoc/generated')
    sources {
        include '*.adoc'
    }
    outputDir file('build/docs')
}
```

命令行执行

```sh
gradle asciidoctor
gradle asciidoctorPdf
```

就生成了文档。

现在生成的文档是默认的几个，我们可以根据生辰改的 adoc 进行定制。

---

- [Swagger2Markup](http://swagger2markup.github.io/swagger2markup/1.3.3)
- [Springfox Doc](https://springfox.github.io/springfox/docs/snapshot/)
- [Springfox Home](http://springfox.github.io/springfox/)
- [Springfox Demo](https://github.com/springfox/springfox-demos)
- [GitHub asciidoctor-gradle-examples](https://github.com/asciidoctor/asciidoctor-gradle-examples)
- [asciidoctor-gradle-plugin](https://asciidoctor.org/docs/asciidoctor-gradle-plugin/)
