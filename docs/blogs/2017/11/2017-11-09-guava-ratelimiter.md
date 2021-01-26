---
title:  "Guava RateLimiter"
date:   2017-11-09 11:57:37 +0000
tags:   [guava, ratelimeiter, design]
categories: [Java]
---

从 [Guava Libraries](https://code.google.com/p/guava-libraries/) `13.0` 智斗增加了
[RateLimiter](http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/util/concurrent/RateLimiter.html)
类。

```
[...] rate limiter distributes permits at a configurable rate. Each acquire() blocks if necessary until a permit is available [...] Rate limiters are often used to restrict the rate at which some physical or logical resource is accessed
```

```groovy
final RateLimiter rateLimiter = RateLimiter.create(2.0);

void submitTasks() {
    rateLimiter.acquire(); // 也许需要等待
    boolean result = rateLimiter.tryAcquire(2, 10, TimeUnit.MILLISECONDS);
}
```


## 令牌桶算法

1. 每秒会有 r 个令牌放入桶中，或者说，每过 1/r 秒桶中增加一个令牌
2. 桶中最多存放 b 个令牌，如果桶满了，新放入的令牌会被丢弃
3. 当一个 n 字节的数据包到达时，消耗 n 个令牌，然后发送该数据包
4. 如果桶中可用令牌小于 n，则该数据包将被缓存或丢弃

令牌桶控制的是一个时间窗口内的通过的数据量，在 API 层面我们常说的 QPS、TPS，
正好是一个时间窗口内的请求量或者事务量，只不过时间窗口限定在 1s 罢了。

现实世界的网络工程中使用的令牌桶，比概念图中的自然是复杂了许多，
「令牌桶」的数量也不是一个而是两个，简单的算法描述可用参考中兴的期刊^1或者 RFC。

假如项目使用 Java 语言，我们可以轻松地借助 Guava 的 RateLimiter
来实现基于令牌桶的流控。RateLimiter 令牌桶算法的单桶实现，
也许是因为在 Web 应用层面单桶实现就够用了，双筒实现就属于过度设计。

RateLimiter 对简单的令牌桶算法做了一些工程上的优化，具体的实现是 SmoothBursty。
需要注意的是，RateLimiter 的另一个实现 SmoothWarmingUp，就不是令牌桶了，
而是漏桶算法。也许是出于简单起见，RateLimiter 中的时间窗口能且仅能为 1s，
如果想搞其他时间单位的限流，只能另外造轮子。

SmoothBursty 积极响应李克强总理的号召，上个月的流量没用完，可以挪到下个月用。
其实就是 SmoothBursty 有一个可以放 N 个时间窗口产生的令牌的桶，
系统空闲的时候令牌就一直攒着，最好情况下可以扛 N 倍于限流值的高峰而不影响后续请求。
如果不想像三峡大坝一样能扛千年一遇的洪水，可以把 N 设置为 1，
这样就只屯一个时间窗口的令牌。

RateLimiter 有一个有趣的特性是「前人挖坑后人跳」，
也就是说 RateLimiter 允许某次请求拿走超出剩余令牌数的令牌，
但是下一次请求将为此付出代价，一直等到令牌亏空补上，
并且桶中有足够本次请求使用的令牌为止[^2]。这里面就涉及到一个权衡，
是让前一次请求干等到令牌够用才走掉呢，还是让它先走掉后面的请求等一等呢？
Guava 的设计者选择的是后者，先把眼前的活干了，后面的事后面再说。




---

- [RateLimiter - Discovering Google Guava](https://dzone.com/articles/ratelimiter-discovering-google)
- [系统限流实践 - 应用限流](http://blog.csdn.net/lzw_2006/article/details/51789859)
- [系统限流实践 - 分布式限流](http://blog.csdn.net/lzw_2006/article/details/51880563)
- [系统限流实践 - 接入层限流(下*完结)](http://blog.csdn.net/lzw_2006/article/details/51909516)
