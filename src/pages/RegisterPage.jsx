import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

/**
 * RegisterPage 注册页面组件
 * 提供用户注册功能，包含用户名和密码输入框
 * 注册成功后跳转到登录页面
 */
function RegisterPage() {
  // 使用 useState Hook 管理表单数据的状态
  const [formData, setFormData] = useState({
    username: '',  // 用户名
    password: ''   // 密码
  })
  
  // 使用 useState Hook 管理错误和成功消息
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'error' 或 'success'
  
  // 使用 useNavigate Hook 进行页面跳转
  const navigate = useNavigate()

  /**
   * 处理输入框值变化的函数
   * 这是一个受控组件的核心概念：通过 state 管理表单输入
   * 
   * @param {Event} e - 输入事件对象
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    // 使用 setFormData 更新对应字段的值
    // 这里使用了展开运算符来保持其他字段不变
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * 处理表单提交的函数
   * 包含基本的表单验证和用户注册逻辑
   * 
   * @param {Event} e - 表单提交事件对象
   */
  const handleSubmit = (e) => {
    // 阻止表单的默认提交行为，防止页面刷新
    e.preventDefault()
    
    // 清除之前的消息
    setMessage('')
    
    // 基本的非空校验
    if (!formData.username.trim()) {
      setMessage('请输入用户名')
      setMessageType('error')
      return
    }
    
    if (!formData.password.trim()) {
      setMessage('请输入密码')
      setMessageType('error')
      return
    }
    
    if (formData.password.length < 6) {
      setMessage('密码长度至少为6位')
      setMessageType('error')
      return
    }

    try {
      // 从 localStorage 获取现有用户数据
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      // 检查用户名是否已存在
      const userExists = existingUsers.some(user => user.username === formData.username)
      
      if (userExists) {
        setMessage('用户名已存在，请选择其他用户名')
        setMessageType('error')
        return
      }
      
      // 创建新用户对象
      const newUser = {
        id: Date.now(), // 简单的 ID 生成方式
        username: formData.username,
        password: formData.password // 注意：在真实项目中，密码应该加密存储
      }
      
      // 将新用户添加到用户列表
      const updatedUsers = [...existingUsers, newUser]
      
      // 保存到 localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      
      // 显示成功消息
      setMessage('注册成功！正在跳转到登录页面...')
      setMessageType('success')
      
      // 清空表单
      setFormData({ username: '', password: '' })
      
      // 延迟跳转到登录页面，让用户看到成功消息
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      
    } catch (error) {
      setMessage('注册失败，请重试')
      setMessageType('error')
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>用户注册</h2>
        
        {/* 错误或成功消息显示 */}
        {message && (
          <div className={messageType === 'error' ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}
        
        {/* 注册表单 */}
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
              placeholder="请输入密码（至少6位）"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            注册
          </button>
        </form>
        
        {/* 导航链接 */}
        <p>
          已有账号？
          <Link to="/login" className="link">立即登录</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage