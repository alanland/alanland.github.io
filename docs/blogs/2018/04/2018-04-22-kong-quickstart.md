---
title:  "Kong 0.12 Quick Start"
date:   2018-04-22 08:23:37
tags:   [kong]
---
## 1. Add your API using the Admin API

```sh
$ curl -i -X POST \
  --url http://localhost:8001/apis/ \
  --data 'name=example-api' \
  --data 'hosts=example.com' \
  --data 'upstream_url=http://mockbin.org'
```

You should see a similar response from that request:
```js
HTTP/1.1 201 Created
Content-Type: application/json
Connection: keep-alive

{
  "created_at": 1488830759000,
  "hosts": [
      "example.com"
  ],
  "http_if_terminated": false,
  "https_only": false,
  "id": "6378122c-a0a1-438d-a5c6-efabae9fb969",
  "name": "example-api",
  "preserve_host": false,
  "retries": 5,
  "strip_uri": true,
  "upstream_connect_timeout": 60000,
  "upstream_read_timeout": 60000,
  "upstream_send_timeout": 60000,
  "upstream_url": "http://mockbin.org"
}
```

## 2. Forward your requests through Kong

```sh
$ curl -i -X GET \
  --url http://localhost:8000/ \
  --header 'Host: example.com'
```

## Enabling Plugins
### 1. Configure the key-auth plugin for your API
```sh
$ curl -i -X POST \
  --url http://localhost:8001/apis/example-api/plugins/ \
  --data 'name=key-auth'
```

### 2. Verify that the plugin is properly configured
```sh
$ curl -i -X GET \
  --url http://localhost:8000/ \
  --header 'Host: example.com'
```
```sh
HTTP/1.1 401 Unauthorized
Date: Sun, 22 Apr 2018 01:23:51 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
WWW-Authenticate: Key realm="kong"
Server: kong/0.12.3
```

## Adding Consumers
### 1. Create a Consumer through the RESTful API
```sh
$ curl -i -X POST \
  --url http://localhost:8001/consumers/ \
  --data "username=Jason"
```
```js
HTTP/1.1 201 Created
Content-Type: application/json
Connection: keep-alive

{
  "username": "Jason",
  "created_at": 1428555626000,
  "id": "bbdf1c48-19dc-4ab7-cae0-ff4f59d87dc9"
}
```

### 2. Provision key credentials for your Consumer
```sh
$ curl -i -X POST \
  --url http://localhost:8001/consumers/Jason/key-auth/ \
  --data 'key=ENTER_KEY_HERE'
```

### 3. Verify that your Consumer credentials are valid
```sh
$ curl -i -X GET \
  --url http://localhost:8000 \
  --header "Host: example.com" \
  --header "apikey: ENTER_KEY_HERE"
```

---
- https://getkong.org/docs/0.13.x/getting-started/quickstart/
- https://getkong.org/docs/0.12.x/getting-started/adding-your-api/