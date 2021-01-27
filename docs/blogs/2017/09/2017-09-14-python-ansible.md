---
title:  "Python with Ansible"
date:   2017-09-14 19:57:37
tags:   [ansible, python]
---
写自动化,去看了[官网的API](http://docs.ansible.com/ansible/latest/dev_guide/developing_api.html),发现1.x和2.x真不是那么一回事儿.

1.x的api:
```python
import ansible.runner

runner = ansible.runner.Runner(
   module_name='ping',
   module_args='',
   pattern='web*',
   forks=10
)
datastructure = runner.run()
```

2.0的api真是一个复杂:
```python
#!/usr/bin/env python

import json
from collections import namedtuple
from ansible.parsing.dataloader import DataLoader
from ansible.vars import VariableManager
from ansible.inventory import Inventory
from ansible.playbook.play import Play
from ansible.executor.task_queue_manager import TaskQueueManager
from ansible.plugins.callback import CallbackBase

class ResultCallback(CallbackBase):
    """A sample callback plugin used for performing an action as results come in

    If you want to collect all results into a single object for processing at
    the end of the execution, look into utilizing the ``json`` callback plugin
    or writing your own custom callback plugin
    """
    def v2_runner_on_ok(self, result, **kwargs):
        """Print a json representation of the result

        This method could store the result in an instance attribute for retrieval later
        """
        host = result._host
        print json.dumps({host.name: result._result}, indent=4)

Options = namedtuple('Options', ['connection', 'module_path', 'forks', 'become', 'become_method', 'become_user', 'check'])
# initialize needed objects
variable_manager = VariableManager()
loader = DataLoader()
options = Options(connection='local', module_path='/path/to/mymodules', forks=100, become=None, become_method=None, become_user=None, check=False)
passwords = dict(vault_pass='secret')

# Instantiate our ResultCallback for handling results as they come in
results_callback = ResultCallback()

# create inventory and pass to var manager
inventory = Inventory(loader=loader, variable_manager=variable_manager, host_list='localhost')
variable_manager.set_inventory(inventory)

# create play with tasks
play_source =  dict(
        name = "Ansible Play",
        hosts = 'localhost',
        gather_facts = 'no',
        tasks = [
            dict(action=dict(module='shell', args='ls'), register='shell_out'),
            dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
         ]
    )
play = Play().load(play_source, variable_manager=variable_manager, loader=loader)

# actually run it
tqm = None
try:
    tqm = TaskQueueManager(
              inventory=inventory,
              variable_manager=variable_manager,
              loader=loader,
              options=options,
              passwords=passwords,
              stdout_callback=results_callback,  # Use our custom callback instead of the ``default`` callback plugin
          )
    result = tqm.run(play)
finally:
    if tqm is not None:
        tqm.cleanup()
```

没来得及仔细研究Api想这个例子运行一下,后来看到`茶客furu声`的[如何使用Ansible 2的API做python开发](http://www.jianshu.com/p/8558befb16c1),里面说:

> ansible2.0更贴近于ansible cli的常用命令执行方式，不同于上一版本只能发送单个命令或playbook；而更推荐用户在调用ansibleAPI的时候，将playbook的每个task拆分出来，获取每个task的结果。能够跟灵活处理在执行批量作业过程中的各种反馈。

> - 将执行操作的队列模型，包含各类环境参数设置，归结到“ansible.executor.task_queue_manager”类中
> - 将执行过程中的各个task的设置，或者说playbook中的编排内容，归结到“ansible.playbook.play”中

后面跟了一个例子(原例子有个小问题,还有个参数没用,我稍微该了下,并加入了main方法):

```python
# -*- coding:utf-8 -*-
# !/usr/bin/env python
#
# Author: Shawn.T
# Email: shawntai.ds@gmail.com
#
# this is the Interface package of Ansible2 API
#

from collections import namedtuple
from ansible.parsing.dataloader import DataLoader
from ansible.vars import VariableManager
from ansible.inventory import Inventory
from ansible.playbook.play import Play
from ansible.executor.task_queue_manager import TaskQueueManager
from tempfile import NamedTemporaryFile
import os

class AnsibleTask(object):
    def __init__(self, targetHost):
        Options = namedtuple(
                          'Options', [
                              'listtags', 'listtasks', 'listhosts', 'syntax', 'connection','module_path',
                              'forks', 'remote_user', 'private_key_file', 'ssh_common_args', 'ssh_extra_args',
                              'sftp_extra_args', 'scp_extra_args', 'become', 'become_method', 'become_user',
                              'verbosity', 'check'
                          ]
                       )

        # initialize needed objects
        self.variable_manager = VariableManager()

        self.options = Options(
                          listtags=False, listtasks=False, listhosts=False, syntax=False, connection='smart',
                          module_path=None, forks=100,
                          remote_user='root', private_key_file=None, ssh_common_args=None, ssh_extra_args=None,
                          sftp_extra_args=None, scp_extra_args=None, become=False, become_method=None, become_user='root',
                          verbosity=None, check=False
                      )
        self.passwords = dict(vault_pass='secret')
        self.loader = DataLoader()

        # create inventory and pass to var manager
        self.hostsFile = NamedTemporaryFile(delete=False)
        self.hostsFile.write(targetHost.encode())
        self.hostsFile.close()
        self.inventory = Inventory(loader=self.loader, variable_manager=self.variable_manager, host_list=self.hostsFile.name)
        self.variable_manager.set_inventory(self.inventory)

    def ansiblePlay(self):
        # create play with tasks
        args = "ls /"
        play_source =  dict(
                name = "Ansible Play",
                hosts = 'all',
                gather_facts = 'no',
                tasks = [
                    dict(action=dict(module='ping'), register='shell_out'),
                    dict(action=dict(module='shell', args=args), register='shell_out'),
                    dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
                ]
            )
        play = Play().load(play_source, variable_manager=self.variable_manager, loader=self.loader)

        # run it
        tqm = None
        try:
            tqm = TaskQueueManager(
                      inventory=self.inventory,
                      variable_manager=self.variable_manager,
                      loader=self.loader,
                      options=self.options,
                      passwords=self.passwords,
                      stdout_callback='default',
                  )
            result = tqm.run(play)
        finally:
        # print result
            if tqm is not None:
                tqm.cleanup()
                os.remove(self.hostsFile.name)
                self.inventory.clear_pattern_cache()
            return result

if __name__=='__main__':
    invs = '''[all]
121.196.15.21
'''
    task = AnsibleTask(invs)
    task.ansiblePlay() 
```

关于host参数: 

```python
# the host file file, or script path, or list of hosts 
# if a list, inventory data will NOT be loaded
```

控制台运行一下就看到熟悉的输出了:
```shell
python ansible-play.py
```

![](assets/images/2017-09-14-python-ansible/result1.png)

## 执行playbook
[关于ansible2.0版本的ansible-playbook方法的调用](https://my.oschina.net/mesopotamia/blog/690953)上的一个例子:

```python
#!/usr/bin/env python
# coding=utf-8
# __author__ = 'mesopodamia@gmail.com'

import os
import sys
import ansible
from collections import namedtuple

from ansible.parsing.dataloader import DataLoader
from ansible.vars import VariableManager
from ansible.inventory import Inventory
from ansible.executor.playbook_executor import PlaybookExecutor

def playbook_action(playbook, hosts):
    variable_manager = VariableManager()
    loader = DataLoader()
    inventory = ansible.inventory.Inventory(loader=loader,variable_manager=variable_manager)
    inventory.clear_pattern_cache()
    Options = namedtuple('Options', ['listtags', 'listtasks', 'listhosts', 'syntax', 'connection','module_path', 'forks', 'remote_user', 'private_key_file', 'ssh_common_args', 'ssh_extra_args', 'sftp_extra_args', 'scp_extra_args', 'become', 'become_method', 'become_user', 'verbosity', 'check'])
    options = Options(listtags=False, listtasks=False, listhosts=False, syntax=False, connection='ds_ssh', module_path=None, forks=100, remote_user=None, private_key_file=None, ssh_common_args=None, ssh_extra_args=None, sftp_extra_args=None, scp_extra_args=None, become=None, become_method=None, become_user=None, verbosity=None, check=False)
    variable_manager.extra_vars = {'host': hosts}
    passwords = {}
    pbex = PlaybookExecutor(playbooks=[playbook], inventory=inventory, variable_manager=variable_manager, loader=loader, options=options, passwords=passwords)
    pbex.run()
```

`playbook.yml`
```yaml
- hosts: "{{host}}"
  tasks:
    - name: test
      file: path=/home/eric/test.txt state=touch mode="u=rw,g=r,o=r"
```

---
- [API](http://docs.ansible.com/ansible/latest/dev_guide/developing_api.html)
- [Running Ansible 2 Programmatically](https://serversforhackers.com/c/running-ansible-2-programmatically)
- [How to use Ansible 2.0 Python API to run a Playbook?](https://stackoverflow.com/questions/35368044/how-to-use-ansible-2-0-python-api-to-run-a-playbook)
- [如何使用Ansible 2的API做python开发](http://www.jianshu.com/p/8558befb16c1)
- [ansible2.0 playbook api运维应用](https://segmentfault.com/a/1190000008009639)
- [关于ansible2.0版本的ansible-playbook方法的调用](https://my.oschina.net/mesopotamia/blog/690953)

---
END
