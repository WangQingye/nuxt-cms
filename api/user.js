export default $axios => ({
  // 获取登录链接
  AuthorizeCode(data) {
    return $axios({
      url: '/sso/index', method: 'post', data
    })
  },
  // 登录
  login(data) {
    return $axios({
      url: '/sso/login', method: 'post', data
    })
  },
  // 获取用户信息
  userProfile(params) {
    return $axios({
      url: '/user/profile', method: 'get', params
    })
  },
  // 退出登录
  logout(params) {
    return $axios({
      url: '/user/logout', method: 'get', params
    })
  },  
})