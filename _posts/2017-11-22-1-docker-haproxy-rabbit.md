---
layout: post
title:  "Docker HAProxy"
date:   2017-11-22 17:23:37 +0000
tags:   [docker, haproxy]
author: Alan Wang
---




```conf
global
  log 127.0.0.1 local0
  log 127.0.0.1 local1 notice
  log-send-hostname
  maxconn 4096
  pidfile /var/run/haproxy.pid
  user haproxy
  group haproxy
  daemon
  stats socket /var/run/haproxy.stats level admin
  ssl-default-bind-options no-sslv3
  ssl-default-bind-ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:AES128-GCM-SHA256:AES128-SHA256:AES128-SHA:AES256-GCM-SHA384:AES256-SHA256:AES256-SHA:DHE-DSS-AES128-SHA:DES-CBC3-SHA
defaults
  balance roundrobin
  log global
  mode tcp
  option redispatch
  option httplog
  option dontlognull
  option forwardfor
  timeout connect 5000
  timeout client 50000
  timeout server 50000
listen stats
  bind :1936
  mode http
  stats enable
  timeout connect 10s
  timeout client 1m
  timeout server 1m
  stats hide-version
  stats realm Haproxy\ Statistics
  stats uri /
  stats auth stats:stats
listen port_5672
  bind :5672
  mode tcp
  server rmq_rmq3_1 rmq_rmq3_1:5672 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:5672 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:5672 check inter 2000 rise 2 fall 3
listen port_15672
  bind :15672
  mode tcp
  server rmq_rmq1_1 rmq_rmq1_1:15672 check inter 2000 rise 2 fall 3
frontend default_port_80
  bind :80
  reqadd X-Forwarded-Proto:\ http
  maxconn 4096
  default_backend default_service
backend default_service
  server rmq_rmq1_1 rmq_rmq1_1:25672 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:4369 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9100 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9101 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9102 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9103 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9104 check inter 2000 rise 2 fall 3
  server rmq_rmq1_1 rmq_rmq1_1:9105 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:15672 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:25672 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:4369 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9100 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9101 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9102 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9103 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9104 check inter 2000 rise 2 fall 3
  server rmq_rmq2_1 rmq_rmq2_1:9105 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:15672 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:25672 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:4369 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9100 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9101 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9102 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9103 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9104 check inter 2000 rise 2 fall 3
  server rmq_rmq3_1 rmq_rmq3_1:9105 check inter 2000 rise 2 fall 3
```