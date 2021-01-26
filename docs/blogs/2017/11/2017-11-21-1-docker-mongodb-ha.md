---
title:  "MongoDB HA use Docker"
date:   2017-11-21 13:23:37 +0000
tags:   [docker, mongodb, ha, cluster]
---

export mongo1=192.168.95.164
export mongo2=192.168.95.170
export mongo3=192.168.95.171

docker run -d \
    -p 27017:27017 \
    --name mongo \
    --add-host "mongo1:192.168.95.164" \
    --add-host "mongo2:192.168.95.170" \
    --add-host "mongo3:192.168.95.171" \
    mongo:3.2.4 mongod --replSet my-mongo-set


# mongo1
docker exec -it mongo mongo


```
root@ubuntu:/app# docker exec -it mongo mongo
MongoDB shell version: 3.2.4
connecting to: test
Server has startup warnings:
2017-11-21T07:46:53.832+0000 I CONTROL  [initandlisten]
2017-11-21T07:46:53.833+0000 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2017-11-21T07:46:53.833+0000 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-11-21T07:46:53.833+0000 I CONTROL  [initandlisten]
2017-11-21T07:46:53.833+0000 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.
2017-11-21T07:46:53.834+0000 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2017-11-21T07:46:53.834+0000 I CONTROL  [initandlisten]
> db = (new Mongo('localhost:27017')).getDB('test')
test
> rs.initiate({
...   "_id" : "my-mongo-set",
...   "members" : [
...         {"_id" : 0, "host" : "mongo1:27017"},
...         {"_id" : 1, "host" : "mongo2:27017"},
...         {"_id" : 2, "host" : "mongo3:27017"}
...     ]})
{ "ok" : 1 }
```

如果出现错误：

```
{
    "ok" : 0,
    "errmsg" : "No host described in new configuration 1 for replica set my-mongo-set maps to this node",
    "code" : 93
}
```

表示host地址不存在，`ping`以下测试看看。

参数：

- `"_id" : "my-mongo-set",`的值要和启动参数的`--replSet`一样，
- `members`配置项列出所有参与replica set的机器


此时我们发现 shell prompt变成

```
my-mongo-set:OTHER>
```

表名我们现在位于 replset 中的 OTHER。

执行插入和查询，注意提示的变化：

```
my-mongo-set:OTHER> db.mycollection.insert({name : 'sample'})
WriteResult({ "nInserted" : 1 })
my-mongo-set:PRIMARY> db.mycollection.find()
{ "_id" : ObjectId("5a13e02737765db5bc7e37d8"), "name" : "sample" }
```

我们连接 mongo2 的数据库：

```
my-mongo-set:PRIMARY> db2 = (new Mongo('mongo2:27017')).getDB('test')
test
my-mongo-set:PRIMARY> db2.setSlaveOk()
my-mongo-set:PRIMARY> db2.mycollection.find()
{ "_id" : ObjectId("5a13e02737765db5bc7e37d8"), "name" : "sample" }
```

`setSlaveOk()` 命令告诉控制台我们不希望在 primary 数据库里面查询。

连接 mongo3，看到如果不设置`setSlaveOk`则报错：

```
my-mongo-set:PRIMARY>
test
my-mongo-set:PRIMARY> db3.mycollection.find()
Error: error: { "ok" : 0, "errmsg" : "not master and slaveOk=false", "code" : 13435 }
my-mongo-set:PRIMARY> db3.setSlaveOk()
my-mongo-set:PRIMARY> db3.mycollection.find()
{ "_id" : ObjectId("5a13e02737765db5bc7e37d8"), "name" : "sample" }
my-mongo-set:PRIMARY>
```

## 生产环境需要注意的问题

- 创建用户密码
- 使用 volume 存储数据


## docker-compose

```yaml
version: '2'
services:

  mongo:
    image:  mongo:3.2.4
    container_name: mongo
    restart: always
    command: mongod --replSet my-mongo-set
    ports:
     - "27017:27017/tcp"
    volumes:
     - /etc/timezone:/etc/timezone
     - /root/app/docker/container_data/mongo:/data/db
    extra_hosts:
     - "mongo1:192.168.95.164"
     - "mongo2:192.168.95.170"
     - "mongo3:192.168.95.171"

```

- [Docs / Replication](https://docs.mongodb.com/manual/replication/)
- [Creating a MongoDB replica set using Docker ](http://www.sohamkamani.com/blog/2016/06/30/docker-mongo-replica-set/)
- [Deploy a MongoDB Cluster in 9 steps Using Docker](https://medium.com/@gargar454/deploy-a-mongodb-cluster-in-steps-9-using-docker-49205e231319)
