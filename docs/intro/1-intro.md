# 项目介绍

**[Tumo-Boot](https://github.com/Tumo-Team/tumo-boot)** 是基于SpringBoot2.5.x、SpringSecurity的RBAC项目脚手架，前端基于Node、Vue3.x、Ant-Design-Vue2.x、Vite、TypeScript。

如果你已经熟悉了RBAC单体项目开发，你可以学习 **Tumo-Cloud：** [https://github.com/Tumo-Team/tumo-cloud](https://github.com/Tumo-Team/tumo-cloud)。

## 项目地址

- **在线预览：** [http://boot.tycoding.cn](http://boot.tycoding.cn)
- **在线文档：** [http://docs.boot.tycoding.cn](http://docs.boot.tycoding.cn)

- **后端源码：** [https://github.com/Tumo-Team/tumo-boot](https://github.com/Tumo-Team/tumo-boot)
- **前端源码：** [https://github.com/Tumo-Team/tumo-boot-ui](https://github.com/Tumo-Team/tumo-boot-ui)
- **文档源码：** [https://github.com/Tumo-Team/tumo-boot-docs](https://github.com/Tumo-Team/tumo-boot-docs)

## 技术栈

**环境**

| Name  | Version    |
| ----- | ---------- |
| JDK   | 1.8        |
| MySql | 5.7        |
| OS    | MacOS10.14 |
| IDEA  | 2022.1     |

**后端**

| Name            | Version | Document                                                     |
| --------------- | ------- | ------------------------------------------------------------ |
| Spring Boot     | 2.5.0   | [https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) |
| Spring Security | 5.5.0   | [https://github.com/spring-projects/spring-security](https://github.com/spring-projects/spring-security) |
| Mybatis-Plus    | 3.4.3.1   | [https://baomidou.com/guide/](https://baomidou.com/guide/)   |
| Hutool          | 5.7.2   | [https://hutool.cn/docs/#/](https://hutool.cn/docs/#/)       |
| Knife4j         | 3.0.3   | [https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/) |

**前端**

| Name           | Version | Document                                                     |
| -------------- | ------- | ------------------------------------------------------------ |
| Vben          | 2.6.1  | [https://github.com/anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin) |
| Vue.js         | 3.1.5     | [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/) |
| Ant-Design-Vue | 2.2.2   | [https://www.antdv.com/docs/vue/introduce-cn/](https://www.antdv.com/docs/vue/introduce-cn/) |

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
    │   │               │   ├── oss			    -- OSS文件配置
    │   │               │   ├── redis			-- Redis配置
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
├── LICENSE
├── README.md
├── build					 -- 构建配置
├── commitlint.config.js
├── docker					 -- Docker构建脚本
├── index.html
├── jest.config.mjs
├── mock
├── node_modules
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public
├── script					 -- Docker启动脚本
├── src
│   ├── App.vue
│   ├── api				  	-- 后端接口地址
│   ├── assets				-- 静态资源文件
│   ├── components		   -- 全局封装的组件
│   ├── design
│   ├── directives
│   ├── enums
│   ├── hooks
│   ├── layouts			    -- Layout布局主键
│   ├── locales			    -- 国际化
│   ├── logics
│   ├── main.ts
│   ├── router			    -- 路由配置
│   ├── settings		    -- 项目全局自定义配置
│   ├── store			    -- VueStore配置
│   ├── utils
│   └── views			    -- 页面组件
├── stylelint.config.js
├── tailwind.config.js
├── tests
├── tsconfig.json
├── types
├── vite.config.ts
└── yarn.lock
```
