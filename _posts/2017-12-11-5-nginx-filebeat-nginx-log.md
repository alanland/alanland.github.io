---
layout: post
title:  "Filebeat: Nginx log"
date:   2017-12-11 17:23:37 +0000
tags:   [logstash, nginx, filebeat]
author: Alan Wang
---
2017-12-12 15:16:58.105 [http-nio-30010-exec-368] ERROR o.springframework.boot.web.support.ErrorPageFilter - Cannot forward to error page for request [/wms/rf/invQuery/getLocInventorys] as the response has already been committed. As a result, the response may have the wrong status code. If your application is running on WebSphere Application Server you may be able to resolve this problem by setting com.ibm.ws.webcontainer.invokeFlushAfterService to false
org.apache.catalina.connector.ClientAbortException: java.io.IOException: Broken pipe
	at org.apache.catalina.connector.OutputBuffer.realWriteBytes(OutputBuffer.java:393)


sshpass -p TongtianxiaoAdmin803 ssh 121.199.167.84 -o StrictHostKeyChecking=no -l root -o ProxyCommand='sshpass -p TongtianxiaoAdmin803 ssh 101.37.88.54 -o StrictHostKeyChecking=no -l root -W %h:%p'"


## 为Nginx增加Json日志

```perl
log_format json '{"@timestamp":"$time_iso8601",'
                  '"host":"$server_addr",'
                  '"clientip":"$remote_addr",'
                  '"remote_user":"$remote_user",'
                  '"request":"$request",'
                  '"http_user_agent":"$http_user_agent",'
                  '"size":$body_bytes_sent,'
                  '"responsetime":$request_time,'
                  '"uct":$upstream_connect_time,'
                  '"uht":$upstream_header_time ,'
                  '"upstreamtime":"$upstream_response_time",'
                  '"upstreamhost":"$upstream_addr",'
                  '"http_host":"$host",'
                  '"url":"$uri",'
                  '"domain":"$host",'
                  '"xff":"$http_x_forwarded_for",'
                  '"referer":"$http_referer",'
                  '"status":"$status"}';
access_log logs/access.log json;

```

## Filebeat 配置

```yml
# vim /etc/filebeat/filebeat.yml

filebeat.prospectors:

- input_type: log
    paths:
        - /usr/local/nginx/logs/zixun.oupeng.com.access.log
    document_type: zixun-nginx-access 

- input_type: log
  paths:
    - /usr/local/nginx/logs/water.oupeng.com.access.log
  document_type: water-nginx-access
  
output.logstash:
  hosts: ["192.168.3.56:5044","192.168.3.49:5044","192.168.3.57:5044"]
  loadbalance: true
```

## 测试配置

```sh
filebeat.sh --help
filebeat.sh -configtest -e
```

## Logstash pipline

```ruby
# vim /etc/logstash/conf.d/nginx.conf
input {
  beats {
    port => 5044
    codec => "json"
  }
}

output {
    if [type] == "zixun-nginx-access" {
    elasticsearch {
        hosts => ["192.168.3.56:9200","192.168.3.49:9200","192.168.3.57:9200"]
        index => "zixun-nginx-access-%{+YYYY.MM.dd}"
        document_type => "%{[@metadata][type]}"
        template_overwrite => true
        user => elastic
        password => Monkey
    }}
    if [type] == "water-nginx-access" {
    elasticsearch {
        hosts => ["192.168.3.56:9200","192.168.3.49:9200","192.168.3.57:9200"]
        index => "water-nginx-access-%{+YYYY.MM.dd}"
        document_type => "%{[@metadata][type]}"
        template_overwrite => true
        user => elastic
        password => Monkey
    }}   
}
```


---

- [debian安装filebeat5.5收集nginx日志](https://www.cnblogs.com/keithtt/p/7143970.html)
- [Nginx: Setting Up the Access Log](https://www.nginx.com/resources/admin-guide/logging-and-monitoring/)