(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{751:function(e,s,r){"use strict";r.r(s);var a=r(6),t=Object(a.a)({},(function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("主页上的介绍：")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://www.docker.com/products/docker-registry",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker Registry"),r("OutboundLink")],1),e._v("  is an open source application dedicated to the storage and distribution of your Docker images.")]),e._v(" "),r("h2",{attrs:{id:"运行-docker-registry-v2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#运行-docker-registry-v2"}},[e._v("#")]),e._v(" 运行 docker registry v2.")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker run -d -p 5000:5000 --restart=always --name registry registry:2\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("h2",{attrs:{id:"tag-image-到你的-registry"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#tag-image-到你的-registry"}},[e._v("#")]),e._v(" Tag image 到你的 registry")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker tag ubuntu localhost:5000/ubuntu\n#or some other name\ndocker tag ubuntu localhost:5000/ubuntu_new_image_name\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br")])]),r("p",[r("code",[e._v("localhost:5000")]),e._v(" 是你的本机地址.")]),e._v(" "),r("p",[e._v("用 "),r("code",[e._v("docker images")]),e._v(" 命令来查看结果")]),e._v(" "),r("h2",{attrs:{id:"push-to-your-registry"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#push-to-your-registry"}},[e._v("#")]),e._v(" push to your registry")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker push localhost:5000/ubuntu\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("h2",{attrs:{id:"pull-in-other-machine"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#pull-in-other-machine"}},[e._v("#")]),e._v(" pull in other machine")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker pull 182.168.xxx.xxx:5000/ubuntu_new_image_name\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("h2",{attrs:{id:"stop-registry"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#stop-registry"}},[e._v("#")]),e._v(" stop registry")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker stop registry && docker rm -v registry\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br")])]),r("h2",{attrs:{id:"启动参数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#启动参数"}},[e._v("#")]),e._v(" 启动参数")]),e._v(" "),r("h3",{attrs:{id:"存储位置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#存储位置"}},[e._v("#")]),e._v(" 存储位置")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("docker run -d -p 5000:5000 --restart=always --name registry \\\n  -v `pwd`/data:/var/lib/registry \\\n  registry:2\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br")])]),r("p",[r("code",[e._v("pwd/data")]),e._v(" 就是你要本机存储的位置。")]),e._v(" "),r("h3",{attrs:{id:"配置文件"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[e._v("#")]),e._v(" 配置文件")]),e._v(" "),r("p",[e._v("指定本地路径（如 "),r("code",[e._v("/home/user/registry-conf")]),e._v(" ）下的配置文件")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("sudo docker run -d -p 5000:5000 \\\n   -v /home/user/registry-conf:/registry-conf \\\n   -e DOCKER_REGISTRY_CONFIG=/registry-conf/config.yml \\\n   registry\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br")])]),r("hr"),e._v(" "),r("p",[e._v("END")])])}),[],!1,null,null,null);s.default=t.exports}}]);