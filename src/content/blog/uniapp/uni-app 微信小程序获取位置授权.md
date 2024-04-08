---
title: "uni-app 微信小程序获取位置授权"
author: "Charles"
description: ""
tags:
  - uniapp
ogImage: ""
slug: "uni-app-get-location"
pubDatetime: 2022-06-28T18:12:21.000+08:00
modDatetime: 2022-06-28T18:13:21.000+08:00
featured: false
draft: false
---

```html
<button @tap="chooseLocation">选择地点</button>
```

```javascript
wx.chooseLocation({
  success: data => {
    let address = data.address.split("市");
    this.addressData.addressName = address[0] + "市";
    this.addressData.address = address[1] + data.name;
  },
  fail: () => {
    wx.getSetting({
      success: function (res) {
        var statu = res.authSetting;
        console.log(statu);
        if (!statu["scope.userLocation"]) {
          console.log(123);
          wx.showModal({
            title: "是否授权当前位置",
            content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
            success(tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000,
                      });
                      //授权成功之后，再调用chooseLocation选择地方
                      setTimeout(function () {
                        wx.chooseLocation({
                          success: data => {
                            let address = data.address.split("市");
                            this.addressData.addressName = address[0] + "市";
                            this.addressData.address = address[1] + data.name;
                          },
                        });
                      }, 1000);
                    }
                  },
                });
              } else {
                wx.showToast({
                  title: "授权失败",
                  icon: "none",
                  duration: 1000,
                });
              }
            },
          });
        }
      },
    });
  },
});
```
