
# Registry

在之前的文章中我们讲解了如何将本地的项目代码打包进Docker容器中，而之后项目就以Docker镜像的方式存在了；那么这种存在形式可以说不再透明了（当前它肯定是对应了本地磁盘的某个文件），我们必须使用Docker命令才能操作镜像。

那么必然面临一个问题，项目最终是需要部署到服务器上，并且通过外网供大家访问，如何将本地Docker服务中的镜像拷贝到远程服务器的Docker服务中呢？

此时需要一个媒介，这个媒介就是Docker仓库，我们可以在 https://hub.docker.com/ 上注册账户，作为镜像推送和拉取的媒介。但前面讲过DockerHub在国内访问速度很慢，我们可以使用阿里云提供的免费的容器镜像服务：https://cr.console.aliyun.com/cn-hangzhou/instances。

首先在本地构建Docker镜像（存在本地Docker仓库中），然后上传到远程Docker仓库。

![image-20210207154302048](http://tycoding.cn/imgs/20210207154302.png)

从上图可以看到，其实有两种方式能够实现Docker镜像的传输：

1. 利用一些开放的公共仓库（如：阿里云容器服务）
2. 自己手动在服务器上搭建私有仓库

由于第二种方式比较麻烦，我这里直接使用阿里云提供的容器镜像服务（免费的）。

## 阿里云容器服务

官方地址：[https://cr.console.aliyun.com/cn-hangzhou/instances](https://cr.console.aliyun.com/cn-hangzhou/instances) 

注册完成后，可以进行：使用专属的镜像加速器、创建私有仓库。

### 默认实例

在默认实例中可以修改 **访问凭证**中增加Docker仓库的访问密码：

![image-20210207160436090](http://tycoding.cn/imgs/20210207160436.png)

### 镜像仓库

下面需要创建命名空间和镜像仓库，之后的`pull`和`push`操作都将依赖于此仓库：

![image-20210216162821851](http://tycoding.cn/imgs/20210216162821.png)

点击仓库，可以看到官方给出了详细的操作文档：

![image-20210216163022741](http://tycoding.cn/imgs/20210216163022.png)

## Push

在之前我们使用`docker-compose`构建了`test-nginx`镜像，下面将演示如何将此镜像推送到个人阿里云镜像仓库中：

![image-20210216163739660](http://tycoding.cn/imgs/20210216163739.png)

在阿里云容器服务官网查看刚才push的镜像：

![image-20210216163918771](http://tycoding.cn/imgs/20210216163918.png)

## Pull

同样，我们使用如下命令便可以拉取上述镜像：

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/tumo/test-nginx:test
```
