export default $axios => ({
  // 新闻详情
  newsDetail(data) {
    return $axios({
      url: '/news/detail', method: 'post', data, needToken: false
    })
  },
  // 新闻标签
  newsTag(data) {
    return $axios({
      url: '/category/tag', method: 'post', data, needToken: false
    })
  },
  // 新闻列表
  newsList(data) {
    return $axios({
      url: '/news/index', method: 'post', data, needToken: false
    })
  },
  // 新闻点赞
  newsLike(data) {
    return $axios({
      url: '/news/like', method: 'post', data, needToken: false
    })
  },
  // 文章详情
  articleDetail(data) {
    return $axios({
      url: '/article/detail', method: 'post', data, needToken: false
    })
  },
  // 新闻搜索
  newsSearch(data) {
    return $axios({
      url: '/news/search', method: 'post', data, needToken: false
    })
  },
})