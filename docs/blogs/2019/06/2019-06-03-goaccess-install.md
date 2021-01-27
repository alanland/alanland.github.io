---
title:  "GoAccess Install"
date:   2019-06-03 12:28:37
tags:   [linux, nginx, goaccess]
---


```sh

sudo apt-get install libncursesw5-dev
wget https://tar.goaccess.io/goaccess-1.3.tar.gz
tar -xzvf goaccess-1.3.tar.gz
cd goaccess-1.3/
./configure --enable-utf8 --enable-geoip=legacy \
    --prefix=/home/ttx/app/goaccess/goaccess
make
make install
```


```
 wget -O .goaccessrc https://raw.githubusercontent.com/allinurl/goaccess/master/config/goaccess.conf --no-check-certificate
 
logformat='{"@timestamp":"$time_iso8601","host":"$server_addr","clientip":"$remote_addr","remote_user":"$remote_user","request":"$request","http_user_agent":"$http_user_agent","size":$body_bytes_sent,"responsetime":$request_time,"uct":"$upstream_connect_time","uht":"$upstream_header_time","upstreamtime":"$upstream_response_time","upstreamhost":"$upstream_addr","http_host":"$host","url":"$uri","domain":"$host","xff":"$http_x_forwarded_for","referer":"$http_referer","status":"$status"}'

goaccess -c -f access.log --log-format='{"@timestamp":"$time_iso8601","host":"$server_addr","clientip":"$remote_addr","remote_user":"$remote_user","request":"$request","http_user_agent":"$http_user_agent","size":$body_bytes_sent,"responsetime":$request_time,"uct":"$upstream_connect_time","uht":"$upstream_header_time","upstreamtime":"$upstream_response_time","upstreamhost":"$upstream_addr","http_host":"$host","url":"$uri","domain":"$host","xff":"$http_x_forwarded_for","referer":"$http_referer","status":"$status"}'
```