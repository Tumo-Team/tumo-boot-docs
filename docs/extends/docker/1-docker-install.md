# Docker安装

本文将Docker客户端安装分为本地和Linux服务器两版。因为笔者使用电脑为MacOS系统，所以Windows安装Docker将不再讲解；本文中Linux服务器是使用的阿里云云服务器。

## 安装Docker（MacOS）

在服务器上安装Docker之前，我们最好先在本地也安装Docker，这样方便后续的镜像推送。

如何安装？

官网 [https://www.docker.com/get-started](https://www.docker.com/get-started) 找到适合自己系统的Desktop版本下载安装即可，其将会自动安装`docker-compose`，我们可以查看安装是否成功：

```shell script
docker --version
docker-compose --version
```

![image-20210214195117730](http://cdn.tycoding.cn/20210214195117.png)

无论是Mac系统还是Windows系统，都提供了可视化的管理工具，例如Mac系统：

![截屏2021-02-14 下午7.52.45](http://cdn.tycoding.cn/20210214195249.png)

## 安装Docker （Ubuntu）

上面仅仅是在本地安装了Docker，无论是MacOS还是Windows，都只需要安装Desktop版就可以了。但是服务端需要执行命令才可以，下面本人以阿里云服务器（Ubuntu）安装Docker为例：

> Docker 安装

```shell script
sudo apt-get update

sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get -y update

sudo apt-get -y install docker-ce
```

> 启动 Docker 

```shell script
sudo systemctl enable docker

sudo systemctl start docker
```

> 建立 Docker 用户组

```shell script
sudo groupadd docker
sudo usermod -aG docker $USER
```

### 安装Docker-Compose

```shell script
sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

tips：这里安装Docker-Compose是直接下载GitHub指定的release版本。因为我们本地安装客户端会自动安装Docker-Compose，所以大家无论安装Docker还是Docker-Compose都尽量保证和本地版本一致。

具体可以在：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases) 找到对应的版本并修改上述命令

tips：如果之前重复安装过docker-compose，如果执行了上述命令后仍然报错：

```shell
-bash: /usr/bin/docker-compose: No such file or directory
```

运行：

```shell
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

官方文档：[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

验证安装是否成功：

![image-20210214195458146](http://cdn.tycoding.cn/20210214195458.png)
