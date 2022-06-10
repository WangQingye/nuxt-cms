export default $axios => ({
  // 新闻详情
  newsDetail(data) {
    return $axios({
      url: '/news/detail', method: 'post', data, needToken: false
    })
  }
})