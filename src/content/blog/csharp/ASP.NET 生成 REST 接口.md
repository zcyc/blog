---
title: "ASP.NET 生成 REST 接口"
author: "Charles"
description: ""
tags:
  - dotnet
slug: "asp-dotnet-rest"
pubDatetime: 2024-08-10T16:54:00.000+08:00
modDatetime: 2024-08-11T12:27:00.000+08:00
featured: false
draft: false
---

# 安装 dotnet
https://dotnet.microsoft.com/zh-cn/download

# 安装 tools
记得将 `~/.dotnet/tools` 目录添加到 PATH。
```bash
dotnet tool install -g dotnet-ef
dotnet tool install -g dotnet-aspnet-codegenerator
```

# 创建项目
```bash
dotnet new webapi -o WebApplication1
```

# 安装依赖
```bash
cd WebApplication1
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

# 生成 models
先在数据库建一张 `account` 表，字段随意。
```bash
dotnet ef dbcontext scaffold "Host=localhost;Database=postgres;Username=postgres;Password=postgres" Npgsql.EntityFrameworkCore.PostgreSQL -t account -o Models
```

# 生成 apis
```bash
dotnet aspnet-codegenerator minimalapi -dc PostgresContext -e AccountEndpoints -m Account -o -dbProvider postgres -outDir Controllers
```

# 启动程序
1. 初始化数据库

在 Program.cs 初始化 PostgresContext，否则接口报错 No service for type 'WebApplication1.Models.PostgresContext' has been registered
```csharp
builder.Services.AddDbContext<PostgresContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```
2. 修复依赖注入错误

在 Controller 指定参数来源，如 [FromServices]、[FromBody]，防止依赖注入错误。
```csharp
 group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (string id, [FromBody] Account account, [FromServices] PostgresContext db) =>
        {
            var affected = await db.Accounts
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.Id, account.Id)
                    .SetProperty(m => m.ClerkUserId, account.ClerkUserId)
                    .SetProperty(m => m.CreatedAt, account.CreatedAt)
                    .SetProperty(m => m.UpdatedAt, account.UpdatedAt)
                    .SetProperty(m => m.DeletedAt, account.DeletedAt)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateAccount")
        .WithOpenApi();
```

# 文档
[dotnet](https://learn.microsoft.com/zh-cn/dotnet/core/tools/dotnet)

[dotnet-ef](https://learn.microsoft.com/zh-cn/ef/core/cli/dotnet)

[dotnet-aspnet-codegenerator](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/tools/dotnet-aspnet-codegenerator?view=aspnetcore-8.0)

[parameter-binding](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-8.0)