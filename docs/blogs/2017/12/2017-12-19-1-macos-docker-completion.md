---
title:  "MacOS Docker Bash Completion"
date:   2017-12-19 09:23:37
tags:   [macos, docker]
categories: [DevOps]
---


然后使用brew安装bash-completion：

brew install bash-completion



Alans-MacBook-Pro:~ alan$ brew info bash-completion
bash-completion: stable 1.3 (bottled)
Programmable completion for Bash 3.2
https://bash-completion.alioth.debian.org/
Conflicts with:
  bash-completion@2 (because Differing version of same formula)
/usr/local/Cellar/bash-completion/1.3_3 (189 files, 608.2KB) *
  Poured from bottle on 2017-12-19 at 09:23:26
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/bash-completion.rb
==> Caveats
Add the following line to your ~/.bash_profile:
  [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d




执行以下命令下载补全脚本，并保存到bash-completion的配置目录中：

curl -L https://raw.githubusercontent.com/docker/docker/v$(docker version -f "{{.Client.Version}}")/contrib/completion/bash/docker -o /usr/local/etc/bash_completion.d/docker