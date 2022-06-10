<template>
  <div class="main">
    <p>111</p>
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
}
</script>

<style lang="scss" scoped>
.main {
}
</style>
