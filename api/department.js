export default $axios => ({
  // 部门详情
  deparmentDetail(data) {
    return $axios({
      url: '/department/detail', method: 'post', data, needToken: false
    })
  },
  // 部门人员
  deparmentPerson(data) {
    return $axios({
      url: '/personnel/index', method: 'post', data, needToken: false
    })
  },
  // 人员详情
  personDetail(data) {
    return $axios({
      url: '/personnel/detail', method: 'post', data, needToken: false
    })
  },
  // 机构列表
  deparmentList(data) {
    return $axios({
      url: '/institution/index', method: 'post', data, needToken: false
    })
  },
  // 机构详情
  labDetail(data) {
    return $axios({
      url: '/institution/detail', method: 'post', data, needToken: false
    })
  },
})