(window.webpackJsonp=window.webpackJsonp||[]).push([[331],{1051:function(e,a,s){"use strict";s.r(a);var t=s(6),n=Object(t.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"kubernetes-安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-安装"}},[e._v("#")]),e._v(" Kubernetes 安装")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("k create ns bi\nk ns bi\nhelm install --name metabase stable/metabase\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('export POD_NAME=$(kubectl get pods --namespace bi -l "app=metabase,release=metabase" -o jsonpath="{.items[0].metadata.name}")\necho "Visit http://127.0.0.1:8080 to use your application"\nkubectl port-forward --namespace bi $POD_NAME 8080:3000\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("h2",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[e._v("#")]),e._v(" 使用")])])}),[],!1,null,null,null);a.default=n.exports}}]);