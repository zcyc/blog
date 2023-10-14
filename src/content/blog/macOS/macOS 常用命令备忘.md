---
title: "macOS 常用命令备忘"
pubDate: "2021-11-12T07:15:05.000Z"
updatedDate: "2022-06-29T15:45:18.000Z"
---



# 一键更新 brew

```bash
brew update && brew upgrade && brew upgrade --greedy
```

# 隐藏桌面

```bash
defaults write com.apple.finder CreateDesktop -bool false && killall Finder
```

# 显示桌面

```bash
defaults write com.apple.finder CreateDesktop -bool true && killall Finder
```
