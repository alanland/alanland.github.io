---
title:  "Prometheus Config Reload"
date:   2017-05-16 13:27:37 +0000
tags:   [prometheus]
---
Prometheus can reload its configuration at runtime.
If the new configuration is not well-formed, the changes will not be applied.
A configuration reload is triggered by sending a SIGHUP to the Prometheus process
or sending a HTTP POST request to the `/-/reload` endpoint.
This will also reload any configured rule files.

---
END
