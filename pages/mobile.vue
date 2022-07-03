<template>
  <div class="mobile-home">
    <HeaderMobile />
    <nuxt-child style="position: relative; z-index: 1;box-sizing:border-box;"></nuxt-child>
    <FooterMobile />
  </div>
</template>

<script>
export default {
  name: 'MobileHome',
  data() {
    return {
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
  },
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize = `${
        document.body.clientWidth / 3.75
      }px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
    try {
      window.document.title = this.$store.state.config.webConfig.find(c => c.key == 'name').value
    } catch (error) {
      console.log('noname')
    }
  },
}
</script>

<style lang="scss">
.el-message {
  min-width: 1rem;
  max-width: 3.75rem;
  .el-message__icon {
    font-size: 0.14rem;
  }
}
</style>
