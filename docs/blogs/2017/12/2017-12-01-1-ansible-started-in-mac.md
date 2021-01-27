---
title:  "Ansible started in MacOS"
date:   2017-12-01 13:23:37
tags:   [macos, ansible]
categories: [DevOps]
---

## isa

```
ssh-keygen -t rsa -C "yourname@yourdomain.ext"
# pbcopy < ~/.ssh/id_rsa.pub
```

## cfg
`~/.ansible.cfg`

```ini
[defaults]
host_key_checking = False
```

## inventory

```ini
[{hosts}]
{ip}    ansible_port={port} ansible_user={username}    ansible_ssh_pass={password} ansible_su_pass={password} ansible_sudu_pass={password}
```

## playbook

```yml
---
- hosts: all
  gather_facts: yes
  become: yes
  become_user: root
  become_method: sudo
  vars:
    # created with:
    # python -c 'import crypt; print crypt.crypt("This is my password", "$1$SomeSalt$")'
    deployer: user
    password: $1Jyoua3yijYo115w

  tasks:
#
#  - name: get the username running the deploy
#    local_action: command whoami
#    register: ansible_local_user

  - name: current local user
    run_once: True
    set_fact:
      ansible_local_user: "{{ lookup('pipe', 'id -un') | d(lookup('pipe', 'whoami'), True) | d(lookup('env', 'USER'), True) |  d(lookup('env', 'user'), True) |  d(lookup('env', 'LOGNAME'), True) }}"
    failed_when: ansible_local_user == ''

  - debug: var=ansible_local_user
  - debug: var=ansible_distribution


  - name: Make sure we have a {{deployer}} group, {{ansible_local_user}}
    group: 
      name: "{{deployer}}"
      state: present
  
  - name: Allow {{deployer}} group to have passwordless sudo
    lineinfile:
      dest: /etc/sudoers
      state: present
      regexp: "^%{{deployer}}"
      line: "%{{deployer}} ALL=(ALL:ALL) ALL"

  - name: Add sudoers users to {{deployer}} group
    user: 
      name: "{{deployer}}"
      comment: "TTX Deployer"
      password: "{{password}}"
      shell: /bin/bash
      group: "{{deployer}}"
      groups: sudo
      append: no
      state: present 
      createhome: yes
      generate_ssh_key: yes
      ssh_key_bits: 2048
      ssh_key_file: .ssh/id_rsa

  - name: check if /Users/user/ existed
    local_action: stat path="/Users/{{ansible_local_user}}"
    become: no
    register: mac_user_stat
  - debug: var=mac_user_stat

  - name: check if /home/user/ existed
    local_action: stat path="/home/{{ansible_local_user}}"
    register: linux_user_stat
    become: no
  - debug: var=linux_user_stat

  - debug:
      msg: "Linux: {{ linux_user_stat.stat.exists }} "
  - debug:
      msg: "Mac: {{ mac_user_stat.stat.exists }} "


  - name: Mac Set up authorized keys for the deployer user
    authorized_key:
      user: "{{deployer}}"
      key: "{{item}}"
    with_file:
      - /Users/{{ansible_local_user}}/.ssh/id_rsa.pub
    when: mac_user_stat.stat.exists

  - name: Linux Set up authorized keys for the deployer user
    authorized_key: 
      user: "{{deployer}}"
      key: "{{item}}"
    with_file:
      - /home/{{ansible_local_user}}/.ssh/id_rsa.pub
    when: linux_user_stat.stat.exists
```

里面增加了linux、macos系统的判断。
