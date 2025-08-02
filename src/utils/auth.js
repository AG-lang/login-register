/**
 * 工具函数：初始化默认用户数据
 * 这个函数会在应用启动时检查是否存在用户数据
 * 如果不存在，会创建一个默认的测试用户
 */
export const initializeDefaultUser = () => {
  // 检查 localStorage 中是否已有用户数据
  const existingUsers = localStorage.getItem('users')
  
  if (!existingUsers) {
    // 创建默认测试用户
    const defaultUsers = [
      {
        id: 1,
        username: 'admin',
        password: '123456'
      }
    ]
    
    // 保存到 localStorage
    localStorage.setItem('users', JSON.stringify(defaultUsers))
    console.log('已初始化默认用户：admin / 123456')
  }
}

/**
 * 工具函数：检查用户是否已登录
 * @returns {boolean} 用户登录状态
 */
export const isUserLoggedIn = () => {
  return !!localStorage.getItem('token')
}

/**
 * 工具函数：获取当前登录用户信息
 * @returns {Object|null} 当前用户信息或 null
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser')
  return userStr ? JSON.parse(userStr) : null
}

/**
 * 工具函数：用户登出
 * 清除所有登录相关的数据
 */
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
}