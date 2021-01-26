---
title:  "SpringOauth"
date:   2018-05-24 12:23:37 +0000
tags:   [pac4j]
categories: [Java]
---


password 验证

https://dzone.com/articles/secure-spring-rest-with-spring-security-and-oauth2

curl -X POST \
  http://localhost:8080/oauth/token \
  -H 'authorization: Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA==' \
  -F grant_type=password \
  -F username=admin \
  -F password=admin1234 \
  -F client_id=spring-security-oauth2-read-write-client

Use `DaoAuthenticationProvider` to find user:


