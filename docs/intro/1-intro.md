# 项目介绍

**[Tumo-Boot](https://github.com/Tumo-Team/Tumo-Boot)** 是基于SpringBoot2.4.x、SpringSecurity开发的权限管理项目，前端基于Node、Vue2.x、Ant-Design-Vue开发。

## 项目地址

- **项目后端：** [https://github.com/Tumo-Team/Tumo-Boot](https://github.com/Tumo-Team/Tumo-Boot)
- **项目前端：** [https://github.com/Tumo-Team/Tumo-Boot-Admin](https://github.com/Tumo-Team/Tumo-Boot-Admin)
- **项目文档：** [https://github.com/Tumo-Team/Tumo-Boot-Docs](https://github.com/Tumo-Team/Tumo-Boot-Docs)

## 技术栈

**环境**

| Name  | Version    |
| ----- | ---------- |
| JDK   | 1.8        |
| MySql | 5.7        |
| OS    | MacOS10.14 |
| IDEA  | 2020.2     |

**后端**

| Name            | Version | Document                                                     |
| --------------- | ------- | ------------------------------------------------------------ |
| Spring Boot     | 2.4.3   | [https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/) |
| Spring Security | 5.4.2   | [https://docs.spring.io/spring-security/site/docs/5.4.2/reference/html5/](https://docs.spring.io/spring-security/site/docs/5.4.2/reference/html5/) |
| Mybatis-Plus    | 3.4.0   | [https://baomidou.com/guide/](https://baomidou.com/guide/)   |
| Hutool          | 5.5.4   | [https://hutool.cn/docs/#/](https://hutool.cn/docs/#/)       |
| Knife4j         | 3.0.2   | [https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/) |

**前端**

| Name           | Version | Document                                                     |
| -------------- | ------- | ------------------------------------------------------------ |
| Vue.js         | 2.x     | [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/) |
| Axios          | 0.18.1  | [http://axios-js.com/zh-cn/docs/index.html](http://axios-js.com/zh-cn/docs/index.html) |
| Vue-Router     | 3.0.2   | [https://router.vuejs.org/zh/installation.html](https://router.vuejs.org/zh/installation.html) |
| Vuex           | 3.1.0   | [https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)     |
| Ant-Design-Vue | 1.7.2   | [https://www.antdv.com/docs/vue/introduce-cn/](https://www.antdv.com/docs/vue/introduce-cn/) |

## 项目结构

**后端**

```
.
├── LICENSE
├── README.md
├── db											-- 项目SQL文件
├── docker-compose.yml							-- 项目Docker镜像启动配置
├── generate									-- 项目代码生成配置
├── pom.xml
└── src
    ├── main
    │   ├── java								-- Java代码目录
    │   │   └── cn
    │   │       └── tycoding
    │   │           └── boot
    │   │               ├── TumoBootApp.java	-- 启动类
    │   │               ├── common				-- 公共层代码
    │   │               │   ├── auth			-- 权限相关配置
    │   │               │   ├── core			-- 公共层核心配置
    │   │               │   ├── log				-- 日志相关配置
    │   │               │   ├── mybatis			-- Mybatis相关配置
    │   │               │   └── swagger			-- Swagger文档相关配置
    │   │               └── modules				-- 业务模块
    │   │                   ├── auth			-- 授权模块
    │   │                   ├── system			-- 系统模块
    │   │                   └── upms			-- 用户权限管理模块
    │   └── resources							-- 配置文件目录
    │       ├── META-INF
    │       │   └── spring.factories			-- Spring Bean配置
    │       ├── application-dev.yml				-- 开发环境配置
    │       ├── application-prod.yml			-- 生产环境配置
    │       ├── application.yml					-- 基础配置
    │       ├── banner.txt
    │       ├── logback-spring.xml				-- logback日志打印配置
    │       ├── mapper							-- Mybatis接口XML配置
    │       └── static							-- 项目静态资源（不被拦截）
    └── test									-- 测试文件目录
        └── java
            └── PasswordGenerateTest.java		-- 密码加密工具测试类
```



**前端**

```
.
├── Dockerfile			-- Docker镜像构建脚本
├── dist				-- 项目构建后的静态文件目录
├── docker				-- Docker构建镜像配置文件（Nginx配置）
├── public				-- 静态资源目录（不被拦截）
├── src
│   ├── App.vue
│   ├── api				-- axios接口文件
│   ├── assets			-- 项目静态资源目录（被拦截）
│   ├── components		-- 项目公共层组件目录
│   ├── directive		-- 项目公共层封装指令目录
│   ├── filters			-- 项目公共层封装过滤器目录
│   ├── icons			-- 项目图标目录
│   ├── layout			-- 项目Layout布局组件
│   ├── main.js
│   ├── permission.js	-- VueRouter全局路由拦截器
│   ├── router			-- 项目路由配置文件
│   ├── settings.js		-- 项目通用设置配置
│   ├── store			-- 项目Vuex配置文件
│   ├── styles			-- 项目全局样式
│   ├── utils			-- 工具类
│   └── views			-- 项目页面
└── vue.config.js
```
