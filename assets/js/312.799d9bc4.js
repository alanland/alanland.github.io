(window.webpackJsonp=window.webpackJsonp||[]).push([[312],{1028:function(s,t,e){"use strict";e.r(t);var a=e(6),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("div",{staticClass:"language-sh line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" libncursesw5-dev\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://tar.goaccess.io/goaccess-1.3.tar.gz\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -xzvf goaccess-1.3.tar.gz\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" goaccess-1.3/\n./configure --enable-utf8 --enable-geoip"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("legacy "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    --prefix"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/home/ttx/app/goaccess/goaccess\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(' wget -O .goaccessrc https://raw.githubusercontent.com/allinurl/goaccess/master/config/goaccess.conf --no-check-certificate\n \nlogformat=\'{"@timestamp":"$time_iso8601","host":"$server_addr","clientip":"$remote_addr","remote_user":"$remote_user","request":"$request","http_user_agent":"$http_user_agent","size":$body_bytes_sent,"responsetime":$request_time,"uct":"$upstream_connect_time","uht":"$upstream_header_time","upstreamtime":"$upstream_response_time","upstreamhost":"$upstream_addr","http_host":"$host","url":"$uri","domain":"$host","xff":"$http_x_forwarded_for","referer":"$http_referer","status":"$status"}\'\n\ngoaccess -c -f access.log --log-format=\'{"@timestamp":"$time_iso8601","host":"$server_addr","clientip":"$remote_addr","remote_user":"$remote_user","request":"$request","http_user_agent":"$http_user_agent","size":$body_bytes_sent,"responsetime":$request_time,"uct":"$upstream_connect_time","uht":"$upstream_header_time","upstreamtime":"$upstream_response_time","upstreamhost":"$upstream_addr","http_host":"$host","url":"$uri","domain":"$host","xff":"$http_x_forwarded_for","referer":"$http_referer","status":"$status"}\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);