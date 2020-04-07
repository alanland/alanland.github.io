---
layout: post
title:  "Kubelet 增加参数"
date:   2020-01-07T14:59:29.625Z
tags:   [k8s, kubelet]
categories: [Tools]
author: Alan Wang
---

cd /etc/systemd/system/kubelet.service.d
cp 10-kubeadm.conf 10-kubeadm.conf.back
vi 10-kubeadm.conf

--anonymous-auth=false

systemctl stop kubelet
Warning: kubelet.service changed on disk. Run 'systemctl daemon-reload' to reload units.
systemctl daemon-reload
systemctl stop kubelet
systemctl start kubelet
ps -ef | grep kubelet | grep auth


异常原因配置错误
异常影响未认证的匿名用户访问kubelet可能造成集群信息泄露
修复建议检查--anonymous-auth是否设置为false，请设置为false



## 

v1beta1.custom.metrics.k8s.io
  Api Service 异常

kubectl get apiservice v1beta1.metrics.k8s.io -o yaml
apiVersion: apiregistration.k8s.io/v1
kind: APIService
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"apiregistration.k8s.io/v1beta1","kind":"APIService","metadata":{"annotations":{},"name":"v1beta1.metrics.k8s.io"},"spec":{"group":"metrics.k8s.io","groupPriorityMinimum":100,"insecureSkipTLSVerify":true,"service":{"name":"metrics-server","namespace":"kube-system"},"version":"v1beta1","versionPriority":100}}
  creationTimestamp: "2019-04-17T08:26:26Z"
  name: v1beta1.metrics.k8s.io
  resourceVersion: "2924742605"
  selfLink: /apis/apiregistration.k8s.io/v1/apiservices/v1beta1.metrics.k8s.io
  uid: 7e51e961-60ea-11e9-aa25-eed95802c543
spec:
  group: metrics.k8s.io
  groupPriorityMinimum: 100
  insecureSkipTLSVerify: true
  service:
    name: metrics-server
    namespace: kube-system
  version: v1beta1
  versionPriority: 100
status:
  conditions:
  - lastTransitionTime: "2020-01-07T06:58:40Z"
    message: all checks passed
    reason: Passed
    status: "True"
    type: Available
    
    
kubectl  get  apiservice
NAME                                        SERVICE                                            AVAILABLE                  AGE
v1.                                         Local                                              True                       264d
v1.apps                                     Local                                              True                       264d
v1.authentication.k8s.io                    Local                                              True                       264d
v1.authorization.k8s.io                     Local                                              True                       264d
v1.autoscaling                              Local                                              True                       264d
v1.batch                                    Local                                              True                       264d
v1.networking.k8s.io                        Local                                              True                       264d
v1.rbac.authorization.k8s.io                Local                                              True                       264d
v1.storage.k8s.io                           Local                                              True                       264d
v1alpha1.admissionregistration.k8s.io       Local                                              True                       264d
v1alpha1.authentication.istio.io            Local                                              True                       236d
v1alpha1.autoscaling.internal.knative.dev   Local                                              True                       70d
v1alpha1.caching.internal.knative.dev       Local                                              True                       70d
v1alpha1.certmanager.k8s.io                 Local                                              True                       236d
v1alpha1.jobs.aliyun.com                    Local                                              True                       2h
v1alpha1.kiali.io                           Local                                              True                       236d
v1alpha1.kubeapps.com                       Local                                              True                       232d
v1alpha1.log.alibabacloud.com               Local                                              True                       264d
v1alpha1.monitoring.kiali.io                Local                                              True                       236d
v1alpha1.networking.internal.knative.dev    Local                                              True                       70d
v1alpha1.rbac.istio.io                      Local                                              True                       236d
v1alpha1.serving.knative.dev                Local                                              True                       70d
v1alpha2.config.istio.io                    Local                                              True                       236d
v1alpha3.networking.istio.io                Local                                              True                       236d
v1beta1.admissionregistration.k8s.io        Local                                              True                       264d
v1beta1.alicloud.com                        Local                                              True                       264d
v1beta1.apiextensions.k8s.io                Local                                              True                       264d
v1beta1.apps                                Local                                              True                       264d
v1beta1.authentication.k8s.io               Local                                              True                       264d
v1beta1.authorization.k8s.io                Local                                              True                       264d
v1beta1.batch                               Local                                              True                       264d
v1beta1.certificates.k8s.io                 Local                                              True                       264d
v1beta1.coordination.k8s.io                 Local                                              True                       264d
v1beta1.custom.metrics.k8s.io               knative-serving/autoscaler                         False (MissingEndpoints)   70d
v1beta1.events.k8s.io                       Local                                              True                       264d
v1beta1.extensions                          Local                                              True                       264d
v1beta1.istio.alibabacloud.com              Local                                              True                       236d
v1beta1.metrics.k8s.io                      kube-system/metrics-server                         True                       264d
v1beta1.policy                              Local                                              True                       264d
v1beta1.rbac.authorization.k8s.io           Local                                              True                       264d
v1beta1.scheduling.k8s.io                   Local                                              True                       264d
v1beta1.servicecatalog.k8s.io               catalog/aliacs-service-catalog-catalog-apiserver   True                       230d
v1beta1.storage.k8s.io                      Local                                              True                       264d
v1beta2.apps                                Local                                              True                       264d
v2beta1.autoscaling                         Local                                              True                       264d
v2beta2.autoscaling                         Local                                              True                       264d


---
- https://blog.csdn.net/wiborgite/article/details/52863913
