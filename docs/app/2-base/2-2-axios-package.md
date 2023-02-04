# Axios封装

Axios中文文档：[http://axios-js.com/zh-cn/docs/index.html](http://axios-js.com/zh-cn/docs/index.html)

作为一个后端开发者，如果对后端权限框架，比如SpringSecurity、Shiro等，你应该会发现：

如果后端启用了权限框架，默认框架会对所有请求后端的接口都拦截，只有对手动配置放开的接口才不会拦截，这是后端权限框架对权限的控制，那么前端呢？

对于前后端分离的项目，前端是基本不受后端约束的，如果要实现类似后端的权限控制，就必须对全局的请求统一控制。而使用Axios很容易就能实现这一需求。

## 权限控制

在这里，我们仅探讨 **接口级别的权限控制** 。

### JQuery

对于JQuery（原生JS的写法这里就不再说了），发送一个接口请求，通常可以这样写：

```js
$.ajax({
    url: '',
    method: '',
    success: function(res){}
})
```

而对于JQuery，似乎是没办法对项目中所有页面`$.ajax()`请求统一控制了（例如对后端响应401、403状态时统一处理）。当然，可以对`axjax`的方法再进行一层封装：

```js
// 校验请求
function validate(res) {
    if (res.status === 401) {}
    if (res.status === 403) {}
}

// get 请求
function get(url) {
    $.ajax({
        url: url,
        method: 'get',
        success: function(res) {
            return res
        },
        error: function(res) {
            validate(res)
        }
    })
}
```

只需要在代码中调用如上JS中的方法进行请求，不再直接调用`$.ajax`即可。

**Tips：**

似乎JQuery又提供了了一个 `ajaxSetup([options])` 方法，用于设置全局AJAX默认参数，这里就不再说了。

参看：[https://jquery.cuishifeng.cn/jQuery.ajaxSetup.html](https://jquery.cuishifeng.cn/jQuery.ajaxSetup.html)

### Axios

对于Axios，它本身提供了很多API方便我们灵活的控制接口请求。

实际项目中，我们一般都会单独封装一个JS，用于进行权限控制，主要包括如下几个部分：

**创建Axios实例**

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

**自定义Axios实例默认值**

```js
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

**拦截器**

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

如上，当后端通过Token进行认证时，可以通过 **自定义Axios实例默认值** 设置请求全局`Header`。并且，通过 **拦截器** 我们可以请求监听到所有请求的Request、Response，并对Request、Response进行特殊处理。

## request.js

在本项目中，单独封装了`request.js`进行接口拦截。实现对请求Request的拦截、对请求Response的拦截。一个常见的例子：Token信息一般都放在请求头中，因此每次请求都要在请求头中定义Token；其次，全局可以获取Response信息，如进行全局错误处理、对403强制重新登录处理。

参看：`src/utils/request.js`：

![image-20210314173925241](http://tycoding.cn/imgs/20210314173925.png)

## api

如何使用上述封装的`request.js`呢？通常我们会将项目中所有的请求统一定义，和页面Views分离开，这样每次修改请求参数，就很容易定位到具体实现以及使用此接口的页面。

在本项目中，这些代码定义在 `src/api/` 目录。参看：`src/api/user.js`：

![image-20210314174423096](http://tycoding.cn/imgs/20210314174423.png)

可以看到：

1. import `request.js`，目的是为了使用这个JS中创建axios实例；
2. export function，这个方法被暴露出去，其他的引入此js的组件才可使用此方法；
3. 接口方法入参通常是：params（通常指Get请求）、data（通常指POST请求）
4. 接口方法的返回值是一个Promise对象

如何处理上述代码中接口方法的返回值（Promise对象）？

关于Promise的介绍参看（我也不是很懂）：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544)

简单来说，Promise对象提供了一种方式：不用关注函数自身的逻辑，并在将来（调用时）获取对此函数处理结果。

回到本项目的代码中，那么如何使用上述 `user.js` 中定义的 `login()` 方法呢？

参看：`src/store/modules/user.js` （登录方法为何在这里调用，后面文章再具体介绍）

![image-20210314180848046](http://tycoding.cn/imgs/20210314180848.png)

那么：

1. 首先，需要import 登录方法
2. 其次，根据Promise的特性，它提供两个函数分别获取函数执行成功的结果（`.then()`）、函数执行失败的结果（`.catch()`）。那么调用（`login()`）登录方法，传入username和password，通过`.then()`拿到此请求相应的Response信息即可。



## 图示

下面我们仅以登录接口为例，先简单表示此项目封装的`axios`如何使用以及执行流程。

![image-20210317150320211](http://tycoding.cn/imgs/20210317150320.png)

Tips：其中`store`部分在后期`Vuex`部分讲解，对于Login登录请求、getUserInfo获取用户信息请求、Logout注销请求等需要经过store，大多业务请求无需，本章中不讨论这部分。

