---
title: "Agent 框架对比"
author: "Charles"
description: ""
tags:
  - llm
slug: "agent-framework"
pubDatetime: 2025-12-13T15:50:00.000+08:00
modDatetime: 2025-12-13T15:50:00.000+08:00
featured: false
draft: false
---

Agent 框架正大量涌现，设计理念各不相同，需要根据实际业务需求进行选择，最热门的不一定适合你。

| 框架名称                  | 开发者 / 组织          | 主要语言              | 核心焦点                        | 关键特性                                                                 | 优势                                          | 适用场景                                      |
|---------------------------|-------------------------|-----------------------|---------------------------------|--------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------------|
| **CrewAI**                | CrewAI Inc.            | Python                | 角色扮演式团队协作              | 角色/任务分配、层次化流程、人类反馈循环、并行执行；轻量高效             | **易用性极高**、**快速原型**、生产性能强；真实团队模拟 | 业务自动化、内容生成、团队式复杂任务分解      |
| **LlamaAgents**           | LlamaIndex Team        | Python                | 数据密集型 RAG 代理             | 强大检索增强、索引工具深度集成、多模态数据支持；易构建多代理系统       | **检索与数据处理能力突出**、知识密集任务优异  | RAG 应用、文档智能分析、知识库问答系统        |
| **LangGraph**             | LangChain              | Python                | 有状态图基工作流编排            | 节点/边循环、分支控制、状态持久化、可视化调试；继承 LangChain 生态      | **精确控制**复杂分支与错误处理；调试与可视化最佳 | 复杂状态工作流、持久化代理、多分支逻辑应用    |
| **OpenAI Agents SDK**     | OpenAI                 | Python (TypeScript 支持中) | 轻量级多代理工作流 + 守卫栏     | Handoffs、Guardrails、Tracing、Sessions；支持 100+ LLM、无状态到有状态   | **生产就绪**、**可观测性强**、易扩展；官方继任 Swarm | 生产级多代理系统、实时协作、高守卫需求场景    |
| **Microsoft Agent Framework** | Microsoft          | .NET / Python         | 企业级多代理编排                | 融合 AutoGen 与 Semantic Kernel；强化可观测性、合规性、Azure 深度集成   | **企业级稳健性强**、合规与安全优秀；实验→生产迁移顺畅 | 企业工作流、合规严格自动化、Azure 生态集成    |
| **Agent Development Kit (ADK)** | Google             | Python / Go / TypeScript / Java | 全生命周期开发与部署            | 模块化设计、多模态流式支持、CLI + 本地 UI、A2A 协议；深度集成 Gemini / Vertex AI | **生产就绪**、Google 生态集成紧密；多语言支持 | 生产级应用、多模态任务、复杂业务自动化、Google Cloud |
| **Strands Agents**        | AWS                    | Python                | 模型驱动自主代理                | 异步工具调用、MCP/A2A 支持、AWS 原生集成（Bedrock/Lambda/EC2）；几行代码建代理 | **简洁高效**、**生产部署极强**；AWS 生态无缝 | 企业级自动化、AWS 集成、高并发/模型驱动任务  |
| **Agno**                  | agno-agi               | Python                | 全栈多代理平台（框架 + 运行时） | AgentOS 云运行时、MCP/A2A、记忆/知识/评估（Agent as Judge）、水平扩展、无状态缩放 | **性能极致**、**隐私云部署强**；多模态/异步统一、高并发 | 企业多代理系统、安全敏感产品、长任务/规模化场景 |

### 推荐
- **追求极致易用性 + 快速上线生产**：首选 **CrewAI**（角色团队协作最直观）或 **OpenAI Agents SDK**（官方支持 + 强大 guardrails / tracing / handoffs）。
- **需要精细状态管理、复杂分支、循环与错误控制**：**LangGraph**（图结构 + 持久化状态 + 可视化调试最强）。
- **Azure 企业环境、合规与可观测性优先**：**Microsoft Agent Framework**（企业稳健、Azure 原生）。
- **Google Cloud / Vertex AI / Gemini 深度集成**：**Agent Development Kit (ADK)**（全生命周期、多语言、多模态）。
- **AWS 生态、高并发、模型驱动简洁开发**：**Strands Agents**（几行代码 + Bedrock/Lambda 部署强）。
- **极致性能、无状态水平扩展、私有云多代理、安全/长任务**：**Agno**（框架 + AgentOS 运行时一体，性能与规模领先）。

### 保持关注
- **CAMEL**、**AgentScope**、**VoltAgent**、**MetaGPT**、**SuperAGI**、**Portia AI**（这些框架多用于研究、特定垂直或实验场景，生产采用率较低）

### 不建议使用
- **OpenAI Swarm**（已被 Agents SDK 取代）
- **AutoGen**（已融入 Microsoft Agent Framework）
- **Semantic Kernel**（同上，独立维护大幅减弱）