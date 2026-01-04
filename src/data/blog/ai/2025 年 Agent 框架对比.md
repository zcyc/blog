---
title: "2025 年 Agent 框架对比"
author: "Charles"
description: ""
tags:
  - llm
slug: "agent-framework-2025"
pubDatetime: 2025-12-13T15:50:00.000+08:00
modDatetime: 2025-12-13T15:50:00.000+08:00
featured: false
draft: false
---

Agent 框架正大量涌现，设计理念各不相同，需要根据实际业务需求进行选择，最热门的不一定适合你。

#### **补全表格（添加这3个，按流行度插入）**
| 框架名称                  | 开发者 / 组织              | 主要语言          | 核心焦点                     | 关键特性                                                                 | 优势                                      | 适用场景                                      |
|---------------------------|----------------------------|-------------------|------------------------------|--------------------------------------------------------------------------|-------------------------------------------|-----------------------------------------------|
| **CrewAI**                | crewAI Inc.               | Python           | 角色扮演式团队协作           | 角色/任务分配、层次化流程、人类反馈循环、并行执行；轻量高效。             | **易用性高**、**快速原型**、生产性能强；角色模拟真实团队。 | 业务自动化、内容生成、团队式复杂任务。        |
| **LlamaAgents**           | LlamaIndex Team           | Python           | 数据密集型 RAG 代理          | 强大的检索增强、索引工具集成、多模态数据支持；易于构建多代理系统。       | **数据处理与检索能力突出**，擅长知识密集型任务。 | RAG 应用、文档分析与问答、知识库智能体。      |
| **LangGraph**             | LangChain                 | Python           | 有状态图基工作流编排         | 节点/边循环、分支控制、状态持久化；继承 LangChain 生态工具。             | **精确控制**复杂分支与错误处理；可视化调试支持好。 | 复杂状态工作流、需持久化的代理、多分支逻辑应用。 |
| **OpenAI Agents SDK**     | OpenAI                    | Python / TypeScript | 轻量级多代理工作流与守卫栏   | Handoffs、Guardrails、Tracing、Sessions；支持 100+ LLM，无状态到有状态。 | **生产就绪**、**可观测性强**、易扩展；Swarm 的官方继任者。 | 生产级多代理应用、实时协作、守卫栏需求高的场景。 |
| **Microsoft Agent Framework** | Microsoft             | .NET / Python    | 企业级多代理编排             | 融合 AutoGen 与 Semantic Kernel；强化可观测性、合规性与 Azure 集成。     | **企业级稳健性**，易于从实验向生产迁移。 | 企业工作流、合规性要求高的自动化、Azure 环境集成。 |
| **Agent Development Kit (ADK)** | Google              | Python / Go / TypeScript / Java | 全生命周期开发与部署         | 模块化设计、多模态流式支持、CLI 工具、本地 UI；深度集成 Gemini 与 Vertex AI。 | **生产就绪**，与 Google 生态（如 Vertex AI）集成紧密。 | 生产级应用、多模态任务、复杂业务自动化。      |
| **Strands Agents**        | AWS                       | Python           | 模型驱动自主代理             | 异步工具调用、MCP/A2A 支持、AWS 原生集成；几行代码建代理。             | **简洁高效**、**生产部署强**（Lambda/Fargate/EC2）；社区贡献多。 | 企业级自动化、AWS 生态集成、并发高任务。      |
| **Agno**                  | agno-agi                  | Python           | 全栈多代理平台（框架+运行时）| AgentOS云运行、MCP/A2A、记忆/知识/评估（Agent as Judge）、水平扩展。   | **性能极致**（无状态缩放）、隐私云部署；多模态/异步统一API。 | 企业多代理系统、安全产品、长任务/高并发。    |

#### 说明
- **追求易用性与生产性能**：**CrewAI** 或 **OpenAI Agents SDK**
- **需要复杂状态管理与分支控制**：**LangGraph**
- **企业级部署（Azure 环境）**：**Microsoft Agent Framework**
- **企业级部署（Google Cloud 环境）**：**Agent Development Kit (ADK)**
- **企业级部署（AWS 环境）**：**Strands Agents**
- **保持关注的框架**：**CAMEL**，**AgentScope**，**VoltAgent**，**MetaGPT**，**SuperAGI**，**Portia AI**
- **停止更新的框架**：**OpenAI Swarm**，**AutoGen**，**Semantic Kernel**
