module.exports = {
  "title": "365Days",
  "description": "",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    noFoundPageByTencent: false,
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "华为",
            "link": "/docs/theme-reco/huawei/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        // "",
        // "theme",
        // "plugin",
        // "api",

        "huawei/",
        {
          title: '运维',
          collapsable: true,
          children: [
            "huawei/o-release-flow",
            "huawei/o-hardware",
            "huawei/o-deploy",
            "huawei/o-ops",
          ]
        },
        {
          title: '架构',
          collapsable: true,
          children: [
            "huawei/t-performance",
            "huawei/t-architecture",
            "huawei/t-datamodel",
            "huawei/t-scale",
            "huawei/t-api",
            "huawei/t-concurrence",
            "huawei/t-logic",
            "huawei/t-reliability",
          ]
        },
        {
          title: '安全',
          collapsable: true,
          children: [
            "huawei/t-performance",
            "huawei/t-architecture",
            "huawei/t-datamodel",
            "huawei/t-scale",
            "huawei/t-api",
            "huawei/t-concurrence",
            "huawei/t-logic",
            "huawei/t-reliability",
          ]
        },
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 20,
    "lastUpdated": "Last Updated",
    "author": "Alan",
    "authorAvatar": "/avatar.jpg",
    "record": "xxxx",
    "startYear": "2010"
  },
  "markdown": {
    "lineNumbers": true
  },
  plugins: [
    [
      "ribbon",
      {
        size: 90, // 彩带的宽度，默认为 90
        opacity: 0.8, // 彩带的不透明度，默认为 0.3
        zIndex: -9999, // 彩带的 z-index 属性，默认值为 -1
      },
    ],
  ],
}