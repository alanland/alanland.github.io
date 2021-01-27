---
title:  "Mongo User"
date:   2017-08-08 13:57:37
tags:   [mongo]
---
Compose 配置:

```yml
version: '2'
services:
  mongo:
    image:  mongo:3.2.4
    container_name: mongo
    restart: always
    command:
#      - '--bind_ip 127.0.0.1,10.0.133.14'
      - '--rest'
      - '--auth'
    ports:
     - "27017:27017/tcp"
    volumes:
     - /etc/timezone:/etc/timezone
     - /root/app/docker/container_data/mongo:/data/db
```

首先关闭`--auth`参数:

运行python脚本, 
```shell
python mongo-user.py your-user your-pass db1 db2 db3 db4
```

```python

# pip install pymongo

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
# db = client.test
# db.dropDatabase()

client.admin.add_user('alan', 'wang', roles=[{'role': 'userAdminAnyDatabase', 'db': 'admin'}])

import sys  
  
if __name__=='__main__':
    user = sys.argv[1]
    password = sys.argv[2]
    print('user: '+user)
    print('pass: '+password)
    for dbName in sys.argv[3:]:
        print('db: ' + dbName)
        db = client.get_database(dbName)
        db.add_user(user, password, roles=[{'role': 'readWrite', 'db': dbName}])
        db.authenticate(user, password)
        db.test.insert_one({'db': db.name})
```

---
END
