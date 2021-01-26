---
layout: post
title:  "Scala Implicit"
date:   2017-04-07 21:36:12 +0000
img:  docker-jekyll.jpg
description: Scala Implicit
categories: [Scala]
tags:   [container, docker, swarm, kubernetes, mesos]
author: Alan Wang
---
`implicit`用法：

##

As Kigyo mentioned there is a semantic difference

assert means that your program has reached an inconsistent state this might be a problem with the current method/function (I like to think of it a bit as HTTP 500 InternalServerError)
require means that the caller of the method is at fault and should fix its call (I like to think of it a bit as HTTP 400 BadRequest)
There is also a major technical difference: assert is annotated with @elidable(ASSERTION) meaning you can compile your program with  -Xelide-below ASSERTION or with -Xdisable-assertions and the compiler will not generate the bytecode for the assertions , which can significantly reduce bytecode size and improve performance if you have a large number of asserts. This means that you can use an assert to verify all the invariants everywhere in your program (all the preconditions/postconditions for every single method/function calls) and not pay the price in production.

You would usually have the "test" build with all the assertions enabled, this would be slower as it would verify all the assertions at all times, then you could have the "production" build of your product without the assertions,which you would eliminate all the internal state checks done through assertion

Require is not elidable, it makes more sense for use in libraries (including internal libraries) to inform the caller of the preconditions to call a given method/function.


http://stackoverflow.com/questions/26140757/what-to-choose-between-require-and-assert-in-scala




