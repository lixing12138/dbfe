import fetch from '../config/fetch'

/**
 * 登录
 */
export const login = data => fetch('/users/signIn', data)

/**
 * 退出
 */
export const logout = () => fetch('/logout.php')