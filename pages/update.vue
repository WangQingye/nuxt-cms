 <template>
  <div class='update'>
    <img class="header-logo" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo">
    <div class="content">
      <p class="text">抱歉，系统正在升级维护，敬请期待</p>
    </div>
      
  </div>
</template>
<script>
export default {
  name: 'Update',
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
  },
}
</script>
<style scoped lang='scss'>
.update {
  width: 100vw;
  height: 100vh;
  background: url(~/static/imgs/bg-1.jpg);
  background-size: cover;
  padding: 0 10%;
  box-sizing: border-box;
  .header-logo {
    margin-top: 20px;
    height: 38px;
  }
  .content {
    @include flex-between;
    width: 100%;
    height: calc(100% - 100px);
    justify-content: center;
    .text {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 1500px) {
    .header-logo {
      margin-top: 20px;
      height: 26px;
    }
    .content {
      @include flex-between;
      width: 100%;
      height: calc(100% - 100px);
      justify-content: center;
      .text {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
