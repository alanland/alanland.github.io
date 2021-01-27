---
title:  "GLIBCXX_3.4.20 not found"
date:   2017-08-08 11:57:37
tags:   [mongo]
categories: [DevOps]
---
Basically, just do the following commands: Firstly, install:

```shell
sudo apt-get install libstdc++6
```

This should already be installed by default, but try it anyway. If it doesn't solve it, just do the following:

```shell
sudo add-apt-repository ppa:ubuntu-toolchain-r/test 
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

I didn't perform the "dist-upgrade" command, but the ones before solved it for me.

---
Links:
- https://askubuntu.com/questions/575505/glibcxx-3-4-20-not-found-how-to-fix-this-error
- https://stackoverflow.com/questions/16605623/where-can-i-get-a-copy-of-the-file-libstdc-so-6-0-15

---
END
