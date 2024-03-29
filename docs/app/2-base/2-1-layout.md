# Layout

对于项目的目录结构的介绍，上一篇文章已经介绍过了，这里不再说明。下面主要介绍一些常见的有关页面页面布局需要定制化的部分。

## Global CSS

如果你项目定义全局的页面样式（如每个页面公用的Layout样式），或者你同时想要全局覆盖Ant Design Vue的默认样式，本项目提供了一个入口：`src/styles`

```
.styles
├── index.less
├── mixin.less
├── sidebar.less
├── transition.less
└── variables.less
```

在此文件夹中的样式，将作为全局样式生效，并且会覆盖Ant Design UI的默认样式。

具体在 `src/main.js` 中使用：

![image-20210310135101669](http://tycoding.cn/imgs/20210310135101.png)

## 登录页面

参看：`src/views/login/index.vue`

![image-20210313141653100](http://tycoding.cn/imgs/20210313141653.png)

## Navbar顶部栏

参看：`src/layout/components/Navbar.vue`

![image-20210313141518529](http://tycoding.cn/imgs/20210313141523.png)

## Sidebar侧边栏

参看：`src/layout/components/Sidebar/`

![image-20210313141604017](http://tycoding.cn/imgs/20210313141604.png)

**其中：**

侧边Logo参看：`src/layout/components/Sidebar/Logo.vue` （注意侧边Logo文字是在其中写死的，请自行修改）

侧边菜单参看：`src/layout/components/Menu/`

## 右侧设置页

参看：`src/layout/Settings/index.vue`

![image-20210313141632440](http://tycoding.cn/imgs/20210313141632.png)

## 其他页面

除了上面介绍的Layout部分的页面，其中最主要是具体的业务操作页面，其中上述页面中，除了Layout部分，中间大面积空白的地方就是填充具体的操作页面。

从规范代码的角度考虑，一般将具体的页面放在`src/views`目录下。

