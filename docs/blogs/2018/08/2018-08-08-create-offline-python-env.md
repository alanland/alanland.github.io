---
title:  "Create Offline Python Enviroment with Conda"
date:   2018-08-08 13:23:37 +0000
tags:   [python]
categories: [Python]
---

```sh
# download
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh

# update conda
conda update -n base conda

# create env 
conda create -n py35 python=3.5 --offline
# conda create -n jms python=3.6.3 --offline
# conda create -n ops python=3.6.3 --offline

# install package
conda install xxx
pip install xxx
```
