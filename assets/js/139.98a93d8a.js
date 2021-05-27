(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{832:function(a,n,s){"use strict";s.r(n);var e=s(6),t=Object(e.a)({},(function(){var a=this,n=a.$createElement,s=a._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[s("strong",[a._v("Package, dependency and environment management for any language:\nPython, R, Ruby, Lua, Scala, Java, Javascript, C/ C++, FORTRAN")])]),a._v(" "),s("ul",[s("li",[s("p",[s("a",{attrs:{href:"https://github.com/conda/conda",target:"_blank",rel:"noopener noreferrer"}},[a._v("Github"),s("OutboundLink")],1)])]),a._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://conda.io/docs/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Conda Docs"),s("OutboundLink")],1)])]),a._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://conda.io/docs/user-guide/install/download.html#",target:"_blank",rel:"noopener noreferrer"}},[a._v("下载地址"),s("OutboundLink")],1)])]),a._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://conda.io/docs/user-guide/install/download.html#anaconda-or-miniconda",target:"_blank",rel:"noopener noreferrer"}},[a._v("Anaconda or Miniconda?"),s("OutboundLink")],1)])])]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda create -n venv "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3.5")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" activate venv\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -c https://conda.anaconda.org/menpo opencv3\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -c conda-forge tensorflow\npip "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -r requirements.txt\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br")])]),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda --version\nconda update conda\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("env")]),a._v(" --help\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("env")]),a._v(" list\n\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# search python")]),a._v("\nconda search python\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# create env")]),a._v("\nconda create --name snakes "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# conda create --name snakes python=3.6")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" activate snakes\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# verify env")]),a._v("\nconda info --envs\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# verify python version")]),a._v("\npython --version\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# use a different version of python")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" activate snowflakes\npython --version\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# create a python 3.6 eviroment")]),a._v("\nconda create -n py36 "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3.6")]),a._v(" anaconda\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#  you can specify the exact package and Python versions, for example, numpy=1.7 or python=3.6.")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# update python: eg: 3.4.2 -> 3.4.3")]),a._v("\nconda update python\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# upgrade: eg: 3.4 -> 3.6")]),a._v("\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3.6")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br"),s("span",{staticClass:"line-number"},[a._v("21")]),s("br"),s("span",{staticClass:"line-number"},[a._v("22")]),s("br"),s("span",{staticClass:"line-number"},[a._v("23")]),s("br"),s("span",{staticClass:"line-number"},[a._v("24")]),s("br"),s("span",{staticClass:"line-number"},[a._v("25")]),s("br"),s("span",{staticClass:"line-number"},[a._v("26")]),s("br"),s("span",{staticClass:"line-number"},[a._v("27")]),s("br"),s("span",{staticClass:"line-number"},[a._v("28")]),s("br"),s("span",{staticClass:"line-number"},[a._v("29")]),s("br"),s("span",{staticClass:"line-number"},[a._v("30")]),s("br"),s("span",{staticClass:"line-number"},[a._v("31")]),s("br"),s("span",{staticClass:"line-number"},[a._v("32")]),s("br"),s("span",{staticClass:"line-number"},[a._v("33")]),s("br")])]),s("h2",{attrs:{id:"managing-packages"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#managing-packages"}},[a._v("#")]),a._v(" Managing packages")]),a._v(" "),s("h3",{attrs:{id:"list-all-packages"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#list-all-packages"}},[a._v("#")]),a._v(" List all packages")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda list\nconda list -n snowflakes\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("h3",{attrs:{id:"search-for-a-package"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#search-for-a-package"}},[a._v("#")]),a._v(" Search for a package")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda search beautiful-soup\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h3",{attrs:{id:"install-a-package-to-current-env"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#install-a-package-to-current-env"}},[a._v("#")]),a._v(" Install a package(to current env)")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" --name bunnies beautiful-soup\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" activate bunnies\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("h3",{attrs:{id:"install-a-package-from-anaconda-org"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#install-a-package-from-anaconda-org"}},[a._v("#")]),a._v(" Install a package from Anaconda.org")]),a._v(" "),s("p",[a._v("In a browser, go to "),s("code",[a._v("http://anaconda.org")]),a._v(".\nTo find the package named “bottleneck” enter that\nsearch term in the top left box named “Search Packages.”")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" -c pandas bottleneck\nconda list\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("h3",{attrs:{id:"package-remove"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#package-remove"}},[a._v("#")]),a._v(" Package remove")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda remove --name bunnies iopro\nconda list\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("hr"),a._v(" "),s("p",[a._v("Links:")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://conda.io/miniconda.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Miniconda"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://conda.io/docs/installation.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Install"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://anaconda.org/",target:"_blank",rel:"noopener noreferrer"}},[a._v("anaconda"),s("OutboundLink")],1)]),a._v(" "),s("li",[a._v("http://ahogrammer.com/2016/11/15/deep-learning-enables-you-to-hide-screen-when-your-boss-is-approaching/")]),a._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/Hironsan/BossSensor",target:"_blank",rel:"noopener noreferrer"}},[a._v("BossSensor"),s("OutboundLink")],1)])]),a._v(" "),s("hr"),a._v(" "),s("p",[a._v("END")])])}),[],!1,null,null,null);n.default=t.exports}}]);