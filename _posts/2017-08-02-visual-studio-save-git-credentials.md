---
layout: post
title:  "Visual Studio Code save git credentials"
date:   2017-08-02 11:57:37 +0000
tags:   [ide, git]
author: Alan Wang
---
```shell
# Set git to use the credential memory cache
git config --global credential.helper cache

# Set the cache to timeout after 1 hour (setting is in seconds)
git config --global credential.helper 'cache --timeout=3600'
```

VS Code User Setting:
```json
"git.autofetch": false
```

--- 
Links:
- https://stackoverflow.com/questions/34400272/visual-studio-code-always-asking-for-git-credentials

---
END
