# 项目介绍

**[Tumo-Boot](https://github.com/Tumo-Team/tumo-boot)** 是基于SpringBoot2.x、SpringSecurity的RBAC项目脚手架，前端基于Node、Vue3.x、Ant-Design-Vue2.x、Vite、TypeScript。

如果你已经熟悉了RBAC单体项目开发，你可以学习 **Tumo-Cloud：** [https://github.com/Tumo-Team/tumo-cloud](https://github.com/Tumo-Team/tumo-cloud)。

## 项目地址

- **在线预览：** [http://boot.tycoding.cn](http://boot.tycoding.cn)
- **在线文档：** [http://docs.boot.tycoding.cn](http://docs.boot.tycoding.cn)

- **后端源码：** [https://github.com/Tumo-Team/tumo-boot](https://github.com/Tumo-Team/tumo-boot)
- **前端源码：** [https://github.com/Tumo-Team/tumo-boot-ui](https://github.com/Tumo-Team/tumo-boot-ui)
- **文档源码：** [https://github.com/Tumo-Team/tumo-boot-docs](https://github.com/Tumo-Team/tumo-boot-docs)

## 技术栈

**环境**

| Name  | Version |
| ----- | ------- |
| JDK   | 1.8     |
| MySql | 8.x     |
| OS    | MacOS13 |
| IDEA  | 2022.x  |

**后端**

| Name            | Version | Document                                                     |
| --------------- | ------- | ------------------------------------------------------------ |
| Spring Boot     | 2.x  | [https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) |
| Spring Security | 5.x  | [https://github.com/spring-projects/spring-security](https://github.com/spring-projects/spring-security) |
| Mybatis-Plus    | 3.x  | [https://baomidou.com/guide/](https://baomidou.com/guide/)   |
| Hutool          | 5.x  | [https://hutool.cn/docs/#/](https://hutool.cn/docs/#/)       |

**前端**

| Name           | Version | Document                                                     |
| -------------- | ------- | ------------------------------------------------------------ |
| Vben          | 2.x | [https://github.com/anncwb/vue-vben-admin](https://github.com/anncwb/vue-vben-admin) |
| Vue.js         | 3.x  | [https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/) |
| Ant-Design-Vue | 2.x  | [https://www.antdv.com/docs/vue/introduce-cn/](https://www.antdv.com/docs/vue/introduce-cn/) |

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
```



**前端**

```

.
├── build # 打包脚本相关
│   ├── config # 配置文件
│   ├── generate # 生成器
│   ├── script # 脚本
│   └── vite # vite配置
├── mock # mock文件夹
├── public # 公共静态资源目录
├── src # 主目录
│   ├── api # 接口文件
│   ├── assets # 资源文件
│   │   ├── icons # icon sprite 图标文件夹
│   │   ├── images # 项目存放图片的文件夹
│   │   └── svg # 项目存放svg图片的文件夹
│   ├── components # 公共组件
│   ├── design # 样式文件
│   ├── directives # 指令
│   ├── enums # 枚举/常量
│   ├── hooks # hook
│   │   ├── component # 组件相关hook
│   │   ├── core # 基础hook
│   │   ├── event # 事件相关hook
│   │   ├── setting # 配置相关hook
│   │   └── web # web相关hook
│   ├── layouts # 布局文件
│   │   ├── default # 默认布局
│   │   ├── iframe # iframe布局
│   │   └── page # 页面布局
│   ├── locales # 多语言
│   ├── logics # 逻辑
│   ├── main.ts # 主入口
│   ├── router # 路由配置
│   ├── settings # 项目配置
│   │   ├── componentSetting.ts # 组件配置
│   │   ├── designSetting.ts # 样式配置
│   │   ├── encryptionSetting.ts # 加密配置
│   │   ├── localeSetting.ts # 多语言配置
│   │   ├── projectSetting.ts # 项目配置
│   │   └── siteSetting.ts # 站点配置
│   ├── store # 数据仓库
│   ├── utils # 工具类
│   └── views # 页面
├── test # 测试
│   └── server # 测试用到的服务
│       ├── api # 测试服务器
│       ├── upload # 测试上传服务器
│       └── websocket # 测试ws服务器
├── types # 类型文件
├── vite.config.ts # vite配置文件
└── windi.config.ts # windcss配置文件
```
