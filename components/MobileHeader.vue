<template>
  <div class="mobile-header">
    <img class="header-logo" v-if="$store.state.config.webConfig.site_front_logo" :src="$store.state.config.webConfig.site_front_logo|cloudImage" alt="logo">
    <img class="header-logo" v-else src="https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
    <i class="el-icon-s-fold icon" @click="drawerVisible = true"/>
    <el-drawer title="我是标题" :visible.sync="drawerVisible" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'MobileHeader',
  // mixins: [authorizeMixin],
  data() {
    return {
      drawerVisible: false,
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.mobile-header {
  width: 100%;
  height: 0.5rem;
  background: red;
  box-sizing: border-box;
  @include flex-between;
  padding: 0 0.2rem;
  .header-logo {
    margin: 0;
    max-height: 0.5rem;
    width: 1rem;
  }
  .icon {
    font-size: 0.21rem;
  }
}
</style>
