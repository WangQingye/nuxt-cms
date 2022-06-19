<template>
  <div class='footer'>
    <div class='content'>
        <span style="width: 100%">© 2015-2022 上海交通大学学生创新中心 版权所有</span>
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
    width: 100%;
  }
}
</style>
