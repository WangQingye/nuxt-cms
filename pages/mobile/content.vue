 <template>
  <div class='mobile-content-container'>
    <div class="top" :style="`background-image: url(${contentTitleImg})`">
      <p class="top-title">{{titles[0]}}</p>
    </div>
    <div class="small-title">
      <div>
        <i class="circle"></i>
        <span class="title">{{titles[1]}} / {{titles[2]}}</span>
      </div>
      <!-- <span class="date">{{date}}</span> -->
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
    }
  },
  created() {},
  methods: {},
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    titles() {
      let menuIds = this.$route.query.menuIds
      let menuList = this.$store.state.config.menuList
      let titleArr = []
      menuIds.split(',').forEach((id) => {
        titleArr.push(this.$utils.findMenuTitle(menuList, id))
      })
      return titleArr
    },
  },
  watch: {
    '$route': function () {
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
  .top {
    height: 0.72rem;
    width: 100%;
    background-size: cover;
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
