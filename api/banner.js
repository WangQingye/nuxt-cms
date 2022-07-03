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
  },
  // 快速应用入口
  getQuickLink(params) {
    return $axios({
      url: '/quick/index', method: 'get', params
    })
  },
  // 快速常用链接
  getFriendLink(params) {
    return $axios({
      url: '/friend/index', method: 'get', params
    })
  },
  // 首页热点
  getHotPoint(params) {
    return $axios({
      url: '/home/hot', method: 'get', params
    })
  }
})