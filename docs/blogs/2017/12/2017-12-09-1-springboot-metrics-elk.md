---
title:  "Springboot Metrics to ELK"
date:   2017-12-09 13:23:37
tags:   [elk, springboot, metrics]
---

logstash 配置如下：

```ruby
input {

  http_poller {
    urls => {
      pdo_wms25 => "http://wms-test:20010/metrics"
      # test3 => "https://syndication.twitter.com/settings"
    }
    request_timeout => 60
    # Supports "cron", "every", "at" and "in" schedules by rufus scheduler
    schedule => { cron => "* * * * * UTC"}
    #codec => "json"
    # A hash of request metadata info (timing, response headers, etc.) will be sent here
    metadata_target => "http_poller_metadata"
  }

}

filter {
  de_dot {
    separator => "_"
  }
}

output {
	elasticsearch {
		hosts => "elasticsearch:9200"
	}
}
```

这里使用 de_dot 来转换key中的点，不然发送的elasticsearch会报错。

使用 beat也可以达到相同的目的，

```yml
######################## Httpbeat Configuration Example ########################

metricbeat.modules:
- module: system
  metricsets:
    - cpu
    - filesystem
    - memory
    - network
    - process
  enabled: true
  period: 10s
  processes: ['.*']
  cpu_ticks: false
############################## Httpbeat ########################################
httpbeat:

  hosts:
    # Each - Host endpoints to call. Below are the host endpoint specific configurations
    -
      schedule: "@every 7s"
      url: http://wms-test:20010/health
      method: get
      headers:
        Accept: application/json
      output_format: json
      json_dot_mode: replace

    -
      schedule: "@every 6s"
      url: http://wms-test:20010/metrics
      method: get
      headers:
        Accept: application/json
      output_format: json
      json_dot_mode: replace

#================================ General =====================================
fields:
  app_id: test_app

#----------------------------- Logstash output --------------------------------
output.elasticsearch:
  hosts: ["elasticsearch:9200"]

```


---

- [Spring microservices monitoring: /metrics endpoint and ELK](https://blog.mimacom.com/blog/2017/01/20/spring-microservices-monitoring-metrics-endpoint-and-elk/)
- [Spring microservices monitoring: /metrics endpoint and ELK, Part II: Improvements](https://blog.mimacom.com/blog/2017/06/29/spring-microservices-monitoring-metrics-endpoint-and-elk-part-ii-improvements/)

- [Dot Filter Plugin](https://www.elastic.co/guide/en/logstash/master/plugins-filters-de_dot.html)
- [Mapping Changes](https://www.elastic.co/guide/en/elasticsearch/reference/2.0/breaking_20_mapping_changes.html#_field_names_may_not_contain_dots)
- [Manage Spring Boot Logs with Elasticsearch, Logstash and Kibana](http://knes1.github.io/blog/2015/2015-08-16-manage-spring-boot-logs-with-elasticsearch-kibana-and-logstash.html)
- [Spring Boot metrics monitoring using elasticsearch and kibana](https://aboullaite.me/spring-boot-elastic-kibana/)