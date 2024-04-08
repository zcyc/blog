---
title: "macOS 开发环境初始化"
author: "Charles"
description: ""
tags:
  - macos
ogImage: ""
slug: "macos-dev-env-init"
pubDatetime: 2021-12-21T02:54:13.000+08:00
modDatetime: 2022-01-17T09:53:47.000+08:00
featured: false
draft: false
---

# 安装常用命令行工具

xcode-select --install

# 安装 brew

/bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)")

# 安装 iterm2

brew install --cask iterm2

# 安装 oh-my-zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 安装 zsh 主题和插件

git clone --depth=1 <https://gitee.com/romkatv/powerlevel10k.git> ${ZSH\_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git clone <https://github.com/zsh-users/zsh-autosuggestions> ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone <https://github.com/zsh-users/zsh-syntax-highlighting.git> ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 启用 zsh 主题和插件

在 ~/.zshrc 中修改 ZSH_THEME="powerlevel10k/powerlevel10k"
在 ~/.zshrc 中修改 plugins=(
git
brew
docker
kubectl
docker-compose
zsh-autosuggestions
zsh-syntax-highlighting
)

# 重载配置文件

source ~/.zshrc

# 安装 Docker

<https://docs.docker.com/desktop/mac/install/>

# 安装开发工具

brew install --cask visual-studio-code
brew install --cask sequel-ace
brew install --cask another-redis-desktop-manager

# 安装聊天工具

brew install --cask feishu
brew install --cask lark
brew install --cask wechat
brew install --cask wechatwork
brew install --cask dingtalk
brew install --cask dingtalk-lite

# 安装收费软件

brew install --cask jetbrains-toolbox
brew install --cask istat-menus

# 安装浏览器

brew install --cask google-chrome
brew install --cask firefox

# 安装其他工具

brew install --cask sloth
brew install --cask bob
brew install --cask keka

# 喜欢发律师函的软件

Adobe 系列所有软件
Unity 所有版本包括免费版
Beyond Compare 以及其他思杰马克丁代理软件
Navicat 所有版本的所有软件
其他不明来源的盗版软件
