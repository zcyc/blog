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
dotnet ef dbcontext scaffold "Host=localhost;Database=postgres;Username=postgres;Password=postgres" Npgsql.EntityFrameworkCore.PostgreSQL --no-onconfiguring --force -o Models -t account --context AccountContext
```

# 生成 apis
```bash
dotnet aspnet-codegenerator minimalapi -o -dbProvider postgres -outDir Controllers -m Account -dc AccountContext -e AccountEndpoints 
```

# 启动程序
1. 添加配置【必须】

在 appsettings.Development.json 添加数据库链接。
```json
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=postgres;Username=postgres;Password=postgres"
  }
```

2. 注入依赖【必须】

在 Program.cs 注入数据库依赖。
```csharp
builder.Services.AddDbContext<AccountContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

3. 指定参数来源【可选】

在 Controller 指定参数来源，如 [FromServices]、[FromBody]。
```csharp
 group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (string id, [FromBody] Account account, [FromServices] AccountContext db) =>
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