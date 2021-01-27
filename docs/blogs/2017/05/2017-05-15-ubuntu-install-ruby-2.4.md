---
title:  "Install ruby 2.4 in Ubuntu"
date:   2017-05-15 13:27:37
tags:   [ubuntu, ruby]
categories: [DevOps]
---
更新Ruby版本为2.4：

```
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.4 ruby2.4-dev
ruby2.4 -v
ruby -v
```

多版本安装请参考： [https://gorails.com/setup/ubuntu/16.04](https://gorails.com/setup/ubuntu/16.04)


---
END
