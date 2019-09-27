Cloud Foundry
Kubernetes

2013 Docker项目发布开始

- One Process One Container
- Some JVM Options not Work in Container
- 

## Physical Machine > Virtual Machine > Container
- Development & Opeartion
- Network, Storage, OS, Schedule, Distribution

# Linux 进城模型 之余容器本身  好的茶树盒山对于茶叶

## Before 2013 后端技术 & 云计算
- IaaS: AWS  OpenStack
- PaaS: Cloud Foundry 事实标准, OpenShift


-  PaaS时代的到来？

dotCloud, Heroku, Pivotal, Red Hat

dotCloud 决定开源自己的容器项目 Docker

## 容器
不是 Docker 发明的
in Cloud Foundry, 容器就是其底层，无人关注的一部分

## PaaS 、 openresty
- 主要特点 应用托管 能力
之前 - 虚拟机和云计算已经成熟切普遍应用

租AWS或者OpenStack机器，佣管理物理机的方式，手动或者自动的部署应用

痛点，云端和本地部署的环境不一致问题
so：谁能 更好的模拟本地服务器环境 - 更好的云体验

在这个历史环境里面，OpenResty 出现；
https://www.jianshu.com/p/101235edcb4e


```sh
cf push wms
cf push wms -i 1 -m 1G -p ./xwms.war
```

核心：应用打包盒分发机制

push 用户可执行文件和启动脚本打包上传到存储， 选择虚拟机，下载启动

通一个虚拟器执行不同应用时  Cgroups Namespace 为每个应用创建一个沙河隔离环境，运行。  由此，互不干涉的批量，自动运行

Docker实际和Clound Foundry的容器或者说沙河没什么区别

But

Docker项目发布几个月之后，活了。就跟直播一样，不知道为啥就或了

而且，由于速度太快，CloudFundry还没来的及反应，就Out了


## 我们不一样

大部分功能、实现原理都一样，也是后来 Docker 大行其道的主要特点

不一样  Image

CF：push简单，But 每个语言，应用、版本维护一搭好的包，供push使用，在Paas中运行起来可能会要做很多工作

## Docker镜像
- 完整的操作系统所有文件和目录
so 环境一样  开发测试生产都不会有问题

so 只需要本地开发测试好这个压缩包，上传后就不会有问题

=》 本地和云上一毛一样


```
# local
docker build myimage
```

```
# cloud or anywhere
docker run myimage
```


仅仅加了个打包机制， Paas时代结束了

## 紧跟时代的 CaaS 公司们

## 2014 DockerCon -> Swarm

Docker的巅峰时代

## 杨过，这个平平的男子

dotCloud -》 Docker


# 群雄

CoreOS 基础设施创业公司，吧Docker概念无缝继承到自己的产品中

段时间成为Docker的第二重要力量

But  2014年底，芈月结束。CoreOS宣布停止合作，推出 Rocket/ rkt

为了公司发展，Docker也要占有PaaS市场，平台化发展方向

Swarm
- 

2014.6  Google Kubernetes

2014-2015 容器社区最热闹的时候，我们在这个时候也推进Docker化

2015.6.22  Libcontainer 捐出  RunC 项目，大家一起玩 -》 OCI 标准
2017 Docker Runtime (Contained) 捐献给 CNCF
    Docker to Moby
2017 Docker EE embeded Kubernetes

2018 3 28  Docker CTO 离职


#  


# 进程

## 程序是什么

编程语言编写 -》 二进制文件  计算机认识的0合1

程序需要的输入 比如读取文件等
文件和二进制程序放到磁盘上

就可以运行了

操作系统  从·程序·发现要打开文件， 此时把文件加载到内存
操作系统 读到算法逻辑  命令让 CPU 完成运算，  
CPU合内存协作进行计算， 寄存器存放数值， 内存对战保存命令合变量

也就是，程序执行后，程序二进制 编程内存数据，寄存器值，对战指令，被打开的文件，设备信息状态的一个集合
这个集合就是进程

- 静态：程序
- 动态：进程

容器的核心技术：
- 约束合修改进程的动态表现，为其创造出一个边界


# Cgroups 创造约束
# Namespace 修改进程试图

```
$ docker run -it busybox /bin/sh
/ # ps
PID   USER     TIME  COMMAND
    1 root      0:00 /bin/sh
    6 root      0:00 ps
/ #
```
-it  分配一个喂饱你本输入输出终端

### 操作系统

没运行一个程序，操作系统都会分配一个进程编号，类似工号


pid=1 

三个特殊员工

- idle进程(PID = 0), 系统创建的第一个进程，运行在内核态,也是唯一一个没有通过fork或者kernel_thread产生的进程。
- init进程(PID = 1)  系统的初始化. 是系统中所有其它用户进程的祖先进程
- kthreadd(PID = 2)   所有内核线程的调度和管理


```
ps -ef | grep /bin/sh
  501 63266 39563   0  3:47PM ttys016    0:00.06 docker run -it busybox /bin/sh
```

# Namespace 的魔法

eg 操作系统创建进程

int pid = clone(main_func, stack_sien, SIGCHLD, NULL)

int pid = clone(main_func, stack_sien, CLONE_NEWPID| SIGCHLD, NULL)

此时这个新进程会看到一个全新的进程空间，相当于一个分公司，在自己的Namespace里面就是·1号进程，看不到其他Namespace的进程，业看不到宿主机里面的真正进程

## Namespace
- pid
- mount 
- network
- user
- ...

## 核心
通过Namespace限定资源，文件，设备，状态等，让其中的程序看不到不相关的东西


## 虚拟机和容器对比

图1 图2

- 虚拟机自身内存
- 虚拟化软甲拦截和处理的损耗
  - 计算资源，网络，磁盘


- 容器话
 - 还是普通宿主机的进程
 - 不存在单独的计算机资源

方便，快捷，性能好

But  
- 格力不彻底 
- 部分东西不能被namespace
- 共享宿主机内核，安全问题


# 限制

PID Namespace

docker run busybox /bin/sh

进程被格力，看不到
但资源使用是和其他进程平等竞争的，随时占用以及可能被其他宿主机进程占用
和WMS某个tomcat cpu 100%一个道理

## Linux Cgroups 、 Linux Control Group
20006 Google工程师发起，
主要作用： 限制一个进程组能够使用的额资源上线， 包括CPU 内存 磁盘 网络带宽等

和Linux的其他程序一样，操作接口是文件系统

/sys/fs/cgroup

mount -t cgroup

ls /sys/fs/cgroup/cpu

mkdir container

while : ; do : ; done &

$ cat /sys/fs/cgroup/cpu/container/cpu.cfs_quata_us
$ cat /sys/fs/cgroup/cpu/container/cpu.cfs_period_us

echo 20000 > /sys/fs/cgroup/cpu/container/cpu.cfs_quota_us
echo 226 > /sys/fs/cgroup/cpu/container/tasks
