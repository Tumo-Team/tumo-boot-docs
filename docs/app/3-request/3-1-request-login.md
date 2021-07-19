# 登录流程

学习了上面基础模块的封装，相信大家已经大概熟悉了项目前端的登录流程，这里直接以一张图表示：

![image-20210319165752722](http://cdn.tycoding.cn/20210319165758.png)

## Token

通过上图，可以清晰直观的看到：在前端，Login功能如何实现。那么下面，我们再配合Chrome浏览器，查看实际的请求数据和响应数据：

### /oauth/token

因为本项目后端使用的SpringSecurity OAuth，而框架本身提供了 `/oauth/token` 接口获取Token，传递用户名密码登录。（这里我们不深入讨论此接口的调用规则）

注意看此时的 `Authorization` 字段，此时的value（`Basic Y2...`）是在前端固定写死的值，请看：`src/api/auth.js` 。为什么是这个值，这里不做讨论（其实是对应后端SpringSecurityOauth框架的`oauth_client_details`表），后端部分文档会介绍。

![image-20210319171318721](http://cdn.tycoding.cn/20210319171318.png)

再看下此接口返回的数据：

![image-20210319172848801](http://cdn.tycoding.cn/20210319172848.png)

### /user/info

在文章开篇图例中可以清楚看到：当调用Login成功，会再调用`getUserInfo`接口，需要获取用户信息并存储到Store中。那么看下`/user/info`接口（代码请参看：`src/api/auth.js`）：

![image-20210319172431691](http://cdn.tycoding.cn/20210319172431.png)

注意看，此时请求头中`Authorization`中的value是 **调用/oauth/token接口返回的Token** ，也就是说在执行`/oauth/token`接口后的所有请求的请求头都要携带Token信息。



# 联系

- 个人博客：[http://tycoding.cn](http://tycoding.cn)
- 微信公众号：程序员涂陌
- QQ交流群：866685601
