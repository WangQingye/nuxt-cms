<template>
  <div class='error'>
    <el-empty v-show="msg" :image-size="400" :image="img404"	:description="msg">
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
      time: 5,
      msg: ''
    }
  },
  mounted() {
    this.time = 5
    this.goBack()
    this.msg = this.error.statusCode === 404 ? '页面不存在' : this.error.message
    if (this.$route.query.msg) {
      this.msg = this.$route.query.msg
    }
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