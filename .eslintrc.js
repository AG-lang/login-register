module.exports = {
  // 指定代码的运行环境
  env: {
    browser: true, // 浏览器环境
    es2021: true, // 启用 ES2021 语法
    node: true, // 启用 Node.js 全局变量和作用域
  },
  // 继承一组推荐的规则
  extends: [
    "eslint:recommended", // ESLint 官方推荐规则
    "plugin:react/recommended", // React 推荐规则
    "plugin:react/jsx-runtime", // 支持 React 17+ 的新 JSX 转换
    "plugin:react-hooks/recommended", // React Hooks 推荐规则
  ],
  // ESLint 解析器选项
  parserOptions: {
    ecmaVersion: "latest", // 使用最新的 ECMAScript 版本
    ecmaFeatures: {
      jsx: true, // 启用 JSX
    },
  },
  // 使用的插件
  plugins: [
    "react", // React 插件
    "react-refresh", // Vite 的 React 刷新插件
  ],
  // 自定义规则
  rules: {
    // 强制 react-refresh 插件只在需要时导出
    "react-refresh/only-export-components": "warn",
    // 你可以在这里添加或覆盖规则，比如关闭某个规则：
    // 'react/prop-types': 'off' // 如果你未使用 prop-types，可以关闭此规则
  },
  // 其他设置
  settings: {
    react: {
      // 自动检测项目中使用的 React 版本
      version: "detect",
    },
  },
};
