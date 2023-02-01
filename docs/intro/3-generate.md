# 代码生成

详细大家学习了这么多项目，代码生成工具也一定见识了很多。但是今天我们并不介绍基于Web的代码生成功能或Mybatis Generate插件，因为这几种方式对于个人开发都无法避免：

1. 学习成功高（功能开发起来比较复杂）
2. 可定制化差（很多代码生成功能并不支持自定义生成代码的模板）

在本项目中，综合了一下，使用`EasyCode`插件生成代码。

> Tips：本项目代码生成模板代码

- Tumo-Boot：[https://github.com/Tumo-Team/tumo-boot/tree/main/generate](https://github.com/Tumo-Team/tumo-boot/tree/main/generate)
- Tumo-Cloud：[https://github.com/Tumo-Team/tumo-cloud/tree/main/generate](https://github.com/Tumo-Team/tumo-cloud/tree/main/generate)

## EasyCode

[EasyCode](https://gitee.com/makejava/EasyCode) 是一个基于IDEA的代码生成插件。开源地址：[https://gitee.com/makejava/EasyCode](https://gitee.com/makejava/EasyCode) 。下面介绍下如何使用这个插件生成代码。

### 安装

在idea -> settings -> plugins中搜索 `EasyCode` ，注意名称避免下载错了：

![](http://cdn.tycoding.cn/docs/MIK-fy9rIu.png)

安装之后在Other Settings中可以看到EasyCode的配置，如下：

![](http://cdn.tycoding.cn/docs/MIK-Fl2LlW.png)

可以看到，目前版本中已经支持将模板导出到本地，最终生成的是`.json`文件，本项目的模板文件在文章最后会介绍。

### 它能做什么？

> 自定义数据库字段映射类型

![image-20201010130044713](http://tycoding.cn/imgs/20201010130044.png)

你可以在此界面灵活编辑字段类型映射的Java数据类型，比如之前我们提到的`datetime`类型字段，我们可以手动修改它是映射为`java.util.Date`还是映射为`java.time.LocalDateTime`类型。

> 代码生成模板高度自定义

![image-20201010125826808](http://tycoding.cn/imgs/20201010125832.png)

可以看到，上图中`entity`、`dao`、`service`、`serviceImpl`、`controller`、`mapper.xml`层的代码都是可以自定义修改的，并且提供了详细的文档说明，我们可以根据自己的代码风格定义一套模板，最后copy到这里就好。

> 提供很多获取字段属性的工具类

![image-20201010130857347](http://tycoding.cn/imgs/20201010130857.png)

从上图`Description`中可以看到，此插件封装了很多工具类，比如：获取字段表名、表字段名、表字段属性、主键key等等，根据需要我们可以动态的生成各种代码。

> 可自定义（mybatis）代码生成配置

![image-20201010131032064](http://tycoding.cn/imgs/20201010131032.png)

根据需要可以修改Mybatis生成代码配置，或者定义一些全局变量，在`Templete Setting`代码生成模板中可以引入并调用这些全局变量。

> 提供自定义代码生成位置、包名的GUI界面

首先我们要在IDEA中配置要连接的数据库：

![image-20201010131411337](http://tycoding.cn/imgs/20201010131411.png)

然后输入数据库连接信息：

![image-20201010131440736](http://tycoding.cn/imgs/20201010131440.png)

这样便可以在右侧看到自己的数据库信息了。

选择想要生成的表，右键：

![image-20201010131604940](http://tycoding.cn/imgs/20201010131605.png)

选择`Generate Code`：

![](http://cdn.tycoding.cn/docs/MIK-Cki5md.png)

你可以根据需要修改：`package`、`path`等配置。

更多的配置项，请看官方的文档。

## Tumo-EasyCode

上面介绍中，可以看到EasyCode新版本中已经支持模板的导入导出，因此笔者在这里直接提供本项目的`.json`模板文件：

[https://github.com/Tumo-Team/tumo-boot/blob/main/generate/EasyCodeConfig.json](https://github.com/Tumo-Team/tumo-boot/blob/main/generate/EasyCodeConfig.json)

将此文件导入到EasyCode插件中：

![](http://cdn.tycoding.cn/docs/MIK-QulmHe.png)

![](http://cdn.tycoding.cn/docs/MIK-z3JrUZ.png)

可以看到Template中已经有本项目的前后端模板配置了：

![](http://cdn.tycoding.cn/docs/MIK-v6YM4B.png)

之后定义了表结构后再选择此模板生成代码即可：

![](http://cdn.tycoding.cn/docs/MIK-wIfQV2.png)

然后结合项目进行自定义配置，最下方选择 `tumo-boot`模板即可：

![](http://cdn.tycoding.cn/docs/MIK-PNkoaE.png)

