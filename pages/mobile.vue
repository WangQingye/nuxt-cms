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
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize = `${
        document.body.clientWidth / 3.75
      }px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
  },
}
</script>

<style lang="scss" scoped>
</style>
