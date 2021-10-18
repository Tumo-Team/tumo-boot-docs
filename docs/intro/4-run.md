# 运行项目

- 后端：基于SpringBoot开发，使用IDEA打开项目会自动加载Maven依赖并识别SpringBoot项目。

- 前端：基于Node、Vue、Vite开发，使用IDEA或VSCode打开项目都可以，先使用`yarn install`安装依赖再`yarn serve`运行项目即可。



## 环境准备

具体需要准备的环境将在后续的文档中介绍，这里先简单介绍笔者本人的环境版本（运行此项目必须的环境）：

> 后端

![image-20210808201834134](http://tycoding.cn/imgs/20210808201834.png)

> 前端

![image-20210808201709796](http://tycoding.cn/imgs/20210808201709.png)



## 后端

### 下载项目

先下载项目：

```shell
git clone https://github.com/Tumo-Team/tumo-boot.git
```

使用IDEA打开项目，等待Maven加载结束后，左上方会提示`TumoBootApp`：

![image-20210809124155457](http://tycoding.cn/imgs/20210809124155.png)

如果Maven加载失败（即右侧Maven面板中有错误），需多刷新几次Maven依赖即可（网络差或没使用国内镜像源）。



### 准备环境

首先需要保证本地Redis和MYSQL已经启动。

> 1.导入数据库脚本

本项目脚本文件：[https://github.com/Tumo-Team/tumo-boot/tree/main/db](https://github.com/Tumo-Team/tumo-boot/tree/main/db)。此脚本文件中包含了 `create database` 的语句，所以不需手动创建数据库，执行脚本即可。

> 2.修改本地Hosts文件

建议使用`SwitchHosts`软件操作，无需考虑权限问题直接更改本地Host文件。增加如下映射：

```
127.0.0.1 tumo-boot-mysql
127.0.0.1 tumo-boot-redis
```



### 启动项目

Maven正常加载后，就可以直接启动项目了，显示如下日志证明启动成功：

![image-20210809130145419](http://tycoding.cn/imgs/20210809130145.png)

如日志所示，我们可以访问：`localhost:8090/doc.html` 查看Swagger接口文档：

![image-20210809130309593](http://tycoding.cn/imgs/20210809130309.png)



## 前端

笔者由于习惯使用IDEA，所以前端也将使用IDEA打开。（最好先安装Vue和TypeScript插件）

### 下载项目

使用如下命令下载源码：

```shell
git clone https://github.com/Tumo-Team/tumo-boot-ui.git
```

接下来需要先安装项目：

```shell
yarn install
```

![image-20210809131311963](http://tycoding.cn/imgs/20210809131312.png)

等待安装完毕后，使用IDEA打开此项目：

![image-20210809131601568](http://tycoding.cn/imgs/20210809131601.png)

启动如上脚本即可：

![image-20210809131647355](http://tycoding.cn/imgs/20210809131647.png)



浏览器访问：[http://localhost:3100/](http://localhost:3100/)

![image-20210809131751070](http://tycoding.cn/imgs/20210809131751.png)

输入验证码并登录：

![image-20210809131946964](http://tycoding.cn/imgs/20210809131947.png)

如上，整个项目启动完成。

