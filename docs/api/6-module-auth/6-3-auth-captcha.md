# 实现图形验证码登录

开始之前我们先梳理一下实现图形验证码登录的思路：

1. 开发获取图形验证码接口，每次调用都生成新的验证码图片；
2. 每次生成验证码都同时将验证码值存储到Redis（也可以用其他的方式）中，并设置失效时间。此接口应该返回两条数据：Redis缓存Key、图片Base64值；
3. 前端页面调用上述接口拿到图片Base64值和缓存Key；
4. 点击登录时前端应该传递用户输入的验证码Code、以及上述接口返回的缓存Key；
5. 后端接收登录请求，应该先经过验证码过滤器，校验用户输入的验证码和Redis缓存中的是否一致；

## 生成验证码

首先，你一定会先想到我该如何生成一个验证码图片并且返回给前端展示呢？阅读过我之前文章的小伙伴应该知道我们可以利用网上（或者自己，抱歉我太菜了）提供的Java生成验证码图片的工具类。

但是，在开始之前我应该介绍了系统中引入了Hutool的依赖，而Hutool本身封装了很多常见的工具类，其中就包含：[图形验证码](https://hutool.cn/docs/#/captcha/%E6%A6%82%E8%BF%B0) ，因此，我们没必要重复造轮子。

看官方示例：

![image-20210126123816142](http://tycoding.cn/imgs/20210126123821.png)

于是，简单开发一个接口：

```java
    @GetMapping("/captcha")
    public void getCaptcha(HttpServletResponse response) {
        try {
            CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(110, 32, 4, 20);
            captcha.write(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

浏览器访问：

![截屏2021-01-26 下午12.46.07](http://tycoding.cn/imgs/20210126124612.png)

可以看到，调用`captcha.write(outputStream)`实际上是图片的流对象，那么对于这种情况，前端Vue该如何展示对应的图片呢？

1. 编写axios的验证码接口请求：

```javascript
export function getCaptcha() {
  return request({
    url: '/auth/captcha',
    method: 'get',
    responseType: 'blob'
  })
}
```

切记一定要指定`responseType: 'blob'`

2. 写一个获取验证码的方法（vue的`methods`中定义）

```javascript
handleCaptcha() {
    getCaptcha().then(res => {
        this.captchaUrl = window.URL.createObjectURL(res)
    })
},
```

3. 页面：

```html
<img :src="captchaUrl" @click="handleCaptcha">
```

![image-20210126134851865](http://tycoding.cn/imgs/20210126134851.png)

并且实现了，点击验证码刷新图片。

tips：如果你定义了axios的全局response拦截器，如果拦截了此请求可以简单用如下方式释放：

```javascript
    if (res.type === 'text/xml') {
      return res
    }
```

## 开发验证码接口

在上述实例中我们已经知道了后端如何生成一个验证码图片并返回给前端展示。但是，上述方式存在一个很大的弊端，主要体现在验证码的存储上。

举个栗子：

![image-20210126141309169](http://tycoding.cn/imgs/20210126141309.png)

如果使用Redis存储验证码信息，每次点击都将生成新的验证码并缓存到Redis中，而Captcha1和Captcha2肯定不能是相同的Key（虽然过期此数据会自动删除），那么利用上述方式似乎我们永远不知道前端发送来的验证码信息应该对应Redis中的哪个数据。

因此上述方式不可行。

### Base64图片

既然后端直接响应文件二进制流是不可行的，Hutool也提供了获取图片Base64数据字符串的方式。

1. 修改上述接口：

```java
@GetMapping("/captcha")
public R<Dict> getCaptcha() {
    CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(110, 32, 4, 20);
    String code = captcha.getCode().toLowerCase();
    System.out.println("验证码值：" + code);
    String key = UUID.randomUUID().toString();
    return R.data(Dict.create().set("key", key).set("image", captcha.getImageBase64()));
}
```

**区别：** 随机生成一个key（后续也将作为Redis中的Key）作为当前验证码的唯一标识，并返回给前端。

tips：上述代码中`Dict`是Hutool基于Map封装的对象，优点是无需`new Map`，且支持链式调用。

访问接口，可以看到接口返回的`image`是图片的Base64字符串。

![截屏2021-01-26 下午2.24.39](http://tycoding.cn/imgs/20210126142446.png)

2. 修改axios请求接口：

```javascript
export function getCaptcha() {
  return request({
    url: '/auth/captcha',
    method: 'get'
  })
}
```

3. 修改调用方法：

```javascript
handleCaptcha() {
  getCaptcha().then(res => {
    this.captchaUrl = res.data.image
    this.form.captcha_key = res.data.key
  })
},
```

4. 修改HTML：

```html
<img :src="'data:image/png;base64,' + captchaUrl" @click="handleCaptcha">
```

### Redis存储

既然上述我们已经得到了一个可行的方案（随机生成Key并返回给前端）。那么仅需要在上述后端Java代码中增加：每次刷新验证码都在Redis中存储一条数据。

```java
@RestController
@RequiredArgsConstructor
public class TumoTokenEndpoint {

    private final RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/captcha")
    public R<Dict> getCaptcha() {
        CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(110, 32, 4, 20);
        String code = captcha.getCode().toLowerCase();
        String key = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(5));
        return R.data(Dict.create().set("key", key).set("image", captcha.getImageBase64()));
    }
}
```

tips： 上述存储`key`和`value`的数据，并指定5分钟失效。

按照`spring-data-redis`提供的Template类，我们可以轻松的向Redis中存取数据，但启动项目：

![image-20210126144310118](http://tycoding.cn/imgs/20210126144310.png)

因为上述直接使用`@RequiredArgsConstructor`构造方法注入Bean；而如果直接使用`@Autowire`注入Bean：

![image-20210126145223045](http://tycoding.cn/imgs/20210126145223.png)

可以看到IDEA会直接报错无法注入。而如果使用`@Resource`是可以注入Bean的：

![image-20210126145737103](http://tycoding.cn/imgs/20210126145737.png)

主要区别是：`@RequiredArgsConstructor`和`@Autowire`都是按照类型注入Bean，而`@Resource`是按照名称注入Bean。当我们定义了`RedisTemplate<String, Object>`泛型，会报错没有这个类型Bean，当然如果不指定泛型也可以解决：

![image-20210126150016692](http://tycoding.cn/imgs/20210126150017.png)

或者，我们可以手动注入Bean，不使用注解注入，也是可以的，如下我们单独创建一个组件`RedisComponent.java`：

```java
@Component
@RequiredArgsConstructor
public class RedisComponent {

    private final RedisConnectionFactory connectionFactory;

    @Bean(name = {"redisTemplate"})
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
        redisTemplate.setConnectionFactory(connectionFactory);
        return redisTemplate;
    }
}
```

最终代码：

```java
@RestController
@AllArgsConstructor
public class TumoTokenEndpoint {

