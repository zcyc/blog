---
title: "Jeecg 相关的问题"
author: "Charles"
description: ""
tags:
  - java
ogImage: ""
slug: "jeecg"
pubDatetime: 2021-03-23T07:45:46.000Z
modDatetime: 2023-04-23T05:51:29.000Z
featured: false
draft: false
---

**注意：**jeecg-boot 是一个半开源的项目，商业使用要注意风险。
**评价：**jeecg-boot 优势众多，但问题也很多。框架 bug 较多；未做兼容性处理，版本升级困难；pr处理不严谨；部分代码使用废弃方法。

# 前端限制上传图片的大小

```java
// 限制图片格式和大小 参考 a-upload 文档。上传文件限制大小可以在 yml 中配置，看官方文档。
  beforeUpload: function(file){
        const imageUploadSizeLimit = 50;
        const isAllowImageType = file.type.indexOf('image') >= 0
        if (!isAllowImageType) {
          this.$message.error('上传失败，必须上传 png 或 jpeg，请删除后重新上传合规图片！')
        }
        // 限制上传图片的大小
        const isSmallThanImageUploadSizeLimit = file.size / 1024 < imageUploadSizeLimit
        if (!isSmallThanImageUploadSizeLimit) {
          this.$message.error('上传失败，图片必须小于50kb，请删除后重新上传合规图片！')
        }
        return isAllowImageType && isSmallThanImageUploadSizeLimit;
      }
```

# 当 online form 使用 \[1,0] 作为扩展参数时

```java
//当 online form 使用 [1,0] 作为扩展参数时，无法正常显示否，因为!0=true
//全局搜索将以下语句
customRender: (text) => (!text ? "" : (text == [1,0][0] ? "是" : "否"))
//全部替换为
customRender: (text) => (!(''+text) ? "" : (text == [1,0][0] ? "是" : "否"))
```

# 后端获取当前用户的方法

```java
// 通过 header 获取当前租户id，只要这个账号有租户，所有请求header中都会包含租户
	@RequestHeader String tenantId
// 通过 session 获取当前用户
	LoginUser sysUser = (LoginUser) SecurityUtils.getSubject().getPrincipal();
// 通过token获取当前用户名
	org.jeecg.common.system.util.JwtUtil.getUsername(token)
```

# 坑

```
1、多租户无法使用 mybatis-plus 官方的忽略拦截条件（已经提交）
2、前端ws连接总是断开（前端连接方法存在问题）
3、rabbitMQ代码存在乱命名乱封装导致歧义（已经提交）
4、token 的键格式奇葩 redis key不兼容（暂时不改）
5、当一个表存在 tenantId 字段(多租户字段)，且为 varchar 类型，mybatis plus 多租户默认为 "0"，导致能查出该表所有 tenantId为空字符串的内容，此处有 sql 注入问题。其实不只是jeecg，只要mysql表中有一个字段是varchar，且内容为空字符串，都可以用 "0" select出来。（已经提交）
6、开了多租户的表不能用作字典，不然要么就是加载不到，要么就是出现两个tenantId
7、由于 nginx underscores_in_headers off; 导致的 tenant_id 为空（已经提交）
8、前端获取字典的方法只能全表获取，无法控制权限（已经提交根据链接获取字典）
```
