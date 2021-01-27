---
title:  "Ansible Generate Crypted Password for User Module)"
date:   2018-04-17 11:23:37
tags:   [ansible, linux]
categories: [DevOps]
---
The mkpasswd utility that is available on most Linux systems is a great option:

```sh
mkpasswd --method=sha-512
```
If this utility is not installed on your system (e.g. you are using OS X) then you can still easily generate these passwords using Python. First, ensure that the Passlib password hashing library is installed:

```sh
pip install passlib
```
Once the library is ready, SHA512 password values can then be generated as follows:

```sh
python -c "from passlib.hash import sha512_crypt; import getpass; print(sha512_crypt.using(rounds=5000).hash(getpass.getpass()))"
```

---
Links: 
- [How do I generate crypted passwords for the user module?](http://docs.ansible.com/ansible/latest/reference_appendices/faq.html#how-do-i-generate-crypted-passwords-for-the-user-module)
