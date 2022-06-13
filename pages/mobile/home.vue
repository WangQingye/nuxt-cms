<template>
  <div class="main">
    <MobileHeader />
  </div>
</template>

<script>
export default {
  name: 'Main',
  async asyncData(context) {
    let data = await context.app.$api.banner.getWebConfig()
    context.store.commit('config/setWebConfig', data)
    console.log(data)
  },
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize =
        `${document.body.clientWidth / 3.75}px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
  },
}
</script>

<style lang="scss" scoped>
.main {
  font-size: 0.12rem;
}
</style>
