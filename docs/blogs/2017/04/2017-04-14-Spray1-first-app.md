---
title:  "Spray 1 First App"
date:   2017-04-14 04:00:18 +0000
img:  docker-jekyll.jpg
description: Spray 1 First App
categories: [Scala]
tags:   [scala, spray]
---
首先用`SimpleRoutingApp`来运行第一个程序：

```scala
import spray.routing.SimpleRoutingApp

object Main extends App with SimpleRoutingApp {
  implicit val system = ActorSystem("my-system")

  startServer(interface = "localhost", port = 8080) {
    path("hello") {
      get {
        complete {
          <h1>Say hello to spray</h1>
        }
      }
    }
  }
}
```

```
import spray.http._
import HttpMethods._

class MyHttpService extends Actor {
  def receive = {
    case HttpRequest(GET, Uri.Path("/ping"), _, _, _) =>
      sender ! HttpResponse(entity = "PONG")
  }
}
```