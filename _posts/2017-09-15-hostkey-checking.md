---
layout: post
title:  "Disable host key checking"
date:   2017-09-15 12:57:37 +0000
tags:   [ansible]
author: Alan Wang
---
错误: 
> "Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.

Ansible 1.2.1 版本之后默认进行 host key checking.

- If a host is reinstalled and has a different key in ‘known_hosts’, this will result in an error message until corrected.
- If a host is not initially in ‘known_hosts’ this will result in prompting for confirmation of the key, which results in an interactive experience if using Ansible, from say, cron. You might not want this.

If you understand the implications and wish to disable this behavior, you can do so by editing `/etc/ansible/ansible.cfg` or `~/.ansible.cfg`:

```ini
[defaults]
host_key_checking = False
```

Alternatively this can be set by the `ANSIBLE_HOST_KEY_CHECKING` environment variable:

```shell
$ export ANSIBLE_HOST_KEY_CHECKING=False
```

---
- http://docs.ansible.com/ansible/latest/intro_getting_started.html#host-key-checking

---
END
