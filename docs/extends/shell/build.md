# Shell快速部署

想必大家在学习docker等项目部署方式之前应该都是直接用jar部署单体项目的（这在云端小服务器中是很重要的，因为使用docker镜像部署会格外占用内存），这里我们也讲解一下如何使用传统的打包部署方式快速部署项目。



## 环境准备

既然使用传统的单体部署方式，我们需要提前准备编译环境：Mysql8、Redis、Jdk、Nginx 这四个组件，这里我在云端Linux服务器中提前准备这些编译环境：

![image-20230203155413726](http://cdn.tycoding.cn/docs/202302031554823.png)

之后我们就只需要考虑：

1. 导入Mysql脚本
2. 增加Nginx配置
3. 导入jar包并运行

## 后端

### assembly插件

对于SpringBoot项目，虽然可以直接使用`java -jar`启动，但是由于仍需要：1.读取外部配置文件、2.携带JVM启动参数、3.方便的启动和停止。

这里我使用了`assembly插件`，他是一个项目打包插件，可以将jar、配置文件、shell脚本文件分离开，方便我们部署。具体介绍可以查看博文：[使用Assembly打包和部署Spring Boot工程](https://juejin.cn/post/6938331132752560165)

本项目中已经集成了此插件配置，直接使用maven的打包方式，依次运行clean和package指令：

![image-20230203160729088](http://cdn.tycoding.cn/docs/202302031607123.png)

如上在target目录下会生成`tumo-boot-bin.tar.gz`文件，解压此文件可以看到如下文件：

```
tumo-boot
├── bin
│   ├── start.sh
│   └── stop.sh
├── config
│   ├── application-dev.yml
│   ├── application-prod.yml
│   ├── application.yml
│   └── banner.txt
└── lib
    └── tumo-boot.jar
```

### 部署

首先导入Mysql脚本，然后将上述压缩包文件上传到要部署的云服务器上，然后使用如下命令解压压缩包（注意如果是直接上传解压后的文件夹，需要手动为`.sh`文件修改可执行权限`chmod +x`）

```shell
tar -xvf tumo-boot-bin.tar.gz
```

然后切换到`cd tumo-boot/bin`目录下：

![image-20230203161659855](http://cdn.tycoding.cn/docs/202302031616890.png)

执行如下命令启动项目：

```shell
./start.sh
```

![image-20230203161849705](http://cdn.tycoding.cn/docs/202302031618743.png)

到此，启动成功。

### 后台日志

本项目中配置了`logback-spring.xml`，因此生产环境下所有的日志内容都会输出到相对目录下的`logs`文件夹下并按照年月日进行文件拆分：

```
.
├── bin
│   ├── start.sh
│   └── stop.sh
├── config
│   ├── application-dev.yml
│   ├── application-prod.yml
│   ├── application.yml
│   └── banner.txt
├── lib
│   └── tumo-boot.jar
└── logs
    ├── catalina.log
    └── tumo-boot
        ├── 2023-02
        │   ├── debug.2023-02-01.0.log.gz
        │   └── debug.2023-02-02.0.log.gz
        ├── debug.log
        └── error.log
```

通过如下指令可以在控制台实时查看项目后台日志：

```shell
tail -f tumo-boot/logs/tumo-boot/debug.log
```



## 前端

前端部署更为简单了，只需要编译项目，将生成的静态文件放到nginx目录下即可访问：

![image-20230203163038450](http://cdn.tycoding.cn/docs/202302031630511.png)

如上执行`build`命令其实就是执行`yarn build`命令， 如上会在项目根目录下生成`dist`文件夹，将此文件夹放到生产服务器上即可。



到此为止，前端项目也算部署好了，下面介绍如何配置Nginx。

## Nginx配置

上面前后端部署之后，仍存在两个问题：

1. 前端静态项目需要通过nginx映射才能访问
2. 前端所有接口需要用nginx转发一次才能请求到对应的后端服务接口

下面我直接展示我的nginx配置了，对于nginx语法不再做介绍：

```
server {
  listen 80;
  server_name boot.tycoding.cn;
  root   /var/dev/tumo-boot-ui;
  location ^~/tumo-boot {
      proxy_pass http://127.0.0.1:8090;
      proxy_connect_timeout 15s;
      proxy_send_timeout 15s;
      proxy_read_timeout 15s;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

```

如上很简单，需要监听80端口并且绑定一个域名（没域名可用ip访问），`root`对应了前端静态文件夹`dist`的绝对路径。

`location ^~/tumo-boot`用于将前端请求中所有以`/tumo-boot`开头有的调用都转发到指定的`proxy_pass`服务下，如上也就是把前端所有氢气都转发到本服务器的8090端口上。

最终访问效果：

![image-20230203164142199](http://cdn.tycoding.cn/docs/202302031641256.png)
