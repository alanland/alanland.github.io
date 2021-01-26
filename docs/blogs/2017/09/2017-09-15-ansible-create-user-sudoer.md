---
layout: post
title:  "Ansible create user with SUDO privilege"
date:   2017-09-15 11:57:37 +0000
tags:   [ansible]
author: Alan Wang
---
## 直接给 sudo group

```yml
- name: create a new user
    user: name=user
          state=present
          group=primary-group
          groups="sudo"
          password={{ password }}
          comment="Comment"
```

## Best Pratice

根据 [Ansible: best practice for maintaining list of sudoers](https://stackoverflow.com/questions/33359404/ansible-best-practice-for-maintaining-list-of-sudoers)：　

> As for adding users to /etc/sudoers this is best done by adding users to necessary groups and then giving these groups the relevant access to sudo. This holds true when you aren't using Ansible too.

> The user module allows you to specify an exclusive list of group or to simply append the specified groups to the current ones that the user already has. This is naturally idempotent as a user cannot be defined to be in a group multiple times.

```yml
- hosts: all
  vars:
    sudoers:
      - user1
      - user2
      - user3
  tasks:
    - name: Make sure we have a 'wheel' group
      group:
        name: wheel
        state: present

    - name: Allow 'wheel' group to have passwordless sudo
      lineinfile:
        dest: /etc/sudoers
        state: present
        regexp: '^%wheel'
        line: '%wheel ALL=(ALL) NOPASSWD: ALL'
        validate: visudo -cf %s

    - name: Add sudoers users to wheel group
      user:
        name: "{{ item }}"
        groups: wheel
        append: yes
      with_items: "{{ sudoers }}"
```

单独添加一个用户：
```yml
- name: Make sure we have a 'wheel' group
  group:
    name: wheel
    state: present

- name: Allow 'wheel' group to have passwordless sudo
  lineinfile:
    dest: /etc/sudoers
    state: present
    regexp: '^%wheel'
    line: '%wheel ALL=(ALL) NOPASSWD: ALL'

- name: Add sudoers users to wheel group
  user: name=deployer groups=wheel append=yes state=present createhome=yes


- name: Set up authorized keys for the deployer user
  authorized_key: user=deployer key="{{item}}"
  with_file:
    - /home/railsdev/.ssh/id_rsa.pub
```
And the best part is that the solution is idempotent. It doesn't add the line

```shell
%wheel ALL=(ALL) NOPASSWD: ALL
```

to `/etc/sudoers` when the playbook is run a subsequent time. And yes...I was able to ssh into the server as "deployer" and run sudo commands without having to give a password.

## 新增时指定密码 [stackoverflow](https://stackoverflow.com/questions/19292899/creating-a-new-user-and-password-with-ansible)

There you'll see that your password must be hashed.
```yaml
- hosts: all
  user: root
  vars:
    # created with:
    # python -c 'import crypt; print crypt.crypt("This is my Password", "$1$SomeSalt$")'
    password: $1$SomeSalt$UqddPX3r4kH3UL5jq5/ZI.

  tasks:
    - user: name=tset password={{password}}
```
If your playbook or ansible command line has your password as-is in plain text, this means your password hash recorded in your shadow file is wrong. That means when you try to authenticate with your password its hash will never match.

Additionally, see Ansible FAQ regarding some nuances of password parameter and how to correctly use it.

---
- [官方Github例子](https://github.com/ansible/ansible-examples/blob/master/language_features/user_commands.yml)
- [Ansible: best practice for maintaining list of sudoers](https://stackoverflow.com/questions/33359404/ansible-best-practice-for-maintaining-list-of-sudoers)
- [Ansible: create a user with sudo privileges](https://stackoverflow.com/questions/37333305/ansible-create-a-user-with-sudo-privileges)
- [Creating a new user and password with Ansible](https://stackoverflow.com/questions/19292899/creating-a-new-user-and-password-with-ansible)
---
END
