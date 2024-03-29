# 动态菜单

在基础模块介绍中，前端路是由`src/router/` 处理的，在其中可以直接定义路由地址，但是在很多后端权限体系设计中，权限控制需要交由后端实现，也就是`src/router/`中的路由List必须是后端根据当前用户角色返回的。

为此，我们先回顾一下`src/router/index.js`的设置：

![image-20210319175128340](http://tycoding.cn/imgs/20210319175128.png)

其实，最终后端要返回一个这种格式的JSON数组，前端将其添加到vue-router中。

## permission.js

代码查看：`src/store/modules/permission.js`。

![image-20210319175703926](http://tycoding.cn/imgs/20210319175704.png)

如上，本项目为适应后端路由控制功能，在`src/store/modules/permission.js`中单独做了处理，为了对比，我们再看下Tumo-AntV原本的配置：

![image-20210318140312979](http://tycoding.cn/imgs/20210318140313.png)

如上，在处理 `generateRoutes` 时，增加了调用`build()`方法，从后端拉取路由菜单，并且调用`filterAsyncRoutes()`方法对后端返回的数据再做适配处理（比如：组件地址改为从`/views`目录获取加载）。

## 后端数据

前端的配置基本完成，再看下后端接口返回的菜单数据结构：

![image-20210319180940422](http://tycoding.cn/imgs/20210319180940.png)

如上，后端其实只需要按照前端菜单表所需的数据结构封装数据即可，根据前端用户登录时，查询该账户所属的角色对应的菜单权限。

Tips：至于后端如何封装这些数据，以及后端菜单表的设计将在后端部分讲解。
