---
title:  "Run Ansible Task Background (Daemon Mode)"
date:   2018-04-17 09:23:37 +0000
tags:   [ansible]
---

有尝试过用`shell`执行`nohup`命令，测试了几种方式都失败，比如：
- 平时的运行方式
  ```yml
  - name: Start daemon
    shell: nohup myexeprogram arg1 arg2 &
  ```
- Stackoverflow上: [ansible run command on remote host in background](https://stackoverflow.com/questions/39347379/ansible-run-command-on-remote-host-in-background)
  ```yml
  - hosts: centos-target
    gather_facts: no
    tasks:
      - shell: "(cd /; python -mSimpleHTTPServer >/dev/null 2>&1 &)"
        async: 10
        poll: 0
  ```
  ```yml
  - name: start simple http server in background
    shell: cd /tmp/www; nohup python -mSimpleHTTPServer </dev/null >/dev/null 2>&1 &
  ```

最终找到解释，使用`&`执行程序并不会让程序成为deamon，只是后台运行，包括nohup一样。

- 如果程序是C程序，可以调用`daemon()`方法。
- 其他程序可以使用 [daemon](http://libslack.org/daemon/manpages/daemon.1.html) 程序来实现

  ```yml
  - name: Start daemon
    shell: daemon -- myexeprogram arg1 arg2
  ```

[Springboot作为服务运行](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/deployment-install.html#deployment-service)中的方案，测试后启动失败，可能还差了什么吧。

### As init.d service

```sh
sudo link -s /var/myapp/myapp.jar /etc/init.d/myapp
# or
sudo ln -s ~/myproject/build/libs/myapp-1.0.jar /etc/init.d/myapp_servicename
```
then: 
```sh
/etc/init.d/myapp start
```

### As a systemd service

```ini
[Unit]
Description=myapp
After=syslog.target

[Service]
ExecStart=/var/myapp/myapp.jar

[Install]
WantedBy=multi-user.target
```

---
Links: 
- [Daemonizing an executable in ansible](https://stackoverflow.com/questions/29806673/daemonizing-an-executable-in-ansible)
