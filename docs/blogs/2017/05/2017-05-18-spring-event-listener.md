---
title:  "Spring Event Listener"
date:   2017-05-18 12:27:37
tags:   [spring, event-listener, spring-boot, java]
---
Spring提供了`ApplicationEvent`，可以发送事件并同步异步处理：

```scala
@SpringBootApplication
@Configuration
class Application {

  import org.springframework.context.annotation.Bean
  import org.springframework.context.event.{ApplicationEventMulticaster, SimpleApplicationEventMulticaster}
  import org.springframework.core.task.SimpleAsyncTaskExecutor
  import org.springframework.scheduling.support.TaskUtils

  @Bean def applicationEventMulticaster: ApplicationEventMulticaster = {
    val eventMulticaster = new SimpleApplicationEventMulticaster
    val executor = new SimpleAsyncTaskExecutor
    executor.setConcurrencyLimit(10)
    eventMulticaster.setTaskExecutor(executor)
    eventMulticaster.setErrorHandler(TaskUtils.LOG_AND_SUPPRESS_ERROR_HANDLER)
    eventMulticaster
  }
}

object Application extends App {
  val ctx = SpringApplication.run(classOf[Application])
  val publisher = ctx.getBean(classOf[Producer])
  List.range(1, 100).foreach((i) => publisher.create(i))
}
```

```scala
case class WaitEvent(count: Int)

@Component class Producer(val publisher: ApplicationEventPublisher) {
  def create(id: Int): Unit = {
    publisher.publishEvent(WaitEvent(id))
  }

  @EventListener
  def listen(waitEvent: WaitEvent): Unit = {
    Thread.sleep(1000)
    print(waitEvent.count + " ")
    if (waitEvent.count % 10 == 0) {
      println()
    }
  }
}
```

测试的时候使用了异步事件，并发数是`10`,程序启动之后发送了`1000`个`WaitEvent`，每个Event处理的时候线程暂停一秒钟。

测试结果如下：

```
1 2 3 4 5 6 7 8 9 10
11 12 13 14 15 16 17 18 19 20
21 22 23 24 25 26 27 28 29 30
31 32 33 34 35 36 37 38 39 40
41 42 43 44 45 46 47 48 49 50
51 52 53 54 55 56 57 58 59 60
61 62 63 64 65 66 67 68 69 70
71 72 73 74 75 76 77 78 79 80
81 82 83 84 85 86 87 88 89 90

```

如果对并发数字不加限制，则会打印出：

```
1 3 2 4 6 9 10
5 7 8 11 12 13 14 15 16 17 18 19 20
21 22 23 25 26 24 27 28 29 30
31 32 33 34 35 36 37 38 40
41 42 43 44 46 45 39 47 96 67 73 66 95 83 85 93 89 62 61 58 75 70
77 74 69 72 80
78 76 87 68 98 81 91 65 64 60
79 82 99 97 94 56 57 55 52 88 71 84 90
86 53 54 92 59 63 48 51 49 50
```

如果把并发线程改到`10,000`,消息数也改到`10,000`,

然后，本次测试的时候机器会卡，等很久消息才会一下子处理，消息没有丢失。

---
END
