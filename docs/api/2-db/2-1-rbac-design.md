# RBAC权限表设计

>[RBAC](https://baike.baidu.com/item/RBAC)（Role-Based Access Control）基于角色的访问控制。
>
>​	其基本思想是，对系统操作的各种权限不是直接授予具体的用户，而是在用户集合与权限集合之间建立一个角色集合。每一种角色对应一组相应的权限。一旦用户被分配了适当的角色后，该用户就拥有此角色的所有操作权限。这样做的好处是，不必在每次创建用户时都进行分配权限的操作，只要分配用户相应的角色即可，而且角色的权限变更比用户的权限变更要少得多，这样将简化用户的权限管理，减少系统的开销。
>
>​		—— 百度百科

很显然，我们可以简单梳理为以下几点：

1. 用户 --> 角色（多对多）
2. 角色 --> 权限（多对多）

![image-20210613080109979](http://tycoding.cn/imgs/20210613080115.png)

## User用户表

回到数据库设计层面，首先考虑用户表设计。

因为作为最基础的表，其他的角色表、权限表都是在此基础上进行关联。直接看SQL：

```sql
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `real_name` varchar(255) DEFAULT NULL COMMENT '真实姓名',
  `sex` varchar(10) DEFAULT NULL COMMENT '性别',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `dept_id` bigint(20) NOT NULL COMMENT '部门ID',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态 0锁定 1有效',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
```

几个常见的问题：

> 1.为什么这张表里看不到角色信息？

因为**用户**和**角色**是多对多的关系，在一张表里很难体现这种关系（即使能体现也很难维护）。后续将通过关联表来体现多对多的关系。

> 2.为什么这张表是看不到权限信息？

在文章起始部分图示中可以看到，用户表不直接和权限表关联，而是通过角色去管理权限。这样对权限的控制更加灵活，也方便维护。

> 3.为什么要有一个字段`dept_id`记录部门信息？

在本项目中除了以上三张表，还有**部门表**，而本项目设计时，用户和部门是一对一的关系，因此直接在用户表中记录即可。

> 4.为什么主键`id`不是自增的？

本项目使用了MybatisPlus框架，所有表的主键将通过`com.baomidou.mybatisplus.core.toolkit.IdWorker.java`类统一生成雪花算法ID。

> 5.`tinyint(1)`是什么类型？

在MYSQL中Boolean类型通过`tinyint(1)`体现，1代表true，0代表false。Java实体中使用Boolean接收。



## Role角色表

首先看基础角色表设计：

```sql
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级节点',
  `name` varchar(20) NOT NULL COMMENT '角色名称',
  `alias` varchar(20) DEFAULT NULL COMMENT '角色别名',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态 0锁定 1有效',
  `des` varchar(100) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';
```

很简单的几个字段足以表达角色信息。

几个常见的问题：

> 1.`parent_id`字段代表什么？

前端若想通过Tree树形结构展示数据，就必须有一个字段代表数据间的层级关系，通常我们用`parent_id`表示。

> 2.为什么这张表中看不到用户信息、权限信息？

用户、权限和角色的关系都是多对多的，因此都将用第三方关联表体现。

### 用户角色关联表

先看表设计：

```sql
CREATE TABLE `sys_user_role` (
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';
```

这张关联表中仅需两个主键字段即可表达两张表的数据多对多的关系。新增、修改、删除用户角色都将直接对这张表操作。

几个常见问题：

> 1.为什么叫用户角色关联表不叫角色用户关联表？

从表名`sys_user_role`可以看到，这张表将以`user_id`为入口点操作数据。（除非是删除角色的操作）

> 2.这张表的主键是什么？

通过`PRIMARY KEY (`user_id`,`role_id`)`看到这张表使用了联合主键，也就是不允许出现`user_id`字段和`role_id`字段都相同的数据。

> 3.如何新增、修改、删除用户和角色的关联？

新增、修改、删除用户角色关联其实都可以理解为：对用户角色关系的**编辑操作**。

在代码层面，我们通常不去关心用户和角色之前是怎么关联的，因此这个**编辑操作**在代码层面只需下述两个步骤：

1. 根据`user_id`删除`sys_user_role`表中原有的数据
2. 根据`user_id`和`role_id`向`sys_user_role`表中新增数据

因为实际场景中，一个人不可能会拥有很多的角色，所以就没必要考虑数据量大的问题。



## Menu菜单（权限）表

我们直接从页面出发，看一个CRUD页面可能涉及的权限：

![image-20210613203749040](http://tycoding.cn/imgs/20210613203749.png)

如上，对于一般的后台页面，除了CRUD的操作权限，还需要左侧菜单列表的访问权限。

因此，我们可以用`sys_menu`菜单表同时表达菜单和CRUD按钮的访问权限。设计如下：

```sql
CREATE TABLE `sys_menu` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '菜单名称',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父级ID',
  `path` varchar(255) DEFAULT NULL COMMENT '菜单路径',
  `perms` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `type` varchar(20) DEFAULT NULL COMMENT '菜单类型',
  `order_no` int(11) DEFAULT NULL COMMENT '排序',
  `icon` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `is_disabled` tinyint(1) DEFAULT NULL COMMENT '是否禁用',
  `is_ext` tinyint(1) DEFAULT NULL COMMENT '是否外链',
  `is_keepalive` tinyint(1) DEFAULT NULL COMMENT '是否缓存',
  `is_show` tinyint(1) DEFAULT NULL COMMENT '是否显示',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';
```

几个常见的问题：

> 1.为什么多一些组件、图标等等的字段，为什么需要这些字段？

实际上，CRUD中新增、修改、删除都是按钮级别的权限，只需要记录`parent_id`和`perms`字段即可表达此按钮在某个页面的操作权限。而上述表中大部分字段是为了前端VueRouter服务的。

因此，很多RBAC项目中menu表的设计并不相同，需受前端路由数据格式的限制。那么对于本项目前端而言，上述字段正是前端所需的。

> 2.如何实现菜单的排序

通过`order_no`字段限制，查询时通过`desc`或`asc`限制查询。

> 3.权限的体现只需要这一张表就行了吗？

对于本后台项目而言，页面的操作权限仅仅是简单的CRUD，并没有涉及太复杂的操作，因此也无需建立类似 **资源表** 去单独体现每个资源的权限。



### 角色菜单关联表

同理，如下：

```sql
CREATE TABLE `sys_role_menu` (
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单/按钮ID',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色资源关联表';
```



## Dept部门表

另外，本项目中也设计了部门表，用户和部门是一对一的关系，因此无需关联表，如下：

```sql
CREATE TABLE `sys_dept` (
  `id` bigint(20) NOT NULL COMMENT '部门ID',
  `parent_id` bigint(20) NOT NULL COMMENT '上级部门ID',
  `name` varchar(20) NOT NULL COMMENT '部门名称',
  `order_no` int(11) DEFAULT NULL COMMENT '排序',
  `des` varchar(100) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门表';
```
