<template>
  <div class="main">
    <Header />
    <nuxt-child style="padding-top: 80px;"></nuxt-child>
    <Footer />
  </div>
</template>

<script>

export default {
  name: 'Main',
  async asyncData(context) {
    let data = await context.app.$api.banner.getWebConfig()
    context.store.commit('config/setWebConfig', data)
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-width: 1440px;
  position: relative;
  // 纯色
  background: linear-gradient(to bottom, $--color-primary 760px, #fbfbfa 760px);

  // 图片
  // background: url(../assets/imgs/sucaibg.jpg) left top no-repeat,
  //   #fbfbfa right bottom repeat;

  background-size: 100%, 390px, auto;
  height: auto;
}
</style>
