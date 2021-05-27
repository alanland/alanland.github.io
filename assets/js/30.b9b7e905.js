(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{607:function(t,e,v){t.exports=v.p+"assets/img/mem1.29076526.png"},608:function(t,e,v){t.exports=v.p+"assets/img/mem2.18ffd8ed.png"},790:function(t,e,v){"use strict";v.r(e);var o=v(6),_=Object(o.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("p",[t._v("最近服务器上有暴露一些内存问题，几个Tomcat Docker在某些业务场景内存使用会很大，然后超过DContainer的mem limit，\n最终程序挂掉。")]),t._v(" "),o("p",[t._v("刚开始以为程序有问题，于是用Idea限制内存跑了一下。用 Spring Boot Admin 看了下实施的内存，发现内存回收\n的很及时，也只用了"),o("code",[t._v("400M")]),t._v("不到的内存，而线上环境动辄几个G都能OOM。")]),t._v(" "),o("p",[t._v("排除了程序的原因，我把程序打包放到Tomcat里面，同样测试之后，也只用了几百M的内存，没有一直上升的迹象。")]),t._v(" "),o("p",[t._v("最后放在容器上面，不测不知道，一测吓一跳，主要有两个问题。")]),t._v(" "),o("ol",[o("li",[t._v("容器停止后CPU等资源一下子就释放了，但是内存不释放，不管是"),o("code",[t._v("kill")]),t._v("掉还是"),o("code",[t._v("rm")]),t._v("掉都不释放。")])]),t._v(" "),o("ul",[o("li",[t._v("这就简介导致了，重启容器后容器内存占用会在原来的基础上增加")]),t._v(" "),o("li",[t._v("当时也不是一直不是放，大概十分钟之后会释放")])]),t._v(" "),o("ol",{attrs:{start:"2"}},[o("li",[t._v("Tomcat占用比如400M内存，随着系统运行容器内存会一直上升，直至超过容器限制，然后容器就挂了。")])]),t._v(" "),o("p",[t._v("网络上查找发现很多人都遇到相同的问题，去github上能看到很多相关的issue，有些人的解决方案是环境变量里加上")]),t._v(" "),o("div",{staticClass:"language- line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[t._v("MALLOC_ARENA_MAX=4\n")])]),t._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[t._v("1")]),o("br")])]),o("p",[t._v("但是有些人不管用，比如我测试下来这个并不能解决容器内存比Tomcat内存多很多的问题，可能能抑制其增长速度并偶尔让容器回收。")]),t._v(" "),o("p",[t._v("最后的解决方案呢，"),o("code",[t._v("先放弃Docker吧")]),t._v("。")]),t._v(" "),o("p",[t._v("放两张截图：")]),t._v(" "),o("p",[t._v("Tomcat上限500M，而容器的占用：")]),t._v(" "),o("p",[o("img",{attrs:{src:v(607),alt:""}})]),t._v(" "),o("p",[t._v("这个不知道什么情况，偶尔内存占用有点下降：")]),t._v(" "),o("p",[o("img",{attrs:{src:v(608),alt:""}})]),t._v(" "),o("hr"),t._v(" "),o("p",[t._v("下面是相关的一些链接：")]),t._v(" "),o("ul",[o("li",[o("p",[t._v("http://stackoverflow.com/questions/24374854/docker-can-you-over-allocate-ram-tomcat")])]),t._v(" "),o("li",[o("p",[t._v("https://github.com/moby/moby/issues/32788")])]),t._v(" "),o("li",[o("p",[t._v("https://forums.docker.com/t/docker-and-java-dont-mix/21772")])]),t._v(" "),o("li",[o("p",[t._v("http://hg.openjdk.java.net/jdk9/jdk9/hotspot/rev/5f1d1df0ea49")])]),t._v(" "),o("li",[o("p",[t._v("http://trustmeiamadeveloper.com/2016/03/18/where-is-my-memory-java")])]),t._v(" "),o("li",[o("p",[t._v("https://developers.redhat.com/blog/2017/03/14/java-inside-docker")])]),t._v(" "),o("li",[o("p",[t._v("https://plumbr.eu/outofmemoryerror/gc-overhead-limit-exceeded")])]),t._v(" "),o("li")]),t._v(" "),o("hr"),t._v(" "),o("p",[t._v("END")])])}),[],!1,null,null,null);e.default=_.exports}}]);