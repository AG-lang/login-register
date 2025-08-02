import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/**
 * LoginPage 登录页面组件
 * 提供用户登录功能，验证用户名和密码
 * 登录成功后跳转到首页
 */
function LoginPage() {
  // 使用 useState Hook 管理表单数据
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  
  // 管理错误消息的状态
  const [errorMessage, setErrorMessage] = useState('')
  
  // 管理登录过程中的加载状态
  const [isLoading, setIsLoading] = useState(false)
  
  // 使用 useNavigate Hook 进行页面导航
  const navigate = useNavigate()

  /**
   * 处理输入框变化的函数
   * 这是受控组件的核心：每次输入都会更新组件的 state
   * 
   * @param {Event} e - 输入事件
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 清除错误消息（当用户开始重新输入时）
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  /**
   * 处理登录表单提交
   * 验证用户输入并与 localStorage 中的用户数据进行匹配
   * 
   * @param {Event} e - 表单提交事件
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 基本验证
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage('请填写完整的用户名和密码')
      return
    }
    
    setIsLoading(true)
    setErrorMessage('')
    
    try {
      // 模拟异步登录过程（在真实项目中，这里会是 API 调用）
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 从 localStorage 获取用户数据
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // 查找匹配的用户
      const user = users.find(u => 
        u.username === formData.username && u.password === formData.password
      )
      
      if (user) {
        // 登录成功：生成并存储 token
        const token = `token_${user.id}_${Date.now()}` // 简单的 token 生成
        localStorage.setItem('token', token)
        
        // 可选：存储当前用户信息
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          username: user.username
        }))
        
        // 跳转到首页
        navigate('/', { replace: true })
      } else {
        setErrorMessage('用户名或密码错误')
      }
    } catch (error) {
      setErrorMessage('登录过程中发生错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>用户登录</h2>
        
        {/* 错误消息显示 */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        {/* 登录表单 */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>
        
        {/* 导航链接 */}
        <p>
          还没有账号？
          <Link to="/register" className="link">立即注册</Link>
        </p>
        
        {/* 开发提示信息 */}
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '5px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>测试提示：</strong>
          <br />
          请先去注册页面创建一个账号，然后回来登录。
          <br />
          或者可以使用测试账号：用户名 <code>admin</code>，密码 <code>123456</code>
        </div>
      </div>
    </div>
  )
}

export default LoginPage