# Tumo-Boot-UI项目搭建

在上一章中，我们讲解了如何使用 [https://github.com/Tumo-Team/Tumo-AntV](https://github.com/Tumo-Team/Tumo-AntV) 项目，其实在上一篇文章中，我们已经讲解了如何安装和运行`Tumo-AntV`项目、如何移除Mock组件（移除MockServer那么就要手动接入后端接口才可登录）。这其实已经将一个纯前端项目修改为了一个需要对接后端接口的后台页面。

那么在本章中，我们将侧重点放在如何进阶修改项目中的一些配置，以便能更好的适配我们当前的项目（比如页面UI信息）。

**注意：** 本章中不讲解如何对接后端接口，因此先不移除Mock组件（以便进行登录演示）。

## Base

### 启动信息

> 项目名称

1. 首先修改文件夹名称
2. 然后修改项目根目录`package.json`中第二行`name`属性，修改后**最好**先删除`node_modules`并重新执行`npm install`

![image-20210310114516437](http://tycoding.cn/imgs/20210310114522.png)

**Tips：**

`package.json`文件类似后端Maven项目中的`pom.xml`，主要记录了项目需要的依赖版本。而`package-lock.json`以及`node_modules`是执行了 `npm install` 命令后生成的。其中`package-lock.json`会记录当前本机安装后的依赖版本信息，我们一般不会将其提交到git上。

> 启动脚本

还是上图，注意看`scripts`参数，其脚本使用格式：`npm run xxx`，其对应使用了vue-cli提供的脚本。

例如使用如下命令运行项目：

```shell
npm run dev
```

使用如下命令打包项目：

```shell
npm run build
```

同理，我们也可以自定义脚本命令，例如很多的项目中使用`npm run serve`启动项目，那么可以修改为：

![image-20210310131350532](http://tycoding.cn/imgs/20210310133631.png)

### 加载页

细心的你可能发现无论是本项目还是其他很多vue前端项目，在每次刷新页面时（无论刷新哪个页面），都会全屏显示同一个加载页面：

![image-20210310132701154](http://tycoding.cn/imgs/20210310133634.png)

这是因为一般情况下，Vue前端项目都是单页面，每个页面都是Vue组件，最后经过编译后再将Vue组件页面嵌入到HTML中，那么其实整个项目只有一个HTML入口页面：`public/index.html`

![image-20210310132625152](http://tycoding.cn/imgs/20210310133626.png)

如果你想要定制化加载页的内容，可以修改上述`index.html`即可；当然需要定制化网站图标等信息也是修改上述HTML。

**Tips：**

在Vue-Cli搭建的项目中，通常`public`作为一个开发的资源目录，不会对其中的资源拦截。（类似于后端Maven项目中不会对`templates/static/`目录进行拦截一样）

### 网站Title

![image-20210310133423647](http://tycoding.cn/imgs/20210310133621.png)

这里的Title指上图信息，对于这里的设置，项目中全局封装了一个JS：`src/settings.js`

![image-20210310133554870](http://tycoding.cn/imgs/20210310133554.png)

# 联系

- 个人博客：[http://tycoding.cn](http://tycoding.cn)
- 微信公众号：程序员涂陌
- QQ交流群：866685601
