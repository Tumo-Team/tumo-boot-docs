# Tumo-Boot项目搭建

上一章我们介绍了如何搭建SpringBoot项目，这章我们讲解如何搭建Tumo-Boot项目。

## 写在前面

首先，本项目作为单体项目，区别于微服务项目，目录结构通常也会有两种：

1. 传统模式。（所有代码都在一个目录下，在`src`下进行代码的模块化拆分）

```
├── project
│   ├── src
│   	├──	common
│   	├──	modules
│   		├──	m1
│   		├──	m2
├── pom.xml
```

2. Maven多模块模式。（每个模块单独作为一个项目目录，类似于微服务项目结构）

```
├── project1
│   ├── src
│   ├── pom.xml
├── project2
│   ├── src
│   ├── pom.xml
├── pom.xml
```

第二种方式，本质上还是一个项目，只不过将代码拆分成多个模块并用单独的文件夹存放，整个项目还是用的同一个启动器类。

个人觉得：

- 业务相对简单的项目：第一种方式足够了，可以在`src`目录下再进行模块化拆分，代码也更便于查看，不用多个模块间依赖引入，迁移成本也比较低。缺点可能是代码的目录层级比较深。
- 业务相对复杂的项目：最好还是微服务化，更便于后续维护

本项目Tumo-Boot将采用第一种方式。

## 目录结构设计

在上一章中我们已经讲解了如何搭建SpringBoot项目，首先我们先准备好项目基础框架：

![截屏2021-02-04 下午1.29.27](http://tycoding.cn/imgs/20210204132938.png)

如上启动App中的`main`方法即可启动项目。

### 模块化

接下来，很重要的一步就是如何将项目模块化拆分。**这很必要**，如果代码量很大，不进行模块拆分，代码完全是在堆砌，像一坨屎一样不堪入目。

听起来好像挺高大上的，但其实就是把代码归归类，把相关的代码放在一起，不相关的代码隔离开，听起来好像也挺简单，下面我们思考一下项目中可能用到什么模块？

![image-20210204134349625](http://tycoding.cn/imgs/20210204134349.png)

上图中我简单梳理了一下常见项目中可能用到的模块。

- 公共层：顾名思义，存放了可能被其他所有模块都调用的公共代码
  - `utils`：全局封装一些常用的工具类
  - `config`：配置类
  - `constant`：常量类，通常将系统中公用的常量抽离出来统一定义（千万不要）
- 业务层：存放业务代码，根据项目业务需求，通常会把业务拆分为很多子模块，比如常见的：`auth`授权模块、`upms`用户权限模块
  - `controller`：SpringBoot约定的控制器层，通常使用`@Controller`标记
  - `entity`：Java Bean实体类
  - `service`：服务层，通常使用`@Service`标记
  - `mapper`：持久层，也可称`dao`层，负责和数据库交互，通常使用`@Mapper`标记

**tips：**对于公共层而言，由于项目引入组件的增多，也需要根据不同的组件细分，完全不需要（基础）任何依赖的组件，我常用`core`定义。

下面我们依次创建目录结构。

![image-20210204140734607](http://tycoding.cn/imgs/20210204140734.png)

如上，项目整体结构分明，很容易明白某个模块是负责什么的。

并且，如果我们后续开发微服务项目，完全可以延续这种结构去拆分微服务模块。

## 引入依赖

首先附上Maven仓库地址：[https://mvnrepository.com/](https://mvnrepository.com/)

接下来我们需要给项目提供常见的依赖组件（后续根据业务有需要再进行扩展）。

一些基础组件：

```xml
<!-- Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- MySql -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!-- 测试 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

**Hutool：**

官方文档：[https://hutool.cn/docs/#/](https://hutool.cn/docs/#/)

封装了很多常见的工具类，不用我们重复造轮子了。

```xml
<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

**Mybatis-Plus：**

官方文档：[https://baomidou.com/guide/](https://baomidou.com/guide/)

对Mybatis的封装，提供很多类似JPA、Hibernate操作数据库的方法，大大避免我们主动写SQL去操作数据库。

```xml
<!-- Mybatis-Plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>${mybatis-plus.version}</version>
</dependency>
```

注意，引入此依赖会自动引入`mybatis-spring`依赖，我们无需重复引入。

**Lombok：**

提供很多注解，例如：避免手动写setter/getter方法并且提供链式编程，提高代码整洁度的利器。

```xml
<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

**EasyExcel：**

Java操作Excel的利器，比POI使用起来更简单，效率也更高。

```xml
<!-- EasyExcel -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>${easyexcel.version}</version>
</dependency>
```

**Knife4j：**

官方文档：[https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/)

之前我们经常用Swagger查看项目API文档，但Swagger生成的文档页面操作并不好用，特别是对前端人员。Knife4j基于Swagger提供了更可观的页面，操作起来也更加方便。

```xml
<!-- 基于Swagger的文档工具 Knife4j -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>${knife4j.version}</version>
</dependency>
```

**Orika：**

Bean拷贝工具。

实际开发中经常遇到需要将Entity转换为DTO或者VO，本质就是属性的拷贝，如果使用setter方法固然可以，但工作量会很大并且代码不够简洁。很多代码中也使用Spring提供的`BeanUtils`拷贝属性，但也有很多局限，最常见的是无法拷贝集合对象。

检索相关文档后发现`Orika`很强大，但可能不够轻量（后续如果有更好的选择再修改）。

```xml
<!-- Orika Bean拷贝工具 -->
<dependency>
    <groupId>ma.glasnost.orika</groupId>
    <artifactId>orika-core</artifactId>
    <version>${orika.version}</version>
</dependency>
```
