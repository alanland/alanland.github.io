---
title:  "Github Pages locally with Jekyll"
date:   2017-05-15 19:27:37
tags:   [jekyll, github-pages]
categories: [Blog]
---
可以搭建一个本地的Jekyll服务器，查看你的Github Pages。

### Requirements
Check whether you have Ruby 2.1.0 or higher installed:

```sh
$ ruby --version
ruby 2.X.X

$ gem install bundler
```

### Install Jekyll using Bundler
`Gemfile`

```sh
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```

```sh
bundle install
```

### 安装 Jekyll 到用户下面而不是全局

```bash
gem install --user-install bundler jekyll
export PATH=$HOME/.gem/ruby/X.X.0/bin:$PATH
gem env
```

### 指定目录安装并运行

```bash
bundle install --path vendor/bundle && bundle exec jekyll server --trace
```


### Build your local Jekyll site

```sh
bundle exec jekyll serve
```

### Keeping your site up to date with the GitHub Pages gem
```sh
bundle update github-pages
# or simply
bundle update
```

---
END


---

- https://jekyllrb.com/docs/installation/macos/
