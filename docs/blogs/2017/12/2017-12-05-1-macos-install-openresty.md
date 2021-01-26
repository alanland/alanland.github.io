---
title:  "Install OpenResty in MacOS"
date:   2017-12-05 10:23:37 +0000
tags:   [macos, openresty, nginx]
categories: [DevOps]
---


- `brew install openresty/brew/openresty`
- `sudo mkdir /usr/local/opt`
- `sudo chown -R "$USER":admin /usr/local/opt`

```
Error: /usr/local/opt/pcre not present or broken
```

- `brew link pcre`


```
 ==> Installing openresty from openresty/brew
Error: /usr/local/opt/openresty-openssl not present or broken
Please reinstall openresty/brew/openresty-openssl. Sorry :(
```

- `brew reinstall openresty/brew/openresty-openssl`
- `brew reinstall openresty/brew/openresty`

测试安装成功没有：

```sh
$ resty -e 'print("hello, world!")'
hello, world!
```

应用安装在了

```
ls -al  /usr/local/opt/openresty
lrwxr-xr-x  1 alan  admin  28 Dec  4 11:07 /usr/local/opt/openresty -> ../Cellar/openresty/1.13.6.1
```
```
$ ls /usr/local/Cellar/openresty/1.13.6.1/
COPYRIGHT			lualib
INSTALL_RECEIPT.json		nginx
README.markdown			pod
bin				resty.index
homebrew.mxcl.openresty.plist	site
luajit
```

## 开始一份简单的配置

准备目录：

```
mkdir ~/work
cd ~/work
mkdir logs/ conf/
```

创建配置： `conf/nginx.conf`

```
worker_processes  1;
error_log logs/error.log;
events {
    worker_connections 1024;
}
http {
    server {
        listen 8080;
        location / {
            default_type text/html;
            content_by_lua '
                ngx.say("<p>hello, world</p>")
            ';
        }
    }
}
```

使用nginx：

```sh
export PATH=/usr/local/opt/openresty/nginx/sbin:$PATH
```

启动Server：

```sh
nginx -p `pwd`/ -c conf/nginx.conf
```

访问测试：

```sh
$ curl http://localhost:8080/
<p>hello, world</p>
```

当前的目录结构：

```$ tree
.
├── client_body_temp
├── conf
│   └── nginx.conf
├── fastcgi_temp
├── logs
│   └── error.log
├── proxy_temp
├── scgi_temp
└── uwsgi_temp
```

在MacOS上使用`ab (Apache's benchmark tool)`压了测试

```sh
$ ab -k -c10 -n10000 -t1 -r 'http://127.0.0.1:8080/'
This is ApacheBench, Version 2.3 <$Revision: 1796539 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 5000 requests
Completed 10000 requests
Completed 15000 requests
Completed 20000 requests
Completed 25000 requests
Completed 30000 requests
Completed 35000 requests
Completed 40000 requests
Finished 43735 requests


Server Software:        openresty/1.13.6.1
Server Hostname:        127.0.0.1
Server Port:            8080

Document Path:          /
Document Length:        20 bytes

Concurrency Level:      10
Time taken for tests:   1.000 seconds
Complete requests:      43735
Failed requests:        0
Keep-Alive requests:    43305
Total transferred:      7564005 bytes
HTML transferred:       874700 bytes
Requests per second:    43734.65 [#/sec] (mean)
Time per request:       0.229 [ms] (mean)
Time per request:       0.023 [ms] (mean, across all concurrent requests)
Transfer rate:          7386.66 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     0    0   0.1      0       1
Waiting:        0    0   0.1      0       1
Total:          0    0   0.1      0       1

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      0
  75%      0
  80%      0
  90%      0
  95%      0
  98%      0
  99%      0
 100%      1 (longest request)
 ```

----

- [OpenResty Installation](http://openresty.org/en/installation.html)
- [OpenResty Getting Started](http://openresty.org/en/getting-started.html)
- [Benchmark](http://openresty.org/en/benchmark.html)