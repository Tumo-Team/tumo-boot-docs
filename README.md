<p align="center">
    <img src="http://cdn.tycoding.cn/MIK-WxRzP9.png" />
</p>
<p align="center">
    <a href="https://github.com/Tumo-Team" target="_blank">
        <strong>Tumo Team —— Tumo-Boot</strong>
    </a>
</p>

# Tumo Boot Docs

```java
public static void main(String[] args){
    System.out.println("Hello Tumo Team!");
}
```

**特点：**

1. 代码简洁、规范。
2. 提供最后端系统最基础的权限体系模块。
3. 项目文档将涉及前后端、运维，带你一步步学习怎么优雅的开发。
4. 基于SpringBoot最新版，单体架构，前后端分离。前端采用Ant-Design-Vue。
5. 提供最最最基础、完善的项目开发文档，所有源码及文档都开源在GitHub上。

## Docs

- **Intro**
  - 1. **[项目介绍](docs/intro/1.intro.md)**
  - 2. **[文档介绍](docs/intro/2.docs-introduce.md)**
  - 3. **[代码生成](docs/intro/3.generate.md)**

- **后端**
  
  - 1. **项目设计**
    
    - [x] **1.1 环境准备**
    - [ ] **1.2 SpringBoot项目搭建**
    - [ ] **1.3 项目目录结构设计**
  
  - 2. **数据库设计**

    - [ ] **2.1 RBAC权限表设计**
    - [ ] **2.2 RBAC权限表操作**
    - [ ] **2.3 日志表设计**

  - 3. **Common模块封装**
  
    - [ ] **3.1 YML自定义配置**
    - [ ] **3.2 Common-Core 模块封装**
    - [ ] **3.3 Common-Auth模块封装**
    - [ ] **3.4 Common-Mybatis模块封装**
    - [ ] **3.5 Common-Swagger模块封装（Knife4j）**
    - [ ] **3.6 Common-Log模块封装**
  
  - 4. **日志模块**
  
    - [ ] **4.1 全局异常处理**
    - [ ] **4.2 请求日志和接口日志打印**
    - [ ] **4.3 日志数据持久化**
  
  - 5. **引入SpringSecurity**
  
    - [ ] **5.1 Security基础配置**
    - [ ] **5.2 自定义OAuth2响应结构**
    - [ ] **5.3 重写OAuth2异常**
  
  - 6. **Auth模块开发**
  
    - [ ] **6.1 登录、注销接口**
    - [ ] **6.2 Vue前端对接登录接口**
  
  - 7. **System模块开发**
  
    - [ ] **7.1 用户模块开发**
    - [ ] **7.2 角色、部门模块开发**
    - [ ] **7.3 菜单模块开发**
  
  - 8. **代码生成**
  

  
- **前端**

  - 1. **项目设计**

    - [ ] **1.1 环境准备**
    - [ ] **1.2 项目目录结构设计**

  - 2. **基础模块封装**

    - [ ] **2.1 项目Layout布局**
    - [ ] **2.2 Axios、Router封装**
    - [ ] **2.3 VueX封装**
    - [ ] **2.4 前端交互流程**

  - 3. **数据交互**

    - [ ] **3.1 数据交互**
    - [ ] **3.2 登录流程**
    - [ ] **3.3 动态菜单**

  - 4. **页面CRUD**

    - [ ] **4.1 页面开发**
    - [ ] **4.2 Vue组件交互**
    - [ ] **4.3 和后端数据交互**

  - 5. **实践**

    - [ ] **5.1 新增页面**
    - [ ] **5.2 CRUD**

  - 6. **代码生成**



## Deploy

本文档使用 [docsify](https://docsify.js.org/#/) ，推荐以下两种部署方式：

1. 使用 Github Pages 部署文档（缺点：国内访问速度慢）
2. 使用自己的服务器，部署到Nginx（缺点：需要手动执行脚本）

详细请看文档：[文档部署](docs/other/deploy.md)


## License

[MIT](https://github.com/Tumo-Team/Tumo-Boot/blob/master/LICENSE)

Copyright (c) 2020-present TyCoding
