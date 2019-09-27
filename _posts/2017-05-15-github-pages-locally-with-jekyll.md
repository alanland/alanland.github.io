---
layout: post
title:  "Github Pages locally with Jekyll"
date:   2017-05-15 19:27:37 +0000
tags:   [jekyll, github-pages]
author: Alan Wang
---
可以搭建一个本地的Jekyll服务器，查看你的Github Pages。

## Requirements
Check whether you have Ruby 2.1.0 or higher installed:

```sh
$ ruby --version
ruby 2.X.X

$ gem install bundler
```

## Install Jekyll using Bundler
`Gemfile`

```sh
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```

```sh
bundle install
```

## Build your local Jekyll site

```sh
bundle exec jekyll serve
```

## Keeping your site up to date with the GitHub Pages gem
```sh
bundle update github-pages
# or simply
bundle update
```

---
END
