import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../utils/auth'

/**
 * HomePage 首页组件
 * 这是一个受保护的页面，只有登录用户才能访问
 * 显示欢迎信息和登出功能
 */
function HomePage() {
  // 使用 useState Hook 管理当前用户信息
  const [currentUser, setCurrentUser] = useState(null)
  
  // 使用 useNavigate Hook 进行页面导航
  const navigate = useNavigate()

  /**
   * 使用 useEffect Hook 在组件挂载时获取用户信息
   * 这是一个副作用操作，用于从 localStorage 读取数据
   */
  useEffect(() => {
    // 获取当前登录用户的信息
    const user = getCurrentUser()
    setCurrentUser(user)
  }, []) // 空依赖数组表示仅在组件挂载时执行一次

  /**
   * 处理用户登出的函数
   * 清除登录状态并跳转到登录页面
   */
  const handleLogout = () => {
    // 使用工具函数清除登录相关数据
    logout()
    
    // 跳转到登录页面
    // replace: true 表示替换当前历史记录，用户无法通过后退按钮回到受保护页面
    navigate('/login', { replace: true })
  }

  return (
    <div className="container">
      <div className="home-container">
        <h1>🎉 欢迎来到首页！</h1>
        
        {currentUser && (
          <div className="welcome-info">
            <h3>👋 你好，{currentUser.username}！</h3>
            <p>用户ID: {currentUser.id}</p>
            <p>登录时间: {new Date().toLocaleString()}</p>
          </div>
        )}
        
        <p>
          这是一个<strong>受保护的页面</strong>，只有登录用户才能访问。
          <br />
          如果你能看到这里，说明你已经成功登录了！
        </p>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px', 
          margin: '20px 0',
          textAlign: 'left'
        }}>
          <h4>🔒 这个页面的特点：</h4>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li>通过 PrivateRoute 组件保护</li>
            <li>未登录用户会自动重定向到登录页</li>
            <li>显示当前登录用户的信息</li>
            <li>提供安全的登出功能</li>
          </ul>
        </div>
        
        <div style={{ 
          background: '#fff3cd', 
          padding: '15px', 
          borderRadius: '8px', 
          margin: '20px 0',
          border: '1px solid #ffeaa7'
        }}>
          <h4>💡 学习要点：</h4>
          <p style={{ margin: '5px 0', fontSize: '14px', textAlign: 'left' }}>
            • <strong>useEffect</strong>: 在组件挂载时获取用户数据<br />
            • <strong>localStorage</strong>: 持久化存储用户登录状态<br />
            • <strong>路由保护</strong>: 通过 PrivateRoute 实现访问控制<br />
            • <strong>状态管理</strong>: 使用 useState 管理用户信息
          </p>
        </div>
        
        {/* 登出按钮 */}
        <button 
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ marginTop: '20px' }}
        >
          🚪 安全登出
        </button>
        
        {/* 开发者信息 */}
        <div style={{ 
          marginTop: '30px', 
          padding: '15px',
          background: '#e8f5e8',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#555'
        }}>
          <strong>开发提示：</strong>
          <br />
          你可以打开浏览器的开发者工具 → Application → Local Storage
          <br />
          查看存储的用户数据和登录 token
        </div>
      </div>
    </div>
  )
}

export default HomePage