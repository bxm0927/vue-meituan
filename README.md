
# :mortar_board: 美团外卖APP

👉 项目演示地址：http://39.108.232.27:9000

基于 **Vue 全家桶 (2.x)** 制作的美团外卖APP ，一个媲美原生的移动端外卖 App，项目完整、功能完备、UI美观、交互一流。

## :book: 技术栈

<img align="right" src="http://oph264zoo.bkt.clouddn.com/17-9-15/96325894.jpg"/>

【前端】

- **Vue**：构建用户界面的 MVVM 框架，核心是响应的数据绑定和组系统件
- **vue-router**：为单页面应用提供的路由系统，项目上线前使用了路由懒加载技术，来异步加载路由优化性能
- **vuex**：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- **vue-resource**：服务端通讯，项目后期改用 `axios`
- **axios**：服务端通讯。基于 `Promise` 的网络请求插件
- **vue-lazyload**：第三方图片懒加载库，优化页面加载速度
- **better-scroll**：iscroll 的优化版，使移动端滑动体验更加流畅
- **Mint UI**：一套基于 Vue 2.0 的移动端组件库，出自饿了么前端
- **Sass(Scss)**：css 预编译处理器
- **ES6**：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
- **Moment.js**：日期时间格式化插件

【后端及数据库】

- **Node.js**：利用 Express 起一个本地测试服务器
- **Express**：一个自身功能极简，完全是由路由和中间件构成一个的WEB开发框架

【自动化构建及其他工具】

- **vue-cli**：Vue 脚手架工具，快速初始化项目代码
- **ESLint**：代码风格检查工具，规范代码书写
- **pm2**：一个带有负载均衡功能的Node应用的进程管理器，此项目用于在阿里云服务器启动服务

## :closed_book: 收获

1. 对 vue 的组件、指令、选项、模版渲染、事件绑定、计算属性等有了一定了解
2. 了解了 vue 组件之间的交互、传值
3. 熟悉了在 vue 项目中使用第三方插件（组件）
4. 熟悉了组件化、模块化的开发思维
5. 熟悉了 vue-router 控制路由和子路由的方式
6. 再次熟悉项目开发流程：项目分析设计 -> 项目环境搭建 -> 依赖安装 -> 页面架构设计 -> 组件开发 -> 测试联调 -> 发布上线
1. 总结了一套 Vue 通用组件，可以在其它项目中复用的 10+ 个基础组件、15+ 个业务组件
2. 总结了一套常用的 SCSS mixin 库
3. 总结了一套常用的 JS 工具函数库
4. 体会到组件化、模块化开发带来的便捷
5. 体会到将对象封装成类(ES6 class) 的便捷性，以及利用工厂方式初始化类实例
6. 学会利用过渡效果及动画效果制作良好的用户交互体验


## :pencil: 实现细节

主要功能：首页、商家模块、发现、订单、我的

### 首页

首页数据 mock 美团移动端数据 - [接口](http://i.waimai.meituan.com)

### 商家模块

该页面主要实现了点餐、商品评价、商家信息预览等功能，内置购物车

数据通过 `axios` 异步请求获取，前期使用 mock 数据，后期抓取xx数据

公告浮层中使用了移动端经典的 `CSS-Sticky-Footer` 布局：关闭按钮被挤下去

公告浮层设计了淡入淡出效果，并使用了针对 IOS 用户的渐进增强效果： `backdrop-filter`

导航栏解决移动端1像素边框问题，并设计了通用 mixin

下面三个部分使用嵌套子路由实现：

**点餐**：

- 布局上采用嵌套 Flex 布局。
- 滚动效果借助 `better-scroll` 滚动插件实现。
- 实现了左右菜单联动效果：右侧滚动，左侧对应菜单高亮，左侧点击，右侧滚动到对应区域。
- 设计了迷你购物车组件
- 利用 css 过度动画实现了购物车加减动态效果
- 利用 js 钩子实现了加入购物车飞行小球效果

**评价**：

- 复用 `star`、`cross-line`、`ratings-select` 等组件，体会到组件化开发的便捷性

**商家**：

- 借助 `better-scroll` 实现了横向滚动和纵向滚动效果
- 收藏功能使用 `localstorage` 本地存储，并设计了通用 store 方案


## :pushpin: TODO

1. 做一个node服务端，配合mongodb，实现商品的上下架、用户的登录注册等功能
2. 丰富各个模块的深度

## :package: Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/bxm0927/vue-meituan.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build
```


## :four_leaf_clover: License

The code is available under the [MIT license](https://opensource.org/licenses/MIT).

![](http://oph264zoo.bkt.clouddn.com/17-8-11/10545126.jpg)
