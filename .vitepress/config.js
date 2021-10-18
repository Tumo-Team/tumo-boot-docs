// @ts-check
/**
 * @type {import('vitepress').UserConfig}
 */
 module.exports = {
  base: '/',
  title: 'Tumo-Boot Docs',
  lang: 'zh-CN',
  description: 'Tumo-Boot Docs',
  head: createHead(),
  themeConfig: {
    repo: 'Tumo-Team/tumo-boot',
    docsRepo: 'Tumo-Team/tumo-boot-docs',
    logo: '/logo.png',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '为此页提供修改建议',
    nav: createNav(),
    sidebar: createSidebar(),
    pageHeadHtml: '<div><p align="center"><img src="http://tycoding.cn/imgs/MIK-WxRzP9.png" /></p><p align="center"><a                href="https://github.com/Tumo-Team"                target="_blank"              ><strong>Tumo Team —— Tumo-Boot</strong></a></p><ul><li>Tumo-Boot演示地址：<a                  href="http://boot.tycoding.cn"                  target="_blank"                  rel="noopener noreferrer"                >http://boot.tycoding.cn</a></li><li>Tumo-Boot在线文档：<a                  href="http://docs.boot.tycoding.cn"                  target="_blank"                  rel="noopener noreferrer"                >http://docs.boot.tycoding.cn</a></li><li>Tumo-Boot后端地址：<a                  href="https://github.com/Tumo-Team/Tumo-Boot"                  target="_blank"                  rel="noopener noreferrer"                >https://github.com/Tumo-Team/Tumo-Boot</a></li><li>Tumo-Boot前端地址：<a                  href="https://github.com/Tumo-Team/Tumo-Boot-UI"                  target="_blank"                  rel="noopener noreferrer"                >https://github.com/Tumo-Team/Tumo-Boot-UI</a></li><li>Tumo-Boot文档地址：<a                  href="https://github.com/Tumo-Team/Tumo-Boot-Docs"                  target="_blank"                  rel="noopener noreferrer"                >https://github.com/Tumo-Team/Tumo-Boot-Docs</a></li></ul>',
  },
};

/**
 * @type {()=>import('vitepress').HeadConfig[]}
 */

