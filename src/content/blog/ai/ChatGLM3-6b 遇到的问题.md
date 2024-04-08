---
title: "ChatGLM3 遇到的问题"
author: "Charles"
description: ""
tags:
  - llm
ogImage: ""
slug: "chatglm3-problems"
pubDatetime: 2023-12-05T14:41:00.000+08:00
modDatetime: 2023-12-05T14:50:00.000+08:00
featured: false
draft: false
---

# 接口报错 AttributeError: type object 'UsageInfo' has no attribute 'model_validate'

[https://github.com/THUDM/ChatGLM3/issues/398](https://github.com/THUDM/ChatGLM3/issues/398)

```python
# 把 openai_api.py 中的
task_usage = UsageInfo.model_validate(response["usage"])
for usage_key, usage_value in task_usage.model_dump().items():

# 替换成
task_usage = UsageInfo.parse_obj(response["usage"])
for usage_key, usage_value in task_usage.dict().items():
```
