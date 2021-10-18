# Vue-Router封装

vue-router官方文档：[https://router.vuejs.org/zh/installation.html](https://router.vuejs.org/zh/installation.html)

## 路由配置

在本项目中，路由的配置请查看 `src/router` 模块。

![image-20210318135032108](http://tycoding.cn/imgs/20210318135032.png)

在这个页面，主要用来初始化路由对象，并且定义一些默认路由，比如登录页面的路由。

而 `src/router` 下的`modules` 中定义了其他模块的路由配置，然后在 `src/router/index.js` 引入即可。

## 路由拦截

官方文档：[https://router.vuejs.org/zh/guide/advanced/navigation-guards.html](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

本项目中，路由拦截部分请查看：`src/permission.js`

![image-20210318135402415](http://tycoding.cn/imgs/20210318135402.png)

可以看到，项目中所有的路由跳转最终都需要先经过这个配置，在这个配置中，首先要获取Token，然后判断Token是否存在，如果不存在就跳转到登录页面，如果存在就正常跳转。

而最终Token是否有效的校验交由后端完成，后端如果返回401、403状态，表示Token失效、无权限等意思，然后再交由Axios处理。

## 动态路由

很多情况下，需要实现动态路由，也就是不能让前端在代码中写死路由配置，必须交由后端持久化到数据库中。

在本项目中，没有实现动态路由配置（请求后端渲染路由配置）。但是本项目也提供了一个很方便的入口配置：`src/store/modules/permission.js` 。

![image-20210318140312979](http://tycoding.cn/imgs/20210318140313.png)

在 `filterAsyncRoutes` 方法中，可以通过请求后端结果拿到路由JSON，最后赋值到Store中即可。

这一块具体可以查看：[https://github.com/Tumo-Team/Tumo-Boot](https://github.com/Tumo-Team/Tumo-Boot)

# 联系

- 个人博客：[http://tycoding.cn](http://tycoding.cn)
- 微信公众号：程序员涂陌
- QQ交流群：866685601