    private final RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/captcha")
    public R<Dict> getCaptcha() {
        CircleCaptcha captcha = CaptchaUtil.createCircleCaptcha(110, 32, 4, 20);
        String code = captcha.getCode().toLowerCase();
        String key = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(key, code, Duration.ofMinutes(5));
        return R.data(Dict.create().set("key", key).set("image", captcha.getImageBase64()));
    }
}
```

请求接口，使用Redis可视化客户端查看存入的验证码：

![image-20210126150859938](http://tycoding.cn/imgs/20210126150900.png)



可以看到无论是Key还是Value，存入的数据都是乱码的，原因是我们没有指定序列化方式，修改：

```java
@Bean(name = {"redisTemplate"})
public RedisTemplate<String, Object> redisTemplate() {
    RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
    redisTemplate.setConnectionFactory(connectionFactory);
    return redisTemplate;
}
```

## 验证码过滤器

上述我们已经完成了验证码接口的编写，下面需要做的是：

1. 编写一个过滤器，并且在用户登录认证过滤器之前执行
2. 过滤器中要拿到前端输入的验证码值以及Redis的缓存Key，并验证

### Filter

```java
@Component
@RequiredArgsConstructor
public class CaptchaFilter extends OncePerRequestFilter {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if ("/oauth/token".equals(request.getRequestURI())) {
            String headerKey = request.getHeader("Captcha-Key");
            String code = ServletRequestUtils.getStringParameter(request, "captcha");
            String redisCode = (String) redisTemplate.opsForValue().get(headerKey);
            if (code == null || !code.toLowerCase().equals(redisCode)) {
                throw new ServiceException("验证码不正确");
            }
        }
        chain.doFilter(request, response);
    }
}
```

首先把关注点放在`OncePerRequestFilter`，这个Filter表示每次请求只会执行一次。

1. 因为我们使用SpringSecurityOAuth，因此认证授权接口是框架提供的`/oauth/token`接口，我们需要判断只有请求此接口时才需要调用此Filter
2. 获取用户输入的验证码（`ServletRequestUtils.getStringParameter(request, "captcha")`），以及后端返回的Redis Key：`request.getHeader("Captcha-Key")`。
3. 根据上面拿到的Key，从Redis中拿到Value，然后对比前端输入的验证码。

**将Filter置于授权认证过滤器前面**

![image-20210126161038777](http://tycoding.cn/imgs/20210126161038.png)

### 前端

上面我们已经介绍了前端渲染Base64图片，下面主要介绍`Captcha-Key`和`captcha`的传递：

```javascript
handleCaptcha() {
    getCaptcha().then(res => {
        this.captchaUrl = res.data.image
        this.form.captcha_key = res.data.key
    })
},
```

修改axios接口：

```javascript
export function login(username, password, captcha, captcha_key) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Captcha-Key': captcha_key
    },
    params: {
      username,
      password,
      grant_type: 'password',
      captcha
    }
  })
}
```

## 测试

前端点击登录：

![image-20210126162539170](http://tycoding.cn/imgs/20210126162539.png)

后端在`CaptchaFilter`中断点：

![image-20210126162708291](http://tycoding.cn/imgs/20210126162708.png)

## End

到此为止，此功能已经开发完成。

注意上述代码中是从项目中截取的部分代码，仅供参考，具体需要分析Tumo-Boot项目代码。

此篇文章中涉及到的源码：

- [TumoTokenEndpoint.java](https://github.com/Tumo-Team/Tumo-Boot/blob/master/src/main/java/cn/tycoding/boot/modules/auth/endpoint/TumoTokenEndpoint.java)
- [CaptchaFilter.java](https://github.com/Tumo-Team/Tumo-Boot/blob/master/src/main/java/cn/tycoding/boot/common/auth/filter/CaptchaFilter.java)
- [RedisComponent.java](https://github.com/Tumo-Team/Tumo-Boot/blob/master/src/main/java/cn/tycoding/boot/common/redis/component/RedisComponent.java)
