---
title:  "Aliyun Install Helm"
date:   2019-05-20 11:23:37 +0000
tags:   [kubernetes, helm, aliyun]
categories: [DevOps]
---

## 本地安装 Helm
- https://github.com/helm/helm/blob/master/docs/install.md?spm=a2c63.p38356.879954.12.1d62b5f9rkeyz2&file=install.md

```sh
brew install kubernetes-helm
```

配置repo

```sh
helm init --client-only --stable-repo-url https://aliacs-app-catalog.oss-cn-hangzhou.aliyuncs.com/charts/
helm repo add incubator https://aliacs-app-catalog.oss-cn-hangzhou.aliyuncs.com/charts-incubator/
helm repo update
```
## 查看 Version
```sh
helm version
```
## 升级tiller
根据本地的版本号

```sh
helm init --tiller-image registry.cn-hangzhou.aliyuncs.com/acs/tiller:v2.11.0 --upgrade
```

其中镜像地址可使用对应region的vpc域名，比如杭州region的机器就可以替换为registry-vpc.cn-hangzhou.aliyuncs.com/acs/tiller:v2.11.0

## Helm 常用命令

```sh
helm list # ls
helm repo list
helm search 
helm search 存储库名称 #如 stable 或 incubator
helm search chart名称 #如 wordpress 或 spark
helm repo update
helm install --name wordpress-test stable/wordpress
helm upgrade wordpress-test stable/wordpress
helm delete wordpress-test
helm delete --purge wordpress-test

# 本地文件安装
helm install --name rabbitmq --namespace public-service -f stable/rabbitmq-ha/values.yaml stable/rabbitmq-ha
helm upgrade rabbitmq  --namespace public-service -f stable/rabbitmq-ha/values.yaml stable/rabbitmq-ha

```

```sh
helm search
helm search mysql
helm inspect stable/mysql
helm inspect chart stable/mysql
helm inspect values stable/mysql
helm install -f config.yaml --name mysql stable/mysql
helm get values mysql
helm rollback mysql 1
helm delete mysql
helm del --purge mysql
```

可以在 https://kubeapps.com/ 上查找第三方高质量的Chart。


--- 


- [Helm 手动升级](https://www.alibabacloud.com/help/zh/doc-detail/87014.html?spm=a2c5t.10695662.1996646101.searchclickresult.228316b17uGQ6O)
- https://www.alibabacloud.com/help/zh/doc-detail/85935.htm
- [利用 Helm 简化应用部署](https://www.alibabacloud.com/help/zh/doc-detail/86511.html?spm=a2c5t.11065259.1996646101.searchclickresult.6ba37e1cw0AnZ3)
- [Helm 使用](https://whmzsu.github.io/helm-doc-zh-cn/quickstart/using_helm-zh_cn.html)