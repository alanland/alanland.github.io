---
layout: post
title:  "Idea Run Dashboard"
date:   2018-05-21 15:23:37 +0000
tags:   [idea]
author: Alan Wang
---

Idea 2017.1 增加了 `Spring Boot Run Dashboard`，如果配置为Spring Boot 运行仍然找不到该窗口，可以编辑文件
`.idea/workspace.xml`，找到：`<component name="RunDashboard">`，增加：
```xml
<option name="configurationTypes">  
    <set>   
        <option value="SpringBootApplicationConfigurationType" />  
    </set>  
 </option>  
```

比如： 
```xml
  <component name="RunDashboard">
    <option name="configurationTypes">
      <set>
        <option value="SpringBootApplicationConfigurationType" />
      </set>
    </option>
    <option name="ruleStates">
      <list>
        <RuleState>
          <option name="name" value="ConfigurationTypeDashboardGroupingRule" />
        </RuleState>
        <RuleState>
          <option name="name" value="StatusDashboardGroupingRule" />
        </RuleState>
      </list>
    </option>
  </component>
```
就可以看到`Run Dashboard`就出来了。
