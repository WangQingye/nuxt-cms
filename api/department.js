export default $axios => ({
  // 部门详情
  deparmentDetail(data) {
    return $axios({
      url: '/department/detail', method: 'post', data
    })
  },
  // 部门人员
  deparmentPerson(data) {
    return $axios({
      url: '/personnel/index', method: 'post', data
    })
  },
  // 人员详情
  personDetail(data) {
    return $axios({
      url: '/personnel/detail', method: 'post', data
    })
  },
  // 人员搜索
  personSearch(data) {
    return $axios({
      url: '/personnel/search', method: 'post', data
    })
  },  
  // 机构列表
  deparmentList(data) {
    return $axios({
      url: '/institution/index', method: 'post', data
    })
  },
  // 业务部门动态
  deparmentNews(data) {
    return $axios({
      url: '/institution/news', method: 'post', data
    })
  },
  // 机构详情
  labDetail(data) {
    return $axios({
      url: '/institution/detail', method: 'post', data
    })
  },
})