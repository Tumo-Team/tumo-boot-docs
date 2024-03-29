# SpringBoot项目搭建

如何搭建SpringBoot项目？想必各位小伙伴都知道，通常有以下几种方式：

1. 使用`spring.io`官方提供的快速创建SpringBoot项目
2. 使用IDEA自带的SpringBoot项目创建方式（其实还是用的`spring.io`的方式）
3. 直接一个携带`pom.xml`的文件夹作为项目根目录

## Start.Spring.io

Spring官方提供了快速创建SpringBoot项目的站点：[https://start.spring.io/](https://start.spring.io/)

![截屏2021-02-03 下午3.07.39](http://tycoding.cn/imgs/20210203150752.png)

可以在上面选择我们需要的依赖以及SpringBoot版本、Java版本等配置。点击最下方的GENERATE按钮即可生成项目文件，我们看下生成的文件结构：

![image-20210203151043187](http://tycoding.cn/imgs/20210203151043.png)

然后使用IDE打开此文件夹即可自动加载Maven项目。

## IDEA

如同`https://start.spring.io/`提供的方式一样，IDEA完美复刻了这种创建SpringBoot项目的方式。依次选择：File -> New -> Project -> Spring Initializr。

![截屏2021-02-03 下午3.15.13](http://tycoding.cn/imgs/20210203151516.png)

创建后的项目和第一种方式基本一样，这里不再展示了。

## 我的方式

上面两种方式想必大家都知道，其实这两种方式都有一些小瑕疵。就是生成的文件目录中都包含了很多用处不大的配置文件：

```
.mvn
mvnw
mvnw.cmd
```

无论是Mac系统还是Windows系统，其实这三个文件没有太大实际意义。

我们其实可以直接创建`demo`文件夹，然后拖进去一个`pom.xml`，最后使用IDE打开这个文件夹即可。

![image-20210203152003406](http://tycoding.cn/imgs/20210203152004.png)

如上，我们再创建文件夹即可，IDEA将自动识别这个目录结构：

![image-20210203152125766](http://tycoding.cn/imgs/20210203152125.png)

使用上述方式，我们再创建Application作为SpringBoot的启动器即可。

ps：如果遇到（需要目标发行版11），是因为项目配置了JDK 11方式启动，修改（Mac）：

1. `pom.xml` -> java.version -> 8
2. Setting -> Build,Execution -> Compiler -> Java Compiler -> 8
3. Project Structurt -> Project -> 8
4. Project Structurt -> Modules -> 8

![截屏2021-02-03 下午3.31.09](http://tycoding.cn/imgs/20210203153114.png)

如上，运行App.java中的main方法即可启动项目，项目默认使用8080端口（没有写配置文件）
