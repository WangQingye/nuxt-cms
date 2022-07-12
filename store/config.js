 
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
     let obj = {}
     data.forEach(d => {
       if (d.value) {
         obj[d.key] = d.value
       }
     })
     state.webConfig = obj
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
 