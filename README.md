# 锦绣超市进销存信息管理系统-前端

本项目是本科的毕业设计作品，主要是实现超市的进销存信息管理。采用前后端分离的开发方式，后端使用SpringBoot，前端使用React。

技术栈：react / mobx / typescript / sass / antd

代码地址：

前端：[https://github.com/AnneHan/JXMarket-web.git](https://github.com/AnneHan/JXMarket-web)

后端：[https://github.com/AnneHan/JXMarket-Backend.git](https://github.com/AnneHan/JXMarket-Backend)

# 启动

```shell

npm install

npm run start

```

# 构建

```shell
# SIT
npm run build:test

# PROD
npm run build:prod

```

### 提交

- feat:        新增feature
- fix:         修复bug
- docs:        仅仅修改了文档，如README.md
- style:       仅仅是对格式进行修改，如逗号、缩进、空格等,不改变代码逻辑
- refactor:    代码重构，没有新增功能或修复bug
- perf:        优化相关，如提升性能、用户体验等
- test:        测试用例，包括单元测试、集成测试
- chore:       改变构建流程、或者增加依赖库、工具等
- revert:      版本回滚


## 依赖注意事项

以下两个依赖版本`请勿升级!!!`，有破坏性改动。
目前发现的有：
1. Modal组件的 `visible`=> `open`
2. Form组件的样式不一致
3. Dropdown组件 `onVisibleChange` =>`onOpenChange`
4. antd4.22.+ 未导出theme，导致@antd/pro-pulgins和@antd/pro-utils两个包报错，项目无法启动

```json
"antd" : "4.20.7"
"@ant-design/pro-table": "2.74.2"
```
