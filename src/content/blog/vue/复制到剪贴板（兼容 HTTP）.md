---
title: "复制到剪贴板（兼容 HTTP）"
author: "Charles"
description: ""
tags:
  - vue
slug: "web-copy-to-clipboard"
pubDatetime: 2022-04-18T03:46:02.000+08:00
modDatetime: 2022-11-07T08:17:14.000+08:00
featured: false
draft: false
---

安全上下文包括 localhost/127.0.0.1 和 htts 协议的网址。不安全上下文包括 http 协议的网址和内网的其他 ip 地址。

```typescript
const copySqlTableStr2Clipboard = (content: string) => {
  // 处理要复制的内容
  const textToCopy = content.replace("http://", "").replace("https://", "");

  // 判断采用哪种方式复制到剪贴板
  if (navigator.clipboard && window.isSecureContext) {
    // 安全上下文，通过 navigator clipboard 复制
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // 不安全上下文，通过 text area 复制
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
};
```
