---
title: "ASP.NET 生成 REST 接口"
author: "Charles"
description: ""
tags:
  - dotnet
slug: "asp-dotnet-rest"
pubDatetime: 2024-08-10T16:54:00.000+08:00
pubDatetime: 2024-08-10T16:54:00.000+08:00
featured: false
draft: false
---

# 1、安装 dotnet

https://dotnet.microsoft.com/zh-cn/download

# 2、安装 tools
记得将 `~/.dotnet/tools` 目录添加到 PATH。
```bash
dotnet tool install -g dotnet-ef
dotnet tool install -g dotnet-aspnet-codegenerator
```

# 安装依赖
根据所在目录不同，指定对应命令。
## 在解决方案目录下执行
```bash
dotnet add WebApplication1 package Microsoft.EntityFrameworkCore.Design
dotnet add WebApplication1 package Npgsql.EntityFrameworkCore.PostgreSQL
```
## 在项目目录下执行
```bash
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

# 生成 models
必须在项目目录下执行。
```bash
dotnet ef dbcontext scaffold "Host=localhost;Database=postgres;Username=postgres;Password=postgres" Npgsql.EntityFrameworkCore.PostgreSQL -t account -o Models
```

# 生成 apis
必须在项目目录下执行。
```bash
dotnet aspnet-codegenerator minimalapi -dc PostgresContext -e AccountEndpoints -m Account -o -dbProvider postgres -outDir Controllers
```

# 启动程序
1. 初始化数据库

启动前在 Program.cs 初始化 PostgresContext。
```csharp
builder.Services.AddDbContext<PostgresContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```
2. 修复依赖注入错误

生成的 Controller 没有指定参数来源，启动后 Swagger 会报错。按 parameter-binding 文档补上类似 [FromBody] 和 [FromServices] 的属性即可，如：
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
[dotnet-ef](https://learn.microsoft.com/zh-cn/ef/core/cli/dotnet)

[dotnet-aspnet-codegenerator](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/tools/dotnet-aspnet-codegenerator?view=aspnetcore-8.0)

[parameter-binding](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-8.0)