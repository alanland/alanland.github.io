(window.webpackJsonp=window.webpackJsonp||[]).push([[239],{950:function(e,s,a){"use strict";a.r(s);var r=a(6),t=Object(r.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"手动释放"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#手动释放"}},[e._v("#")]),e._v(" 手动释放")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sync")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" /proc/sys/vm/drop_caches\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# To free pagecache:")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" /proc/sys/vm/drop_caches\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# To free dentries and inodes:")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" /proc/sys/vm/drop_caches\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# To free pagecache, dentries and inodes:")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("echo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" /proc/sys/vm/drop_caches\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("h2",{attrs:{id:"free-命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#free-命令"}},[e._v("#")]),e._v(" free 命令")]),e._v(" "),a("p",[a("code",[e._v("free")]),e._v(" 命令：")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("free")]),e._v(" -h\n             total       used       "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("free")]),e._v("     shared    buffers     cached\nMem:           31G        15G        16G        18M       728M       "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("5")]),e._v(".9G\n-/+ buffers/cache:       "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("8")]),e._v(".8G        22G\nSwap:           0B         0B         0B\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("p",[e._v("第一行：")]),e._v(" "),a("ul",[a("li",[e._v("total：物理内存的总大小")]),e._v(" "),a("li",[e._v("used：已经使用的物理内存大小")]),e._v(" "),a("li",[e._v("free：空闲的物理内存大小")]),e._v(" "),a("li",[e._v("shared：多个进程共享的内存大小")]),e._v(" "),a("li",[e._v("buffers/cached：磁盘缓存的大小")])]),e._v(" "),a("p",[e._v("第二行"),a("code",[e._v("Mem")]),e._v(": 代表物理内存使用情况")]),e._v(" "),a("p",[e._v("第三行"),a("code",[e._v("(-/+ buffers/cached)")]),e._v(": 代表磁盘缓存使用状态")]),e._v(" "),a("ul",[a("li",[e._v("-buffers/cache (已用)的内存数:used - buffers - cached")]),e._v(" "),a("li",[e._v("+buffers/cache(可用)的内存数:free + buffers + cached")])]),e._v(" "),a("p",[e._v("第四行"),a("code",[e._v("Swap")]),e._v(": 表示交换空间内存使用状态")]),e._v(" "),a("h2",{attrs:{id:""}},[a("a",{staticClass:"header-anchor",attrs:{href:"#"}},[e._v("#")]),e._v(" ---")]),e._v(" "),a("p",[e._v("free命令输出的内存状态，可以通过两个角度来查看：一个是从内核的角度来看，一个是从应用层的角度来看的。")]),e._v(" "),a("p",[e._v("从内核的角度来查看内存的状态")]),e._v(" "),a("p",[e._v("就是内核目前可以直接分配到，不需要额外的操作，即为上面free命令输出中第二行Mem项的值，可以看出，此系统物理内存有3894036K，空闲的内存只有420492K，也就是40M多一点，我们来做一个这样的计算：")]),e._v(" "),a("p",[e._v("3894036 – 3473544 = 420492")]),e._v(" "),a("p",[e._v("其实就是总的物理内存减去已经使用的物理内存得到的就是空闲的物理内存大小，注意这里的可用内存值420492并不包含处于buffers和cached状态的内存大小。")]),e._v(" "),a("p",[e._v("如果你认为这个系统空闲内存太小，那你就错了，实际上，内核完全控制着内存的使用情况，Linux会在需要内存的时候，或在系统运行逐步推进时，将buffers和cached状态的内存变为free状态的内存，以供系统使用。")]),e._v(" "),a("p",[e._v("从应用层的角度来看系统内存的使用状态")]),e._v(" "),a("p",[e._v("也就是Linux上运行的应用程序可以使用的内存大小，即free命令第三行 -/+ buffers/cached 的输出，可以看到，此系统已经使用的内存才2068224K，而空闲的内存达到1825812K，继续做这样一个计算：")]),e._v(" "),a("p",[e._v("420492＋（72972＋1332348）＝1825812")]),e._v(" "),a("p",[e._v("通过这个等式可知，应用程序可用的物理内存值是Mem项的free值加上buffers和cached值之和，也就是说，这个free值是包括buffers和cached项大小的，"),a("code",[e._v("对于应用程序来说，buffers/cached占有的内存是可用的，因为buffers/cached是为了提高文件读取的性能，当应用程序需要用到内存的时候，buffers/cached会很快地被回收，以供应用程序使用")]),e._v("。")]),e._v(" "),a("p",[e._v("buffers与cached的异同")]),e._v(" "),a("p",[e._v("在Linux 操作系统中，当应用程序需要读取文件中的数据时，操作系统先分配一些内存，将数据从磁盘读入到这些内存中，然后再将数据分发给应用程序；当需要往文件中写数据时，操作系统先分配内存接收用户数据，然后再将数据从内存写到磁盘上。然而，如果有大量数据需要从磁盘读取到内存或者由内存写入磁盘时，系统的读写性能就变得非常低下，因为无论是从磁盘读数据，还是写数据到磁盘，都是一个很消耗时间和资源的过程，在这种情况下，Linux引入了buffers和cached机制。")]),e._v(" "),a("p",[e._v("buffers与cached都是内存操作，用来保存系统曾经打开过的文件以及文件属性信息，这样当操作系统需要读取某些文件时，会首先在buffers与cached内存区查找，如果找到，直接读出传送给应用程序，如果没有找到需要数据，才从磁盘读取，这就是操作系统的缓存机制，通过缓存，大大提高了操作系统的性能。但buffers与cached缓冲的内容却是不同的。")]),e._v(" "),a("p",[a("code",[e._v("buffers是用来缓冲块设备做的，它只记录文件系统的元数据（metadata）以及 tracking in-flight pages，而cached是用来给文件做缓冲")]),e._v("。更通俗一点说：buffers主要用来存放目录里面有什么内容，文件的属性以及权限等等。而cached直接用来记忆我们打开过的文件和程序。")]),e._v(" "),a("hr"),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://blog.csdn.net/heweimingming/article/details/52230293",target:"_blank",rel:"noopener noreferrer"}},[e._v("linux内存中buffer和 cached的比较"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://linux.cn/article-211-1.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("手动释放linux内存cache"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=t.exports}}]);