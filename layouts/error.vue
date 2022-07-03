<template>
  <div class='error'>
    <el-empty :image-size="300"	:description="error.statusCode === 404 ? '页面不存在' : '未知错误'">
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </el-empty>
  </div>
</template>
<script>
export default {
  props: ['error'],
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang='scss'>
.error {
  width: 100vw;
  height: 100vh;
  @include flex-between;
  justify-content: center;
}
</style>