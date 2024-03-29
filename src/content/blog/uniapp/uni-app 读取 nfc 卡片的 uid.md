---
title: "uni-app 读取 nfc 卡片的 uid"
author: "Charles"
description: ""
tags:
  - UniApp
ogImage: ""
slug: "uni-app-read-nfc-uid"
pubDatetime: 2021-05-24T07:50:28.000Z
modDatetime: 2022-02-07T07:31:40.000Z
featured: false
draft: false
---

只能读取 uid，无法读写扇区信息

```vue
<template>
  <view>
    <view class="uni-padding-wrap">
      NFC
      <view class="uni-common-mt" style="background:#FFF; padding:20upx;">
        <text>
          UID:{{ UID }}
          {{ tip }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
var NfcAdapter;
export default {
  data() {
    return {
      title: "redNFC",
      UID: "",
      msg: "",
      tip: "",
    };
  },
  onLoad() {
    console.log("onLoad");
  },
  onShow() {
    console.log("onShow");
    this.NFCInit();
  },
  onHide() {
    console.log("onHide");
    this.NFCReadUID();
  },
  methods: {
    NFCInit() {
      try {
        var main = plus.android.runtimeMainActivity();
        //console.log(main);
        var Intent = plus.android.importClass("android.content.Intent");
        // console.log(Intent);
        var Activity = plus.android.importClass("android.app.Activity");
        //console.log(Activity);
        var PendingIntent = plus.android.importClass(
          "android.app.PendingIntent"
        );
        // console.log(PendingIntent);
        var IntentFilter = plus.android.importClass(
          "android.content.IntentFilter"
        );
        // console.log(IntentFilter);
        // var Uri = plus.android.importClass('android.net.Uri');
        // var Bundle = plus.android.importClass('android.os.Bundle');
        // var Handler = plus.android.importClass('android.os.Handler');
        //console.log(Handler);
        NfcAdapter = plus.android.importClass("android.nfc.NfcAdapter");
        //console.log(NfcAdapter);
        var _nfcAdapter = NfcAdapter.getDefaultAdapter(main);
        // console.log(_nfcAdapter);

        var ndef = new IntentFilter("android.nfc.action.NDEF_DISCOVERED"); //NfcAdapter.ACTION_NDEF_DISCOVERED
        // console.log(ndef);
        var tag = new IntentFilter("android.nfc.action.TAG_DISCOVERED"); //NfcAdapter.ACTION_TECH_DISCOVERED
        // console.log(tag);
        var tech = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
        // console.log(tech);
        var intentFiltersArray = [ndef, tag, tech];

        var techListsArray = [
          ["android.nfc.tech.Ndef"],
          ["android.nfc.tech.IsoDep"],
          ["android.nfc.tech.NfcA"],
          ["android.nfc.tech.NfcB"],
          ["android.nfc.tech.NfcF"],
          ["android.nfc.tech.Nfcf"],
          ["android.nfc.tech.NfcV"],
          ["android.nfc.tech.NdefFormatable"],
          ["android.nfc.tech.MifareClassi"],
          ["android.nfc.tech.MifareUltralight"],
        ];

        var _intent = new Intent(main, main.getClass());
        // console.log(_intent);
        _intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        var pendingIntent = PendingIntent.getActivity(main, 0, _intent, 0);
        // console.log(pendingIntent);

        if (_nfcAdapter == null) {
          this.tip = "本设备不支持NFC!";
        } else if (_nfcAdapter.isEnabled() == false) {
          this.tip = "NFC功能未打开!";
        } else {
          this.tip = "NFC正常";
          _nfcAdapter.enableForegroundDispatch(
            main,
            pendingIntent,
            IntentFilter,
            techListsArray
          );
        }
      } catch (e) {
        //TODO handle the exception
      }
    },
    NFCReadUID() {
      var main = plus.android.runtimeMainActivity();
      var _intent = main.getIntent();
      var _action = _intent.getAction();
      // console.log("action type:" + _action);

      if (
        NfcAdapter.ACTION_NDEF_DISCOVERED == _action ||
        NfcAdapter.ACTION_TAG_DISCOVERED == _action ||
        NfcAdapter.ACTION_TECH_DISCOVERED == _action
      ) {
        var Tag = plus.android.importClass("android.nfc.Tag");
        var tagFromIntent = _intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        var uid = _intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
        console.log(uid);
        this.UID = this.Bytes2HexString(uid);
        //console.log(this.UID);
      }
    },
    //将byte[] 转为Hex，
    Bytes2HexString(arrBytes) {
      var str = "";
      for (var i = 0; i < arrBytes.length; i++) {
        var tmp;
        var num = arrBytes[i];
        if (num < 0) {
          //Java中数值是以补码的形式存在的，应用程序展示的十进制是补码对应真值。补码的存在主要为了简化计算机底层的运算，将减法运算直接当加法来做
          tmp = (255 + num + 1).toString(16);
        } else {
          tmp = num.toString(16);
        }
        if (tmp.length == 1) {
          tmp = "0" + tmp;
        }
        str += tmp;
      }
      return str;
    },
  },
};
</script>

<style></style>
```
