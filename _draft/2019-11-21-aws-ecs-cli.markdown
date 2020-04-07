---
layout: post
title:  "AWS ECS Cli"
date:   2019-11-21T13:39:00.383Z
tags:   [aws]
categories: [Cloud]
author: Alan Wang
---

## Install
```
sudo curl -o /usr/local/bin/ecs-cli https://amazon-ecs-cli.s3.amazonaws.com/ecs-cli-darwin-amd64-latest
sudo chmod +x /usr/local/bin/ecs-cli
ecs-cli --version
```

## Config 
```shell script
ecs-cli configure profile --profile-name profile_name --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_ACCESS_KEY
ecs-cli configure --cluster cluster_name --default-launch-type launch_type --region region_name --config-name configuration_name

```



---
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html