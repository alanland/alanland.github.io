---
title:  "MacOS Openresty"
date:   2018-08-28 10:23:37 +0000
tags:   [js]
---

The RTCPeerConnection interface allow you to create a WebRTC connection between your computer and a remote peer. However, we are going to create an **"interrupted"** version of it in order to retrieve the IP of the client using only javascript.

The createOffer method initiates the creation of a session description protocol (SDP) which offer information about any MediaStreamTracks attached to the WebRTC session, session, codes and any candidates already gathered by the ICE agents (which contains our goal, the IP).

In older versions, this method uses callbacks. However, now return a value based in a Promise that returns the information that we need when fullfilled:

```js
/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// Usage

getUserIP(function(ip){
    alert("Got IP! :" + ip);
});
```

## 通过三方服务获取 Public IP

```js
$.getJSON('http://ipinfo.io', function(data){
    console.log(data);
});
```

ipinfo的Api接口：

- https://api.ipify.org	text	11.111.111.111	?
- https://api.ipify.org?format=json	json	{"ip":"11.111.111.111"}	?
- https://api.ipify.org?format=jsonp	jsonp	callback({"ip":"11.111.111.111"});	?
- https://api.ipify.org?format=jsonp&callback=getip	jsonp	getip({"ip":"11.111.111.111"});

### 使用 JSONP

```html
<script type="application/javascript">
  function getIP(json) {
    document.write("My public IP address is: ", json.ip);
  }
</script>

<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
```

### 使用JQuery

```html
$.getJSON('https://api.ipify.org?format=json', function(data){
    console.log(data.ip);
});
```

---

- 来源: [ourcodeworld](https://ourcodeworld.com/articles/read/257/how-to-get-the-client-ip-address-with-javascript-only)
