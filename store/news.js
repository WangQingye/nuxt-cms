const state = () => ({
  isPreview: false,
})
const mutations = {
  setIsPreview(state, data) {
    state.isPreview = data
  },
}
export default {
  state,
  mutations,
}
