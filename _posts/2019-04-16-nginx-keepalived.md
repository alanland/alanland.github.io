---
layout: post
title:  "Nginx Keepalived VIP"
date:   2019-04-16 11:23:37 +0000
tags:   [nginx, keepalived, vip]
author: Alan Wang
---

`/etc/keepalived/keepalived.conf`

```conf
! Configuration File for keepalived

global_defs {
   notification_email {
     root@localhost
   }
   notification_email_from kaadmin@localhost
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL
   vrrp_skip_check_adv_addr
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}
vrrp_script chk_nginx {  
    script "/etc/keepalived/nginx_check.sh"  
    interval 2  
    weight -20  
} 

  vrrp_instance VI_1 {
    state BACKUP
    interface ens160
    virtual_router_id 55
    priority 99
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        10.250.62.51
    }
    track_script {  
        chk_nginx  
    }  
}
```

`/etc/keepalived/nginx_check.sh`

```sh
#!/bin/bash  
A=`ps -C nginx -no-header |wc -l`  
if [ $A -eq 1 ];then  
/home/ttx/app/nginx/sbin/nginx
sleep 2  
if [ `ps -C nginx --no-header |wc -l` -eq 1 ];then  
    killall keepalived  
fi  
fi
```