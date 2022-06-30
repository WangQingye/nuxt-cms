export default $axios => ({
  // 首页banner
  bannerList(params) {
    return $axios({
      url: '/banner/index', method: 'get', params
    })
  },
  // 获取配置
  getWebConfig(params) {
    return $axios({
      url: '/configure/config', method: 'get', params
    })
  },
  // 获取导航菜单
  getNavigation(params) {
    return $axios({
      url: '/navigation/index', method: 'get', params
    })
  }
})