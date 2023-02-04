# Vuex封装

Vuex官方文档：[https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

简单来说（本人也菜，请按照官方文档理解），**通过Vuex可以集中存储管理所有组件的状态**。你是否想到了后端的Session，其实有点类似，在后端我们可以向Session中存储数据，并且通过如HttpServletRequest对象的getSession()方法获取Session。

同样，可以向Vuex中存入数据，然后通过固定的语法在其他组件中调用。

## 存储什么

开始之前，我们先思考需要前端存储什么？

还记得上一章对Axios的封装中提到了登录请求。HTTP请求本身是无状态的，通过我们赋予Session、Cookie等信息才使得请求有状态，也实现了每次刷新页面并不需要重新登录。因此，首先需要存储登录接口（后端返回）信息。

一般，后端会使用Token进行身份认证，这样就需要保证每次请求时都携带Token，以便后端能识别当前请求时已经登录过的用户发送的请求。

其次，后端除了返回Token信息，还需要拿到用户信息，如：用户名、角色、权限、头像等等信息。为了方便全局获取，这些信息也是需要存储的。

路由，为了保证每次刷新页面，不用再次请求获取路由菜单，因此也要存储菜单路由信息。

**其他：** 类比Redis，Vuex中一般也只是存储一些不常修改的数据。

## Store

在文档：[https://vuex.vuejs.org/zh/guide/](https://vuex.vuejs.org/zh/guide/) 可看到有关Store的介绍。

在本项目中，对于Vuex的封装请看`src/store/`，我们用到了：

```
store
.
├── getters.js			//getters属性访问
├── index.js			//入口
└── modules				//模块
    ├── app.js			//页面布局相关的变量
    ├── permission.js	//菜单路由相关的变量
    ├── settings.js		//个性化设置相关的变量
    └── user.js			//用户相关的变量
```

通过上面`modules`可看到本项目中主要使用Vuex存储了什么数据。

## 登录请求

下面我们还是以Login请求为例，从实际业务出发，讲解实际项目中如何使用Store，以及请求执行流程。

### 项目结构

![image-20210318092803743](http://tycoding.cn/imgs/20210318092803.png)

1. 首先进入登录页面 `login/index.vue`
2. 当点击登录按钮触发事件，调用Store（`store/modules/user.js`）中指定Action，变更Store状态
3. 在Store Action中调用接口方法，获取接口返回的数据并更新到Store中

### 代码结构

![image-20210318094744064](http://tycoding.cn/imgs/20210318094744.png)

从上图可以看到 **红线** 标记的是**调用**部分，紫线标记的是**响应**部分。

当触发登录方法时，首先通过`this.$store.dispatch()`方法调用具体的Action，然后在Action内部调用登录接口，登录接口返回的数据将更新存储到Store中（如上图后端会返回Token）。

最终`login/index.vue`通过`.then()`能拿到方法执行结果，接下来调用`this.$router.push()`跳转到登录页面。而最终前端对于权限的校验（实际上还是依据后端对Token的校验），交给了路由模块管理。

在后面文章中，我们将介绍全局路由封装。

### Vue-devtools

`vue-devtools`是Vue官方出的浏览器插件，这个插件可以清晰的看到Vue页面组件、Vuex、Router等信息。

![image-20210318134121079](http://tycoding.cn/imgs/20210318134126.png)

