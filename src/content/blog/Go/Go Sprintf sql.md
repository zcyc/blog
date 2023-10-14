---
title: "Go Sprintf %%s%"
pubDate: "2023-02-07T04:29:47.000Z"
updatedDate: "2023-02-07T04:31:34.000Z"
---

要用 %%%s%%，不能用 \ 转义。

```go
fmt.Sprintf("%%%s%%", "a")
// 最后的效果就是 %a%
```
