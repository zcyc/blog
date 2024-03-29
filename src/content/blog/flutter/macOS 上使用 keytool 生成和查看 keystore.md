---
title: "macOS 上使用 keytool 生成和查看 keystore"
author: "Charles"
description: ""
tags:
  - Flutter
ogImage: ""
slug: "macos-keytool-keystore"
pubDatetime: 2020-10-19T08:48:26.000Z
modDatetime: 2022-05-31T07:39:14.000Z
featured: false
draft: false
---

### 环境

macOS 10.15

## 安装和使用

keytool 是 Java 自带的工具，所以需要安装 Java，mac下推荐使用 brew 安装。

### 安装 Java

安装 Java 的方式有很多，推荐使用 brew，推荐安装 lts 版本

### 使用 keytool

#### 命令如下

```shell
% keytool -h
Key and Certificate Management Tool
Commands:
 -certreq            Generates a certificate request
 -changealias        Changes an entry's alias
 -delete             Deletes an entry
 -exportcert         Exports certificate
 -genkeypair         Generates a key pair
 -genseckey          Generates a secret key
 -gencert            Generates certificate from a certificate request
 -importcert         Imports a certificate or a certificate chain
 -importpass         Imports a password
 -importkeystore     Imports one or all entries from another keystore
 -keypasswd          Changes the key password of an entry
 -list               Lists entries in a keystore
 -printcert          Prints the content of a certificate
 -printcertreq       Prints the content of a certificate request
 -printcrl           Prints the content of a CRL file
 -storepasswd        Changes the store password of a keystore
Use "keytool -?, -h, or --help" for this help message
Use "keytool -command_name --help" for usage of command_name.
Use the -conf <url> option to specify a pre-configured options file.
```

#### 创建证书库

使用 `-genkeypair` 命令

```shell
# 这里的 alias 不要乱填，这个有用。keystore 就是最后生成的文件名。这种方式需要手动设置密码。
keytool -genkey -alias bitideatest -keyalg RSA -keysize 2048 -validity 36500 -keystore bitideatest.keystore

# 这里的 alias 不要乱填，这个有用。keystore 就是最后生成的文件名。storepass就是最后生成的密码。
keytool -genkeypair -keyalg RSA -alias yourkeystorealiasname -keystore yourkeystorfilename.jks -storepass yourkeystorpassword -keysize 2048

# 控制台返回信息如下：
What is your first and last name?
  [Unknown]:  localhost
What is the name of your organizational unit?
  [Unknown]:  Development Dept.
What is the name of your organization?
  [Unknown]:  Example
What is the name of your City or Locality?
  [Unknown]:  Beijing
What is the name of your State or Province?
  [Unknown]:  Beijing
What is the two-letter country code for this unit?
  [Unknown]:  CN
Is CN=localhost, OU=Development Dept., O=Example, L=Beijing, ST=Beijing, C=CN correct?
  [no]:  y
```

参数说明:
`-genkeypair` : 生成一对密钥
`-keyalg RSA`: 使用 RSA 算法
`-alias yourkeystorealiasname`: 别名，这个比较重要，主要用于管理密钥
`-keystore yourkeystorfilename.jks`: keystore 的文件名, 本例为 yourkeystorfilename.jks
`-storepass yourkeystorpassword`: keystore 的密码, 本例为 yourkeystorpassword
`-keysize 2048`:密钥长度, 本例为 2048

```shell
# 创建一个带有效期的证书
keytool -genkey -keystore keystore.keystore -keyalg RSA -validity 365 -alias keystore
```

`-validity 365`:密钥有效期，默认为三个月，此处365是365天。其他参数可以使用帮助查看 `keytool -genkeypair -h`

#### 查看证书库

使用 `keytool -list` 命令可以查看证书的别名和生成时间

```shell
#简单的证书就这样查看，bitideatest.keystore 是文件名。
keytool -list -v -keystore bitideatest.keystore
#设置了 -keystore 也就是设置了文件名的密钥证书用这个命令
keytool -list -keystore keystore.jks
#如果上方生成的是 .keystore 结尾的文件，查看 .keystore 结尾的文件即可
keytool -list -keystore keystore.keystore

# 控制台返回信息如下：
Enter keystore password: # 输入密码
Keystore type: PKCS12
Keystore provider: SUN
Your keystore contains 1 entry
thekeystore, Mar 17, 2020, PrivateKeyEntry,
Certificate fingerprint (SHA-256): ...
```

#### 格式转换

使用 `keytool -export` 命令可以将 .jks 格式的文件导出为 crt 格式，再倒入到 Java 的 cacerts 中，这样客户端就可以使用这个证书了。

```shell
# 此处 -file 名字要正确
keytool -export -alias ourkeystorealiasname -file ourkeystorefilename.crt -keystore ourkeystorefilename.jks

# 控制台返回信息如下：
Enter keystore password: # 输入 changeit
Certificate stored in file <keystore.crt>
```

#### 导入证书库

使用 `keytool -import` 命令将证书导入到 Java cacerts key store 中

```shell
# 此处 -keystore 文件路径要正确
keytool -import -alias ourkeystorealiasname -file keystore.crt -keystore /Library/Java/JavaVirtualMachines/openjdk-11.0.2.jdk/Contents/Home/lib/security/cacerts

# 控制台返回信息如下：
Warning: use -cacerts option to access cacerts keystore
Enter keystore password: # 输入密码 changeit
Owner: CN=localhost, OU=Development Dept., O=Example, L=Beijing, ST=Beijing, C=CN
Issuer: CN=localhost, OU=Development Dept., O=Example, L=Beijing, ST=Beijing, C=CN
Serial number: 6d29...
Valid from:
...
Trust this certificate? [no]:  yes
Certificate was added to keystore
```

至此，证书可以使用了。

#### 删除证书

从证书库中删除证书，可以使用 `keytool -delete` 命令

```shell
# 此处 -keystore 文件路径要正确
keytool -delete -alias yourkeystorealiasname -keystore /Library/Java/JavaVirtualMachines/openjdk-11.0.2.jdk/Contents/Home/lib/security/cacerts

# 控制台返回信息如下：
Warning: use -cacerts option to access cacerts keystore
Enter keystore password: # 输入密码 changeit
```

## 总结

keytool 在 Java 和 Android 开发都有用到，是非常重要的校验方式。

## 参考资料

[CAS SSO With Spring Security](https://www.baeldung.com/spring-security-cas-sso)
[qizhanming](https://qizhanming.com/blog/2020/03/17/how-to-use-keytool-on-macos)