function createHead() {
  return [
    ['meta', { name: 'author', content: 'Vbenjs Team' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'tumo-cloud, springcloud, springboot, vite, ant-design-vue, vue',
      },
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    ['meta', { name: 'keywords', content: 'tumo cloud docs' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ];
}

/**
 * @type {()=>import('./theme-default/config').DefaultTheme.NavItem[]}
 */
function createNav() {
  return [
    {
      text: '项目介绍',
      link: '/docs/intro/',
      items: [
        {
          text: '项目介绍',
          link: '/docs/intro/1-intro',
        },
        {
          text: '文档介绍',
          link: '/docs/intro/2-docs-introduce',
        },
        {
          text: '代码生成',
          link: '/docs/intro/3-generate',
        },
        {
          text: '运行项目',
          link: '/docs/intro/4-run',
        },
      ],
    },
    {
      text: '前端文档',
      link: '/docs/app/',
      items: [
        {
          text: '前端设计',
          link: '/docs/app/1-design/1-1-environment',
        },
        {
          text: '基础模块',
          link: '/docs/app/2-base/2-1-layout',
        },
        {
          text: '数据交互',
          link: '/docs/app/3-request/3-1-request-login',
        },
        {
          text: '页面CRUD',
          link: '/docs/app/4-crud/4-1-new-page',
        },
      ],
    },
    {
      text: '后端文档',
      link: '/docs/api/',
      items: [
        {
          text: '项目设计',
          link: '/docs/api/1-design/1-1-environment',
        },
        {
          text: '数据库设计',
          link: '/docs/api/2-db/2-1-rbac-design',
        },
        {
          text: 'Common模块封装',
          link: '/docs/api/3-module-common/3-1-yml',
        },
        {
          text: 'Log模块封装',
          link: '/docs/api/4-module-log/4-1-global-exception',
        },
        {
          text: 'Security模块封装',
          link: '/docs/api/5-module-security/5-1-security-base',
        },
        {
          text: 'Auth模块封装',
          link: '/docs/api/6-module-auth/6-1-api-login',
        },
        {
          text: 'Upms模块封装',
          link: '/docs/2-api/7-module-upms/7-1-user-dev',
        },
      ],
    },
    {
      text: '扩展',
      link: '/docs/extends/',
      items: [
        {
          text: 'Docker部署',
          link: '/docs/extends/docker/1-docker-install',
        },
      ],
    },
  ];
}

function createSidebar() {
  return {
    '/docs/intro/': [
      {
        text: '项目介绍',
        children: [
          {
            text: '项目介绍',
            link: '/docs/intro/1-intro',
          },
          {
            text: '文档介绍',
            link: '/docs/intro/2-docs-introduce',
          },
          {
            text: '代码生成',
            link: '/docs/intro/3-generate',
          },
          {
            text: '运行项目',
            link: '/docs/intro/4-run',
          },
        ],
      },
    ],

    '/docs/app': [
      {
        text: '前端设计',
        children: [
          {
            text: '环境准备',
            link: '/docs/app/1-design/1-1-environment',
          },
          {
            text: '如何使用Vben项目',
            link: '/docs/app/1-design/1-2-use-vben',
          },
          {
            text: 'Tumo-Boot-UI项目搭建',
            link: '/docs/app/1-design/1-3-init-tumo-boot-ui',
          },
        ],
      },
      {
        text: '基础模块',
        children: [
          {
            text: 'Layout布局',
            link: '/docs/app/2-base/2-1-layout',
          },
          {
            text: 'Axios封装',
            link: '/docs/app/2-base/2-2-axios-package',
          },
          {
            text: 'Vuex封装',
            link: '/docs/app/2-base/2-3-vuex-package',
          },
          {
            text: 'Router封装',
            link: '/docs/app/2-base/2-4-router-package',
          },
        ],
      },
      {
        text: '数据交互',
        children: [
          {
            text: '登录流程',
            link: '/docs/app/3-request/3-1-request-login',
          },
          {
            text: '动态菜单',
            link: '/docs/app/3-request/3-2-request-menu',
          },
        ],
      },
      {
        text: '页面CRUD',
        children: [
          {
            text: '新增页面',
            link: '/docs/app/4-crud/4-1-new-page',
          },
          {
            text: 'Vue组件交互',
            link: '/docs/app/4-crud/4-2-page-components',
          },
          {
            text: 'API接口交互',
            link: '/docs/app/4-crud/4-3-page-api',
          },
        ],
      },
    ],

    '/docs/api': [
      {
        text: '项目设计',
        children: [
          {
            text: '环境准备',
            link: '/docs/api/1-design/1-1-environment',
          },
          {
            text: 'SpringBoot项目搭建',
            link: '/docs/api/1-design/1-2-create-springboot',
          },
          {
            text: 'Tumo-Boot项目搭建',
            link: '/docs/api/1-design/1-3-init-tumo-boot',
          },
        ],
      },
      {
        text: '数据库设计',
        children: [
          {
            text: 'RBAC权限表设计',
            link: '/docs/api/2-db/2-1-rbac-design',
          },
          {
            text: 'RBAC权限表操作',
            link: '/docs/api/2-db/2-2-rbac-write',
          },
          {
            text: '日志表设计',
            link: '/docs/api/2-db/2-3-log-design',
          },
        ],
      },
      {
        text: 'Common模块封装',
        children: [
          {
            text: 'YML自定义配置',
            link: '/docs/api/3-module-common/3-1-yml',
          },
          {
            text: 'Common-Core模块封装',
            link: '/docs/api/3-module-common/3-2-common-core',
          },
          {
            text: 'Common-Auth模块封装',
            link: '/docs/api/3-module-common/3-2-common-auth',
          },
          {
            text: 'Common-Mybatis模块封装',
            link: '/docs/api/3-module-common/3-2-common-mybatis',
          },
          {
            text: 'Common-Swagger模块封装',
            link: '/docs/api/3-module-common/3-2-common-swagger',
          },
          {
            text: 'Common-Log模块封装',
            link: '/docs/api/3-module-common/3-2-common-log',
          },
        ],
      },
      {
        text: 'Log模块封装',
        children: [
          {
            text: '全局异常处理',
            link: '/docs/api/4-module-log/4-1-global-exception',
          },
          {
            text: '日志打印',
            link: '/docs/api/4-module-log/4-2-print-log',
          },
          {
            text: '日志持久化',
            link: '/docs/api/4-module-log/4-3-log-db',
          },
        ],
      },
      {
        text: 'Security模块封装',
        children: [
          {
            text: 'Security基础配置',
            link: '/docs/api/5-module-security/5-1-security-base',
          },
          {
            text: '重写OAuth2响应结构',
            link: '/docs/api/5-module-security/5-2-rewrite-oauth-res',
          },
          {
            text: '重写OAuth2异常',
            link: '/docs/api/5-module-security/5-3-rewrite-oauth-error',
          },
          {
            text: '权限功能设计',
            link: '/docs/api/5-module-security/5-4-security-design',
          },
        ],
      },
      {
        text: 'Auth模块封装',
        children: [
          {
            text: '登录、注销接口',
            link: '/docs/api/6-module-auth/6-1-api-login',
          },
          {
            text: '登录接口对接',
            link: '/docs/api/6-module-auth/6-2-api-login-res',
          },
          {
            text: '验证码登录',
            link: '/docs/api/6-module-auth/6-2-api-auth-captcha',
          },
        ],
      },
      {
        text: 'Upms模块开发',
        children: [
          {
            text: '用户模块开发',
            link: '/docs/api/7-module-upms/7-1-user-dev',
          },
          {
            text: '角色、部门模块开发',
            link: '/docs/api/7-module-upms/7-2-role-dev',
          },
          {
            text: '菜单模块开发',
            link: '/docs/api/7-module-upms/7-3-menu-dev',
          },
        ],
      },
    ],

    '/docs/extends': [
      {
        text: 'Docker部署',
        children: [
          {
            text: 'Docker安装',
            link: '/docs/extends/docker/1-docker-install',
          },
          {
            text: 'Docker构建',
            link: '/docs/extends/docker/2-docker-build',
          },
          {
            text: '阿里云容器服务',
            link: '/docs/extends/docker/3-docker-registry',
          },
          {
            text: 'TumoBoot构建镜像',
            link: '/docs/extends/docker/4-build-tumo-boot',
          },
          {
            text: 'Docker容器间网络通信',
            link: '/docs/extends/docker/5-docker-container-net',
          },
        ]
      }
    ],
  };
}

// /**
//  * @type {(namespace:string,items:string[])=>string[]}
//  */
// function urlWrapper(namespace, items) {
//   return items.map((item) => namespace + item);
// }

// function getGuildNav() {
//   return urlWrapper('/guide', ['/']);
// }
