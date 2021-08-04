
# Build

在上一章中我们讲解了如何安装Docker和DockerCompose。本文中讲解如何使用Docker拉取、构建、启动镜像。

## Pull

顾名思义，`docker pull`命令是拉取镜像，而镜像的来源主要有三个地方：

1. 官方仓库DockerHub，地址：https://hub.docker.com/
2. 第三方容器托管服务，例如阿里云容器服务：https://cr.console.aliyun.com/cn-hangzhou/instances
3. 个人私有仓库

### docker pull

如果再安装Docker后直接使用`docker pull xx`命令拉取镜像，将默认从DockerHub官方仓库拉取镜像，在国内可能速度会非常慢：

```shell
docker pull nginx
```

![image-20210216141800732](http://cdn.tycoding.cn/20210216141800.png)

### 阿里云加速服务

阿里云容器服务提供了国内Docker镜像加速服务，地址：https://cr.console.aliyun.com/cn-hangzhou/instances

首先需要注册阿里云账户，这里不再演示。注册后在 https://cr.console.aliyun.com/cn-hangzhou/instances 页面中可有查看到自己专属的镜像加速地址：

![image-20210216142106509](http://cdn.tycoding.cn/20210216142106.png)

安装上述教程，配置加速地址，再次`pull`镜像将从加速拉取镜像，速度会非常快：

![image-20210216144928552](http://cdn.tycoding.cn/20210216144928.png)

例如拉取Nginx镜像：

```shell
docker pull nginx
```

![image-20210216142455848](http://cdn.tycoding.cn/20210216142455.png)

## Run

我们需要使用`docker run`命令启动镜像。详细的命令参数可以参考菜鸟教程：https://www.runoob.com/docker/docker-run-command.html

为了方便演示，我们这里不再讲解命令，直接使用Docker Desktop：

![image-20210216144017481](http://cdn.tycoding.cn/20210216144017.png)

本地访问：`localhost:8080`

![截屏2021-02-16 下午2.40.48](http://cdn.tycoding.cn/20210216144054.png)

容器启动成功，并且将容器内部的80端口映射到了宿主机的9000端口，因此本地可以通过9000端口访问到Nginx服务。

进入容器内部，同样我们直接在Desktop操作：

![image-20210216144456678](http://cdn.tycoding.cn/20210216144456.png)

既然我们是在Nginx镜像的基础上启动的容器，那么可以在容器内部找到Nginx配置：

![截屏2021-02-16 下午2.47.57](http://cdn.tycoding.cn/20210216144800.png)

# Dockerfile

如果把Docker比作存放了很多货物的仓库，那么Dockerfile就是明确如何排列自己的货物以便最终能存放到这个仓库中。

对于开发者，我们最终的目的是需要将自己开发的项目最终以Docker镜像的方式部署和运行。那么Docker定义了一些语法规则，按照这些规则我们可以轻松将自己的代码打包放入Docker镜像中，之后就以Docker镜像的方式存在。

举个例子：比如有一个网页`index.html`，我们需要将其部署在Nginx服务中供大家访问。

![image-20210216151411497](http://cdn.tycoding.cn/20210216151411.png)

## 编写Dockerfile

在上图`docker-demo`文件夹根目录下创建`Dockerfile`。Dockerfile主要完成两个操作：

1. 拉取镜像
2. 将代码文件写入到镜像内部

在此之前，我们要明白，Nginx安装后通常会指定一个目录为Nginx服务默认站点目录，并且这个配置一般在`/etc/nginx/conf.d/*.conf`文件中定义。因为上面我们演示了如何进入Nginx容器内部，所以我们先看下它的默认站点目录在哪里：

![image-20210216152744687](http://cdn.tycoding.cn/20210216152744.png)

可以看到最新版本Nginx，将配置文件定义在`/etc/nginx/conf.d/default.conf`，而默认的站点目录定义在`/usr/share/nginx/html`下。那么最终我们仅需要将代码文件拷贝到`/usr/share/nginx/html`即可：

![image-20210216153202712](http://cdn.tycoding.cn/20210216153202.png)

可以看到一共只需要两行代码；第一行代表使用哪个镜像，第二行代表将本目录下的`index.html`文件拷贝到`/usr/share/nginx/html`目录下。

## 构建镜像

```shell
docker build -t test-nginx .
```

tips：其中`-t`跟着的是镜像名称；最后的`.`表示当前目录为构建的上下文路径

![image-20210216154023043](http://cdn.tycoding.cn/20210216154023.png)

同样我们可以通过Docker Desktop进入容器内部查看`/usr/share/nginx/html`目录下是否有我们刚写的 `index.html`：

![image-20210216154326066](http://cdn.tycoding.cn/20210216154326.png)

![image-20210216154517050](http://cdn.tycoding.cn/20210216154517.png)

本地访问`localhost:9001`

![image-20210216154605499](http://cdn.tycoding.cn/20210216154605.png)

可以看到本地的文件已经拷贝到了容器内部，并且细心的你会发现：nginx本身安装后默认站点目录会有两个文件`500.htm`、`index.html`；而我们需要拷贝进去的文件也叫`index.html`，在执行`ADD`指令后，Docker会自动替换容器中的原文件。

有关Dockerfile更多的命令请百度查看对应的文档，这里不再多举例了。

# Compose

如果把Docker比作存放了很多货物的仓库，那么Dockerfile就是明确如何排列自己的货物以便最终能存放到这个仓库中。而`docker-compose则是管理这些仓库中获取的管理员。

我们通常使用`docker-compose`来管理Docker容器，下面将演示如何使用上述我们自己构建的`test-nginx`镜像。

## 编写docker-compose.yml

在上面Docker Desktop中的操作对应的命令是：

![image-20210216160000429](http://cdn.tycoding.cn/20210216160000.png)

如果服务非常多，使用这种方式非常不易操作，因此使用`docker-compose`可以轻松的运行此命令。同样在`docker-demo`目录下创建`docker-compose.yml`文件：

```yaml
version: "3.5"

services: 
  test-nginx:
    image: test-nginx
    ports: 
      - 9002:80
```

使用如下命令启动（`-d`表示后台启动）：

```shell
docker-compose up -d
```

Tips：`docker-compose up`命令默认会根据当前目录下的`docker-compose.yml`中定义的规则启动容器。

![image-20210216161028053](http://cdn.tycoding.cn/20210216161028.png)

访问`localhost:9002`：

![image-20210216161113733](http://cdn.tycoding.cn/20210216161113.png)

有关Docker Compose更多的命令请百度查看相应的文档，这里不再多举例。

# Docker命令

```shell
docker ps -a #查看所有容器
docker ps -aq  #列出所有容器ID
docker stop $(docker ps -aq)  #停止所有容器
docker rm $(docker ps -aq)  #删除所有容器
docker rmi $(docker images -q)  #删除所有镜像
```
