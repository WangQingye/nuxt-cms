export default $axios => ({
  // 部门详情
  deparmentDetail(data) {
    return $axios({
      url: '/department/detail', method: 'post', data, goError: true
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
      url: '/personnel/detail', method: 'post', data, goError: true
    })
  },
  // 人员搜索
  personSearch(data) {
    return $axios({
      url: '/personnel/search', method: 'post', data
    })
  },  
  // 人员邀请信息
  personInvite(data) {
    return $axios({
      url: '/personnel/invite', method: 'post', data, noTip: true
    })
  },
  // 人员信息更新
  personUpdate(data) {
    return $axios({
      url: '/personnel/update', method: 'post', data
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
  // 人员标签列表
  personnelTags(data) {
    return $axios({
      url: '/personnel/tags', method: 'post', data
    })
  },
  // 人员列表 字母索引
  personnelList(data) {
    return $axios({
      url: '/personnel/list', method: 'post', data
    })
  },
  // 人员列表 部门索引
  personnelListByDept(data) {
    return $axios({
      url: '/personnel/list2', method: 'post', data
    })
  },
  // 获取组织架构
  getOrganization(params) {
    return $axios({
      url: '/organization/index', method: 'get', params
    })
  },  
  // 机构类别详情（服务于组织架构）
  getCateDetail(data) {
    return $axios({
      url: '/institution/cate-detail', method: 'post', data
    })
  },  
})