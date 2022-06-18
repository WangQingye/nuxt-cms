 
const state = () => ({
   webConfig: {},
   menuList: [],
   nowMenu: []
 })
 const getters = {
  webConfig: (state) => state.webConfig,
  menuList: (state) => state.menuList,
  nowMenu: (state) => state.nowMenu,
 }
 const mutations = {
   setWebConfig(state, data) {
     state.webConfig = data
   },
   setMenuList(state, data) {
     state.menuList = data
   },
   setNowMenu(state, data) {
     state.nowMenu = data
   },
 }
 const actions = {
 }
 export default {
   state,
   getters,
   mutations,
   actions
 }
 