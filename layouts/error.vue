<template>
  <div class='error'>
    <el-empty :image-size="400" :image="img404"	:description="error.statusCode === 404 ? '页面不存在' : '未知错误'">
      <el-button type="primary" @click="$router.push('/')">{{time}}s 后返回首页</el-button>
    </el-empty>
  </div>
</template>
<script>
import img404 from '~/static/imgs/404.png'
export default {
  props: ['error'],
  data() {
    return {
      img404,
      time: 5
    }
  },
  mounted() {
    this.time = 5
    this.goBack()
  },
  methods: {
    goBack() {
      if (this.time == 0) {
        this.$router.push('/')
      } else {
        setTimeout(() => {
          this.time--;
          this.goBack()
        }, 1000);
      }
    }
  },
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