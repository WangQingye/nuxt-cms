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
      url: '/setting/configure', method: 'get', params
    })
  }
})