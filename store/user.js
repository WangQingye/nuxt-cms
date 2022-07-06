/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import {
  tokenName
} from '@/config'

const state = () => ({
  token: '',
  user: {
    id: undefined,
    name: undefined,
    nickname: '游客',
    avatar: '',
    dept: [],
    major: []
  },
  userType: {
    'student': '在校学生',
    'teacher': '在校老师',
    'staff': '企业人员',
    'out_student': '外校学生',
    'out_teacher': '外校老师'
  }
})
const getters = {
  token: (state) => state.user.token,
  username: (state) => state.user.nickname,
  avatar: (state) => state.user.avatar,
  user: (state) => state.user,
  isLogin: (state) => state.user.id
}
const mutations = {
  setUserInfo(state, data) {
    state.user = data
    if (data.access_token && !process.server) {
      localStorage.setItem(tokenName, data.access_token)
    } 
  },
  setToken(state, token) {
    state.token = token
  }
}
const actions = {
  async login({
    commit,
    dispatch
  }, params) {
    const data = await this.$api.user.login(params)
    if (data.id) {
      commit('setUserInfo', data)
    } else {
      const err = `登录接口异常...`
      throw err
    }
  },
  async getUserInfo({
    commit,
    dispatch
  }) {
    const {
      user
    } = await this.$api.user.userProfile()
    if (user === undefined) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      throw err
    } else {
      if (user) commit('setUserInfo', user)
    }
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({
    dispatch
  }) {
    await this.$api.user.logout()
    localStorage.removeItem(tokenName)
    await dispatch('resetAll')
  },
  /**
   * @description 重置token、roles、permission、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({
    commit,
    dispatch
  }) {
    commit('setUserInfo', {
      id: undefined,
      username: '游客',
      avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
      bind_status: 0,
    })
    localStorage.removeItem(tokenName)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
