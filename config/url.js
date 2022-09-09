const url = 'http://cms.vispp.cn/'
module.exports = {
  defaultWebSiteName: '上海交通大学学生创新中心',
  imgDomain: `${url}media`,
  baseUrl: `${url}api`,
  tokenName: 'AccessToken',
  // 个人用户中心
  userCenter: 'http://account.u-auth.com/',
  // 是否展示更新(如果为true，所有路由都将指向update)
  isUpdate: false
}
