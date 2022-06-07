 
const state = () => ({
   webConfig: {}
 })
 const getters = {
  webConfig: (state) => state.webConfig,
 }
 const mutations = {
   setWebConfig(state, data) {
     state.webConfig = data
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
 