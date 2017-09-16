---
layout: post
title:  "Flask: Blueprints"
date:   2017-09-16 09:57:37 +0000
tags:   [flask, python]
author: Alan Wang
---

Flask 的 Blueprints 可以让我们来模块化的组织路由,代码,资源文件和静态文件.

下面是官方解释的中文翻译:

> 把一个应用分解为一个蓝图的集合。这对大型应用是理想的。一个项目可以实例化一个应用对象，初始化几个扩展，并注册一集合的蓝图。
> 以 URL 前缀和/或子域名，在应用上注册一个蓝图。 URL 前缀/子域名中的参数即成为这个蓝图下的所有视图函数的共同的视图参数（默认情况下）。
> 在一个应用中用不同的 URL 规则多次注册一个蓝图。
> 通过蓝图提供模板过滤器、静态文件、模板和其它功能。一个蓝图不一定要实现应用或者视图函数。
> 初始化一个 Flask 扩展时，在这些情况中注册一个蓝图。

## First Blueprint

```python
from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

simple_page = Blueprint('simple_page', __name__,
                        template_folder='templates')

@simple_page.route('/', defaults={'page': 'index'})
@simple_page.route('/<page>')
def show(page):
    try:
        return render_template('pages/%s.html' % page)
    except TemplateNotFound:
        abort(404)
```

## Registering Blueprints

```python
from flask import Flask
from yourapplication.simple_page import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)
```

生成的路由如下: 

```
[<Rule '/static/<filename>' (HEAD, OPTIONS, GET) -> static>,
 <Rule '/<page>' (HEAD, OPTIONS, GET) -> simple_page.show>,
 <Rule '/' (HEAD, OPTIONS, GET) -> simple_page.show>]
```

指定前缀:

```python
app.register_blueprint(simple_page, url_prefix='/pages')
```

生成的路由如下:

```python
[<Rule '/static/<filename>' (HEAD, OPTIONS, GET) -> static>,
 <Rule '/pages/<page>' (HEAD, OPTIONS, GET) -> simple_page.show>,
 <Rule '/pages/' (HEAD, OPTIONS, GET) -> simple_page.show>]
```

## 资源文件

**Blueprint** 的第二个参数一般是 `__name__`, 这个参数表明了python模块或者包名.

可以通过**Blueprint.root_path**属性来看 resource folder:

```shell
>>> simple_page.root_path
'/Users/username/TestProject/yourapplication'
```

打开这个目录下的文件可以用`open_resource()`:

```python
with simple_page.open_resource('static/style.css') as f:
    code = f.read()
```

## 静态文件

```python
admin = Blueprint('admin', __name__, static_folder='static')
```

默认都在 `blueprint + /static` 下面.

```python
url_for('admin.static', filename='style.css')
```

## 模板

```python
admin = Blueprint('admin', __name__, template_folder='templates')
```

在`admin`这个 blueprint 下渲染 `admin/index.html`, 需要提供 `yourapplication/admin/templates/admin/index.html`.

```
yourpackage/
    blueprints/
        admin/
            templates/
                admin/
                    index.html
            __init__.py
```

## 查找Urls

```
url_for('admin.index')
```

也可以用相对路径:

```
url_for('.index')
```

---
Links:

- [Modular Applications with Blueprints](http://flask.pocoo.org/docs/0.12/blueprints/)
- http://docs.jinkan.org/docs/flask/blueprints.html)
- [如何理解flask中的蓝本？](https://www.zhihu.com/question/31748237/answer/55313054)


---
END
