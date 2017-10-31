---
layout: post
title:  "SqlAlchemy Tutorial 1"
date:   2017-10-31 04:57:37 +0000
tags:   [python, sqlalchemy]
author: Alan Wang
---

## Version Check

```python
import sqlalchemy
print(sqlalchemy.__version__)
# 1.2.0
```

## Connecting `create_engine`

```python
from sqlalchemy import create_engine
engine = create_engine('sqlite:///:memory:', echo=True)
````

The return value of `create_engine()` is an instance of `Engine`.

### Lazy Connecting

The **first time** a method like `Engine.execute()` or `Engine.connect()`
is called, the Engine establishes a real DBAPI connection to the database,
which is then used to emit the SQL.

## Declare a Mapping

```python
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
from sqlalchemy import Column, Integer, String
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)

    def __repr__(self):
       return "<User(name='%s', fullname='%s', password='%s')>" % (
                            self.name, self.fullname, self.password)
```

A class using Declarative at a minimum needs a `__tablename__` attribute,
and at least one `Column`.

## Create a Schema

We can see the `Table` object by inspecting the `__table__` attribute:

```python
>>> User.__table__
Table('users', MetaData(bind=None),
            Column('id', Integer(), table=<users>, primary_key=True, nullable=False),
            Column('name', String(), table=<users>),
            Column('fullname', String(), table=<users>),
            Column('password', String(), table=<users>), schema=None)
```

The `Table` object is a member of a larger collection known as `MetaData`.
When using Declarative, this object is available using
the `.metadata` attribute of our declarative base class.

We call the `Metadata.create_all` method to create real database tables,
passing in our `engine` as a source of database connection.

```python
>>> Base.metadata.create_all(engine)
SELECT ...
PRAGMA table_info("users")
()
CREATE TABLE users (
    id INTEGER NOT NULL, name VARCHAR,
    fullname VARCHAR,
    password VARCHAR,
    PRIMARY KEY (id)
)
()
COMMIT
```

## Create an Instance of the Mapped Class

```python
>>> ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
>>> ed_user.name
'ed'
>>> ed_user.password
'edspassword'
>>> str(ed_user.id)
'None' # default value
```

SQLAlchemy’s instrumentation normally produces this **default value**
for column-mapped attributes when first accessed.

## Creating a Session

```python
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)
```
```
Session = sessionmaker()
Session.configure(bind=engine)  # once engine is available
```

## Adding and Updating Objects

### `session.add`

```python
ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
session.add(ed_user)
```

At this point, we say that the instance is `pending`,
no SQL is issued and the object is not represented by row in database.

The `Session` will issued the SQL to persist `ed_user` as soon as in need,
using a process known as `flash`. If we query the database for `Ed Jones`,
all pending information will first be flushed, and the query is issued
immediately thereafter.

ps: 任何该表的查询都会`flush`.

```python
>>> our_user = session.query(User).filter_by(name='ed').first()
>>> our_user
<User(name='ed', fullname='Ed Jones', password='edspassword')>
```

```python
>>> ed_user is our_user
True
```

### `session.all_all`

```python
>>> session.add_all([
    User(name='wendy', fullname='Wendy Williams', password='foobar'),
    User(name='mary', fullname='Mary Contrary', password='xxg527'),
    User(name='fred', fullname='Fred Flinstone', password='blah')])
```

change the password,

```python
>>> ed_user.password = 'f8s7ccs'
```

and the `Session` is paying attention. It knows, some object has been modified:

`session.dirty`

```python
>>> session.dirty
IdentitySet([<User(name='ed', fullname='Ed Jones', password='f8s7ccs')>])
```

and there three new User objects are `pending`:

`session.new`

```python
>>> session.new
IdentitySet([<User(name='wendy', fullname='Wendy Williams', password='foobar')>,
<User(name='mary', fullname='Mary Contrary', password='xxg527')>,
<User(name='fred', fullname='Fred Flinstone', password='blah')>])
```

```pythno
session.commit()
```

### Four Session Object States

- transient,
- pending,
- and persistent

## Rolling Back

```python
ed_user.name = 'Edwardo'
fake_user = User(name='fakeuser', fullname='Invalid', password='12345')
session.add(fake_user)
session.query(User).filter(User.name.in_(['Edwardo', 'fakeuser'])).all()
# [<User(name='Edwardo', fullname='Ed Jones', password='f8s7ccs')>, <User(name='fakeuser', fullname='Invalid', password='12345')>]

session.rollback()
print( ed_user.name)
# u'ed'

print(fake_user in session)
# False

session.query(User).filter(User.name.in_(['ed', 'fakeuser'])).all()
# [<User(name='ed', fullname='Ed Jones', password='f8s7ccs')>]
```

## Querying

A `Query` object is created using the `query()` method on `Session`.

```python
for instance in session.query(User).order_by(User.id):
    print(instance.name, instance.fullname)
```

```python
for name, fullname in session.query(User.name, User.fullname):
    print(name, fullname)
```

```python
for row in session.query(User, User.name).all():
   print(row.User, row.name)
```

```python
for row in session.query(User.name.label('name_label')).all():
   print(row.name_label)
```

```python
from sqlalchemy.orm import aliased
user_alias = aliased(User, name='user_alias')

SQL>>> for row in session.query(user_alias, user_alias.name).all():
   print(row.user_alias)
```

```python
for u in session.query(User).order_by(User.id)[1:3]:
   print(u)
```

```python
for name, in session.query(User.name).\
            filter_by(fullname='Ed Jones'):
   print(name)
```

```python
for name, in session.query(User.name).\
            filter(User.fullname=='Ed Jones'):
   print(name)
```

```python
for user in session.query(User).\
         filter(User.name=='ed').\
         filter(User.fullname=='Ed Jones'):
   print(user)
```

### Common Filter Operators

- equals:
    ```python
    query.filter(User.name == 'ed')
    ```
- not equals:
    ```python
    query.filter(User.name != 'ed')
    ```
- LIKE:
    ```python
    query.filter(User.name.like('%ed%'))
    ```
- ILIKE (case-insensitive LIKE):
    ```python
    query.filter(User.name.ilike('%ed%'))
    ```
- IN:
    ```python
    query.filter(User.name.in_(['ed', 'wendy', 'jack']))
    query.filter(User.name.in_(
        session.query(User.name).filter(User.name.like('%ed%'))
    ))
    ```
- NOT IN:
    ```python
    query.filter(~User.name.in_(['ed', 'wendy', 'jack']))
    ```
- IS NULL:
    ```python
    query.filter(User.name == None)
    # alternatively, if pep8/linters are a concern
    query.filter(User.name.is_(None))
    ```
- IS NOT NULL:
    ```python
    query.filter(User.name != None)
    # alternatively, if pep8/linters are a concern
    query.filter(User.name.isnot(None))
    ```
- AND:
    ```python
    # use and_()
    from sqlalchemy import and_
    query.filter(and_(User.name == 'ed', User.fullname == 'Ed Jones'))
    # or send multiple expressions to .filter()
    query.filter(User.name == 'ed', User.fullname == 'Ed Jones')
    # or chain multiple filter()/filter_by() calls
    query.filter(User.name == 'ed').filter(User.fullname == 'Ed Jones')
    ```
- OR:
    ```python
    from sqlalchemy import or_
    query.filter(or_(User.name == 'ed', User.name == 'wendy'))
    ```
- MATCH:
    ```python
    query.filter(User.name.match('wendy'))
    ```






---

- [Object Relational Tutorial](http://docs.sqlalchemy.org/en/latest/orm/tutorial.html)

END

