报警规则允许你定义基于Prometheus语言表达的报警条件，并发送报警通知到外部服务。

定义报警规则

https://sagittariusyx.github.io/2016/03/07/prometheus-alertmanager/
http://www.jianshu.com/p/239b145e2acc
https://prometheus.io/docs/alerting/configuration/#<inhibit_rule>
http://blog.csdn.net/y_xiao_/article/details/50818451
https://segmentfault.com/a/1190000008695357
https://segmentfault.com/a/1190000008695357




报警规则通过以下格式定义：




```rust
ALERT <alert name>
  IF <expression>
  [ FOR <duration> ]
  [ LABELS <label set> ]
  [ ANNOTATIONS <label set> ]
```
FOR子句使得Prometheus等待第一个传进来的向量元素（例如高HTTP错误的实例），并计数一个警报。如果元素是active，但是没有firing的，就处于pending状态。

LABELS（标签）子句允许指定一组附加的标签附到警报上。现有的任何标签都会被覆盖，标签值可以被模板化。

ANNOTATIONS（注释）子句指定另一组未查明警报实例的标签，它们被用于存储更长的其他信息，例如警报描述或者链接，注释值可以被模板化。


```rust
# Alert for any instance that is unreachable for >5 minutes.
ALERT InstanceDown
  IF up == 0
  FOR 5m
  LABELS { severity = "page" }
  ANNOTATIONS {
    summary = "Instance {{ $labels.instance }} down",
    description = "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 5 minutes.",
  }

# Alert for any instance that have a median request latency >1s.
ALERT APIHighRequestLatency
  IF api_http_request_latencies_second{quantile="0.5"} > 1
  FOR 1m
  ANNOTATIONS {
    summary = "High request latency on {{ $labels.instance }}",
    description = "{{ $labels.instance }} has a median request latency above 1s (current value: {{ $value }}s)",
  }
```