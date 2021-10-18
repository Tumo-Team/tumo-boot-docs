# 环境准备-后端

| Name  | Version    |
| ----- | ---------- |
| JDK   | 1.8        |
| MySql | 5.7        |
| OS    | MacOS10.14 |
| IDEA  | 2021.1     |

## 开发环境

### Mysql

具体的搭建教程，相信大家都知道了，这里提供一个教程地址：

[https://www.runoob.com/mysql/mysql-install.html](https://www.runoob.com/mysql/mysql-install.html)

本人的MYSQL版本：

![image-20201221132929444](http://tycoding.cn/imgs/20201221132950.png)

### JDK

JDK的搭建教程我更不用赘述了，这里还是提供一个教程地址：

[https://www.runoob.com/java/java-environment-setup.html](https://www.runoob.com/java/java-environment-setup.html)

本人的JDK版本：

![image-20201221133137136](http://tycoding.cn/imgs/20201221133137.png)

### Redis

Redis安装教程相比上述两个更为简单，这里仍提供一个教程地址：

[https://www.runoob.com/redis/redis-install.html](https://www.runoob.com/redis/redis-install.html)

本人Redis-Server版本：

![image-20201221152316844](http://tycoding.cn/imgs/20201221152316.png)

### Node

想要运行Vue前端项目，必须有Node.js的支持，安装起来也非常简单，这里提供一个教程地址：

[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

本人Node版本：

![image-20201221152159177](http://tycoding.cn/imgs/20201221152159.png)

**Tips**

本项目前端基于Vue3 & Vite & TypeScript，和Webpack类似，但是Vite可以更快的编译项目。

## 其他工具

### Redis管理工具

RedisDesktopManager，一套开源的Redis管理工具：

[https://github.com/uglide/RedisDesktopManager](https://github.com/uglide/RedisDesktopManager)

### IDEA插件

![image-20201221140401416](http://tycoding.cn/imgs/20201221140401.png)

1. Lombok插件：`lombok`

这个是必须的插件，没有这个插件，可能项目无法正常在IDEA启动。

![image-20201221135352452](http://tycoding.cn/imgs/20201221135352.png)

2. Alibaba代码规范插件：`Alibaba Java Coding Guidelines`

此插件将提示你代码中可能出现的不规范的写法，强烈推荐。

![image-20201221135003778](http://tycoding.cn/imgs/20201221135003.png)

3. Git工具箱：`GitToolBox`

此插件将提示项目中Git版本和提交记录等信息，非常好用。

![image-20201221135113004](http://tycoding.cn/imgs/20201221135113.png)

4. Vue插件：`Vue.js`

首先需要安装IDEA本身提供的Vue插件：`IntelliVue`。

因为本人前后端都使用的IDEA作为开发工具，除了IDEA本身提供的Java代码支持，还需要添加扩展让他支持Vue代码高亮和语法提示。

![image-20201221135818876](http://tycoding.cn/imgs/20201221135819.png)

除此之外，ElementUI本身还提供了语法提示插件：`element`

5. 翻译插件：`Translation`

苦于本人英语水平不咋地，所以有时遇到接口命名问题，总是非常纠结，于是IDE内提供一个翻译入口非常有用。

![image-20201221140302346](http://tycoding.cn/imgs/20201221140302.png)
