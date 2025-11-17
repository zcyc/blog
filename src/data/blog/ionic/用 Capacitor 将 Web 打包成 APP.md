---
title: "用 Capacitor 将 Web 打包成 APP"
author: "Charles"
description: ""
tags:
  - ionic
slug: "capacitor-web-to-app"
pubDatetime: 2025-11-17T22:56:00.000+08:00
modDatetime: 2025-11-17T22:56:00.000+08:00
featured: false
draft: false
---

## 1.创建项目并安装依赖
```shell
npm init @capacitor/app@latest
cd my-app
npm install @capacitor/android
npm install
npx cap add android
```

## 2.修改配置文件
在 capacitor.config.json 中增加 server.url 配置，实现 app 启动加载指定 Web。更多字段看[配置文档](https://capacitorjs.com/docs/config)。
```json
{
  "appId": "com.deepseek.chat",
  "appName": "DeepSeek Chat",
  "webDir": "dist",
  "server": {
    "url": "https://chat.deepseek.com"
  },
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": true,
      "launchShowDuration": 500,
      "backgroundColor": "#ffffff"
    }
  }
}
```

## 3.编译 App
```shell
npm run build
npx cap sync android
```

## 4.用 Android Studio 运行项目
打开项目目录下的 android 目录，然后点击运行即可查看效果。注意打开模拟器网络，没有网络加载时显示白屏，超时后显示 chromium 报错页面。

## 5.自定义 chromium 错误页面
在配置文件中增加 server.errorPath 节点。
```json
{
  "appId": "com.deepseek.chat",
  "appName": "DeepSeek Chat",
  "webDir": "dist",
  "server": {
    "url": "https://chat.deepseek.com",
    "errorPath": "error.html"
  },
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": true,
      "launchShowDuration": 500,
      "backgroundColor": "#ffffff"
    }
  }
}
```

## 6.在 dist 目录下创建 error.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>连接错误</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .error-container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 400px;
            width: 100%;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .error-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 16px;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .retry-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .retry-button:hover {
            background: #5568d3;
        }
        .retry-button:active {
            transform: scale(0.98);
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h1>无法连接到服务器</h1>
        <p>请检查您的网络连接，然后重试。</p>
        <button class="retry-button" onclick="window.location.reload()">重试</button>
    </div>
</body>
</html>
```

## 7.修改超时时间
```java
package com.deepseek.chat;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "MainActivity";
    private static final int TIMEOUT_MS = 5000; // 5秒超时
    private Handler timeoutHandler;
    private Runnable timeoutRunnable;
    private WebView webView;
    private long pageLoadStartTime = 0;
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        timeoutHandler = new Handler(Looper.getMainLooper());
        
        // 在 onCreate 中设置超时检测，因为页面在应用启动时就开始加载
        setupTimeout();
    }
    
    @Override
    public void onStart() {
        super.onStart();
        
        // 等待 Bridge 初始化完成后再开始监控
        getBridge().getWebView().postDelayed(new Runnable() {
            @Override
            public void run() {
                webView = getBridge().getWebView();
                if (webView != null) {
                    // 开始页面加载监控
                    startPageLoadMonitoring();
                }
            }
        }, 1000);
    }
    
    private void setupTimeout() {
        timeoutRunnable = new Runnable() {
            @Override
            public void run() {
                if (webView != null) {
                    Log.w(TAG, "Page load timeout after " + TIMEOUT_MS + "ms");
                    // 检查当前 URL，如果还在加载目标网站，则显示错误页面
                    String currentUrl = webView.getUrl();
                    if (currentUrl == null || currentUrl.contains("chat.deepseek.com") || currentUrl.isEmpty()) {
                        String errorUrl = "https://localhost/error.html";
                        webView.post(new Runnable() {
                            @Override
                            public void run() {
                                webView.loadUrl(errorUrl);
                            }
                        });
                    }
                }
            }
        };
    }
    
    private void startPageLoadMonitoring() {
        if (webView == null) return;
        
        // 记录开始时间
        pageLoadStartTime = System.currentTimeMillis();
        
        // 启动超时检测
        timeoutHandler.postDelayed(timeoutRunnable, TIMEOUT_MS);
        
        Log.d(TAG, "Started page load monitoring with " + TIMEOUT_MS + "ms timeout");
        
        // 定期检查页面加载状态，如果加载完成则取消超时
        final Handler checkHandler = new Handler(Looper.getMainLooper());
        final Runnable checkRunnable = new Runnable() {
            @Override
            public void run() {
                if (webView != null && pageLoadStartTime > 0) {
                    String url = webView.getUrl();
                    // 如果 URL 不再是目标网站或已加载完成，取消超时
                    if (url != null && !url.contains("chat.deepseek.com") && !url.isEmpty()) {
                        cancelTimeout();
                        Log.d(TAG, "Page loaded successfully, cancelled timeout");
                    } else {
                        // 继续检查
                        checkHandler.postDelayed(this, 500);
                    }
                }
            }
        };
        checkHandler.postDelayed(checkRunnable, 1000);
        
        // 使用 JavaScript 注入来监听页面加载状态（作为备用检测）
        webView.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (webView != null) {
                    String js = "javascript:(function() {" +
                        "var startTime = Date.now();" +
                        "var timeout = " + TIMEOUT_MS + ";" +
                        "var checkInterval = setInterval(function() {" +
                        "  if (document.readyState === 'complete' || document.readyState === 'interactive') {" +
                        "    clearInterval(checkInterval);" +
                        "  } else if (Date.now() - startTime > timeout) {" +
                        "    clearInterval(checkInterval);" +
                        "    window.location.href = 'https://localhost/error.html';" +
                        "  }" +
                        "}, 100);" +
                        "})();";
                    webView.evaluateJavascript(js, null);
                }
            }
        }, 500);
    }
    
    private void cancelTimeout() {
        if (timeoutHandler != null && timeoutRunnable != null) {
            timeoutHandler.removeCallbacks(timeoutRunnable);
        }
        pageLoadStartTime = 0;
    }
    
    @Override
    public void onDestroy() {
        super.onDestroy();
        cancelTimeout();
    }
}
```

## 8.限制 webview 地址，禁用 debug，禁止协议混合
```json
{
  "appId": "com.deepseek.chat",
  "appName": "DeepSeek Chat",
  "webDir": "dist",
  "server": {
    "url": "https://chat.deepseek.com",
    "androidScheme": "https",
    "allowNavigation": [
      "https://chat.deepseek.com",
      "https://*.deepseek.com"
    ],
    "errorPath": "error.html"
  },
  "android": {
    "allowMixedContent": false,
    "webContentsDebuggingEnabled": false
  },
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": true,
      "launchShowDuration": 500,
      "backgroundColor": "#ffffff"
    }
  }
}
```