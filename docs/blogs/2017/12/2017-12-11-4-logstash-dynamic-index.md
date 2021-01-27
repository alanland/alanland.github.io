---
title:  "Logstash: Use dynamic Index name based on nested field"
date:   2017-12-11 16:23:37
tags:   [logstash]
---

假设接受到的数据如下：

```json
{
  "_index": "spring-metrics-stoe-wms-pord-2017.12.11",
  "_type": "doc",
  "_id": "zG3nRGABuo9WYQVBCTjl",
  "_version": 1,
  "_score": null,
  "_source": {
    "http_poller_metadata": {
      "request": {
        "method": "get",
        "url": "http://58.11.22.14:3000/metrics"
      },
      "response_headers": {
        "date": "Mon, 11 Dec 2017 09:28:00 GMT",
        "server": "nginx/1.11.6",
        "transfer-encoding": "chunked",
        "content-type": "application/json;charset=UTF-8",
        "connection": "keep-alive",
        "x-application-context": "application:prod:3005"
      },
      "code": 200,
      "response_message": "OK",
      "times_retried": 0,
      "runtime_seconds": 0.022664,
      "name": "stoe-wms-pord",
      "host": "7e6cfb5859e3"
    }
  }
}
```

Logstash配置如下：

```ruby
input {

  http_poller {
    urls => {
      "ttx-wms25-test" => "58.11.22.14:3000/metrics"
    }
    request_timeout => 4
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
        index => "spring-metrics-%{[http_poller_metadata][name]}-%{+YYYY.MM.dd}"
	}
}
```

其中 `index => "spring-metrics-%{[http_poller_metadata][name]}-%{+YYYY.MM.dd}"` 根据名称来分类index。

