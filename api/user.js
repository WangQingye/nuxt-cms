export default $axios => ({
  // 获取登录链接
  AuthorizeCode(data) {
    return $axios({
      url: '/sso/index', method: 'post', data
    })
  },
  // 退出登录
  logout(params) {
    return $axios({
      url: '/user/logout', method: 'get', params
    })
  },
})