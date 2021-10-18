
# 构建Tumo-Boot项目镜像

因为在前面文章中我们已经详细介绍了如何使用Dockerfile编排镜像以及如何使用`docker-compose`启动容器，那么在这里主要介绍对于当前Tumo-Boot项目如何构建Docker镜像。

## 写在前面

在开始之前，我们先介绍一些常见的指令，以便接下来编写Dockerfile和Compose。

首先举例几个`Dockerfile`文件中常出现的指令：

```
Dockerfile
    - FROM: 指定基础镜像，Dockerfile文件必须以此指令开头
    - MAINTAINER/LABEL: 指定镜像的作者信息 
    - WORKDIR: 指定工作目录。例如指定`/build`，那么构建后的镜像根目录下会有`build`文件夹，`COPY`进镜像的文件就存放在这里
    - ADD: 拷贝文件或目录到镜像中，格式：`<src> <dest>`。如果dest以`./`开头表示相对WORKDIR的目录
    - RUN: 在[镜像构建过程中]执行的Shell脚本命令
    - EXPOSE: 暴露容器端口。在容器network非host模式的情况下这个指令仅仅有提醒的作用，因为使用`-p`才最终决定映射到哪个端口。
    		  在容器network为host模式下，宿主机和容器在同一网络中（不再存在端口映射），这时此指令才有意义
    - ENTRYPOINT: 
```




## 构建后端镜像

首先需要在项目根目录创建`Dockerfile`：

```dockerfile
FROM openjdk:8-jre
MAINTAINER tycoding@sina.com

WORKDIR /build

ADD ./target/tumo-boot.jar ./app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

CMD ["--spring.profiles.active=prod"]
```

上述主要完成三个工作

上面仅仅是指定了项目依赖的jdk镜像，其实运行项目还需要mysql、redis等等。

下面项目根目录创建`docker-compose.yml`：

```yml
version: "3.5"

services:
  tumo-boot-redis:
    image: redis:6.0
    restart: always
    hostname: tumo-boot-redis
    container_name: tumo-boot-redis
    privileged: true
    command: "redis-server --appendonly yes"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 8101:6379

  tumo-boot:
    image: tumo-boot
    build:
      context: ./
    restart: always
    container_name: tumo-boot
    hostname: tumo-boot
    privileged: true
    ports:
      - 8090:8090
```

Tips：如上，我们仅仅定义了项目使用的Redis服务，而项目启动必须使用的MySql服务不建议大家部署到Docker容器中，个人觉得容易造成数据丢失（本例中将使用本地的MySQL服务）。

最后看一下项目目录结构：

![image-20210207140336593](http://tycoding.cn/imgs/20210207140336.png)

### 打包项目

项目开发完成后首先要打包项目，在项目根目录运行：

```shell
mvn clean install -Dmaven.test.skip=true
```

之后会在项目根目录生成`target`目录，可以看到生成的`tumo-boot.jar`（此名称是通过`pom.xml`中的`<build><finalName>`配置的）：

![image-20210207140758215](http://tycoding.cn/imgs/20210207140758.png)

### 构建镜像

上面打包后，同样在项目根目录下执行：

```shell
docker-compose build
```

![image-20210214191144950](http://tycoding.cn/imgs/20210214191150.png)

最后通过Docker Desktop客户端或者命令查看构建的容器：

![image-20210214191320529](http://tycoding.cn/imgs/20210214191320.png)

## 构建前端镜像

前端项目虽然是基于Node.js的，但实际上部署到服务器的仅仅是Node服务打包后静态文件。因此部署静态文件最简单的方式是通过nginx做映射。

### 打包项目

因为前端项目根目录下文件太多了，这里创建`docker`文件夹单独存放Docker配置文件。

在`docker`文件夹下创建：

`Dockerfile`：

```dockerfile
FROM nginx

COPY ./dist /data

RUN rm /etc/nginx/conf.d/default.conf

ADD ./nginx.conf /etc/nginx/conf.d/
```

tips：因为需要配置Nginx映射本项目，所以需要提供Nginx配置，这里直接在本地创建好conf文件并使用Docker指令拷贝到容器中。

下面先看下`nginx.conf`文件：

```
server {
    listen    80;
    root      /data/;

    location ^~/tumo-boot {
       proxy_pass http://172.30.0.80:8090;
       proxy_connect_timeout 15s;
       proxy_send_timeout 15s;
       proxy_read_timeout 15s;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

tips：上面Nginx配置中，最重要的一点是对前端项目请求后端API地址的转发，如上`location ^~/tumo-boot `命令会将前端中所有`/tumo-boot`开头的请求都转发到`http://127.0.0.1:8090`服务上。

`docker-compose.yml`：

```yml
version: "3.5"

services:
  tumo-boot-ui:
    image: tumo-boot-ui
    build:
      context: .
    restart: always
    container_name: tumo-boot-ui
    ports:
      - 8091:80
```

到此为止，其实我们仅仅完成了项目构建Docker镜像的基础配置，还需要打包项目。

熟悉Node朋友应该知道使用`npm run build`打包前端项目，这个命令脚本其实依赖于项目根目录下`package.json`中的定义：

![image-20210207143423101](http://tycoding.cn/imgs/20210207143423.png)

运行此命令将在根目录下生成`dist`文件夹。

同理构建Docker容器也需要`dist`中的静态文件，因此我们单独创建一个命令脚本`build:docker`，使用`--dest`指令将生成的`dist`目录指定到`./docker/dist`目录下。vue-cli官方文档：https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-build

运行：

```shell
npm run build:docker
```

![image-20210216170030072](http://tycoding.cn/imgs/20210216170030.png)

### 构建镜像

根据上面我们打包后端项目的经验，打包前端。

```shell
cd docker/
```

执行命令：

```shell
docker-compose build
```

![image-20210216171056645](http://tycoding.cn/imgs/20210216171056.png)

## Run

到此为止，其实文章中并没有涉及启动镜像容器的阐述，这是因为如果按照上述的

**考虑几个比较重要的问题：**

1. `tumo-boot`容器如何访问`tumo-boot-redis`容器中的Redis服务
2. `tumo-boot`容器如何访问服务器本身的`mysql`服务

这里涉及容器间网络通信以及容器与宿主机网络通信，后续文章将详细介绍。

# Docker部署

在之前文章中我们讲解过如何使用阿里云镜像仓库，这里不再讲解。我们单独创建两个仓库存放前后端项目镜像：

![image-20210216174444201](http://tycoding.cn/imgs/20210216174444.png)

## Push

下面将镜像上传到上述两个仓库中，不再详细说明：

![image-20210216175153298](http://tycoding.cn/imgs/20210216175153.png)

## Pull

上面已经将本地镜像推送到了阿里云私有仓库。接下来`ssh`连接自己的服务器，拉取刚刚上传的镜像
