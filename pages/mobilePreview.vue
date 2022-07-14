 <template>
  <div class='mobile-content-container' v-show="show">
    <div class="header">
      <img class="header-logo"
        :src="$store.state.config.webConfig.logo|cloudImage"
        alt="logo"
        @click="$router.push('/')">
    </div>
    <div class="top"
      :style="`background-image: url(${contentTitleImg})`">
      <p class="top-title">{{titles}}</p>
    </div>
    <nuxt-child style="padding: 0 0.2rem;box-sizing: border-box;"></nuxt-child>
  </div>
</template>
<script>
import img from '~/static/imgs/home/topbg@2x.jpg'
export default {
  data() {
    return {
      contentTitleImg: img,
      date: '2022年03月22日',
      show: false
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
  },
  created() {},
  methods: {},
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize = `${
        document.body.clientWidth / 3.75
      }px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
    window.scrollTo(0, 0)
    this.show = true
  },
  computed: {
    titles() {
      return this.$route.path.indexOf('person') > -1 ? '人员信息预览' : '新闻预览'
    },
  },
  watch: {
    $route: function () {
      window.scrollTo(0, 0)
    },
  },
}
</script>
<style scoped lang='scss'>
.mobile-content-container {
  font-size: 0.12rem;
  min-height: calc(100vh - 0.5rem);
  margin-top: 0.5rem;
  .header {
    height: 0.5rem;
    border-bottom: 0.01rem solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    color: white;
    background: white;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 0.2rem;
    .header-logo {
      height: 0.26rem;
      z-index: 2;
      cursor: pointer;
    }
  }
  .top {
    height: 0.72rem;
    width: 100%;
    margin-bottom: 0.3rem;
    background-size: cover;
    background-position: center center;
    .top-title {
      line-height: 0.72rem;
      font-size: 0.21rem;
      font-weight: bold;
      padding-left: 0.34rem;
      color: #1a1a1a;
    }
  }
  .small-title {
    padding: 0 0.2rem;
    @include flex-between;
    margin-top: 0.25rem;
    margin-bottom: 0.4rem;
    .circle {
      display: inline-block;
      width: 0.15rem;
      height: 0.15rem;
      border: 0.02rem solid #e6edff;
      border-radius: 50%;
      box-sizing: border-box;
      margin-right: 0.05rem;
      vertical-align: middle;
    }
    .title {
      font-size: 0.1rem;
      color: #666666;
      vertical-align: middle;
    }
    .date {
      font-size: 0.1rem;
      color: #999999;
    }
  }
}
</style>
