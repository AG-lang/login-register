import { Navigate } from "react-router-dom";

/**
 * PrivateRoute 受保护的路由组件
 * 这个组件用于保护需要登录才能访问的页面
 * 如果用户未登录，将自动重定向到登录页面
 *
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 需要保护的子组件
 * @returns {ReactNode} 根据登录状态返回子组件或重定向组件
 */
function PrivateRoute({ children }) {
  // 从 localStorage 中获取 token 来判断用户是否已登录
  // 在真实项目中，这里可能还需要验证 token 的有效性
  const token = localStorage.getItem("token");

  // 如果存在 token，说明用户已登录，渲染子组件
  // 如果不存在 token，重定向到登录页面
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
