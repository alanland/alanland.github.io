---
title:  "Flask: Streaming Content"
date:   2017-09-16 01:57:37
tags:   [flask, python]
categories: [Python]
---

## Basic Usage

```python
from flask import Response

@app.route('/large.csv')
def generate_large_csv():
    def generate():
        for row in iter_all_rows():
            yield ','.join(row) + '\n'
    return Response(generate(), mimetype='text/csv')
```

## Streaming from Templates

```python
from flask import Response

def stream_template(template_name, **context):
    app.update_template_context(context)
    t = app.jinja_env.get_template(template_name)
    rv = t.stream(context)
    rv.enable_buffering(5)
    return rv

@app.route('/my-large-page.html')
def render_large_template():
    rows = iter_all_rows()
    return Response(stream_template('the_template.html', rows=rows))
```

## Streaming with Context

每隔.5秒显示一个单词.

```python
@app.route('/stream')
def streamed_response():
    import time
    def generate():
        yield 'Hello '
        time.sleep(.5)
        yield 'Hello '
        time.sleep(.5)
        yield 'Hello '
        time.sleep(.5)
        yield request.args['name']
        time.sleep(.5)
        yield '!'
    return Response(stream_with_context(generate()))
```

Without the `stream_with_context()` function you would get a `RuntimeError` at that point

---
Links:

- [Document](http://flask.pocoo.org/docs/0.12/patterns/streaming/)

---
END
