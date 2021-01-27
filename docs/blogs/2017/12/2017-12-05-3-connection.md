---
title:  "Connection Refused"
date:   2017-12-05 10:23:37
tags:   [tomcat, http, tcp, connection]
---

## connection refused

A "connection refused" message means that something was unable to open a network connection at the transport level.

This most likely means that the service you are trying to talk to is not listening for new connections on the specific IP and port number that were used in the connection attempt.

Check:

- That the request that is being refused is using the correct IP and port number.
- That your tomcat service is properly configured to listen on that IP and port.

Bear in mind that your system may have multiple IP addresses, and you need to listen on each one that you wish to use. Also bear in mind that "local host" is typically a different IP address.

Then if neither of the above is the problem:

- If there is a possibility of network level or local firewalling blocking the traffic, check that.
- If the possibility of "strangeness" due to complicated virtual networking, check that.


