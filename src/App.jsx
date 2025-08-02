import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeDefaultUser } from './utils/auth'

// 导入页面组件
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'

/**
 * 使用 createBrowserRouter 创建路由配置
 * 这是 React Router v6 推荐的路由配置方式
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // 使用 PrivateRoute 保护首页，只有登录用户才能访问
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // 可以添加更多路由...
  {
    path: '*',
    element: (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1>404 - 页面不存在</h1>
        <p>你访问的页面不存在</p>
        <a 
          href="/login" 
          style={{ color: 'white', textDecoration: 'underline' }}
        >
          返回登录页
        </a>
      </div>
    ),
  },
])

/**
 * App 主应用组件
 * 这是整个应用的根组件
 */
function App() {
  /**
   * 使用 useEffect Hook 在应用启动时初始化默认用户
   * 这样可以确保始终有一个测试用户可用
   */
  useEffect(() => {
    initializeDefaultUser()
  }, []) // 空依赖数组表示只在应用启动时执行一次

  return (
    // RouterProvider 提供路由上下文给整个应用
    <RouterProvider router={router} />
  )
}

export default App