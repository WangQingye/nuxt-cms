<template>
  <div class='footer'>
    <div class='content'>
      <p>
        <!-- <span>
          © {{ (new Date).getFullYear() }} {{ $store.state.config.webConfig.site_name }}
        </span>
        <span v-if="$store.state.config.webConfig.copyright"
              @click="handleCommand($store.state.config.webConfig.copyright)"
              class="link">
          | {{ $store.state.config.webConfig.copyright }}
        </span> -->
        <span>© 2015-2022 上海交通大学学生创新中心 版权所有</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleCommand(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
<style scoped lang='scss'>
.footer {
  width: 100%;
  font-size: 0.1rem;
  height: 0.5rem;
  margin: 0 auto;
  background: white;
  color: #CCCCCC;

  .content {
    line-height: 0.5rem;
    text-align: center;

    .link {
      cursor: pointer;
      color: #999999;
    }
  }
}
</style>
