<template>
  <div class="main" ref="mainDiv" v-show="show">
    <Header />
    <nuxt-child style="padding-top: 80px"></nuxt-child>
    <Footer />
  </div>
</template>

<script>
import { tokenName } from '@/config'
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      show: false,
    }
  },
  head() {
    let title = this.$store.state.config.webConfig.name
    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: title,
          content: title,
        },
      ],
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
  },
  mounted() {
    let token = localStorage.getItem(tokenName)
    if (token) {
      this.$store.dispatch('user/getUserInfo')
    }
    if (window.screen.width < 1400) {
      var curWidth = window.screen.width
      var tarWidth = 1400
      var scalc = curWidth / tarWidth
      //创建新的标签
      var meta = document.createElement('meta')
      meta.name = 'viewport'
      meta.content =
        'initial-scale=' +
        scalc +
        ',minimum-scale=' +
        scalc +
        ',maximum-scale=' +
        scalc +
        ',user-scalable=no'
      //插入到head的子元素
      document.head.appendChild(meta)
    }
    this.show = true
    if (navigator.userAgent.toLowerCase().indexOf('trident')>-1) {
      this.$confirm('<span>检测到您当前浏览器使用的是IE内核，自2015年3月起，微软已宣布弃用IE，且不再对IE提供任何更新维护，请<a href="https://www.microsoft.com/zh-cn/edge/home" target="_blank">点击此处</a>访问微软官网更新浏览器，如果您使用的是双核浏览器请您切换浏览器内核为极速模式</span>', '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
        type: 'warning',
      })
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      profile: 'user/getUserInfo',
    }),
    handleLogin(code, state) {
      this.login({
        code,
        state,
      }).then((_) => {
        let newQuery = JSON.parse(JSON.stringify(this.$route.query))
        delete newQuery.code
        delete newQuery.state
        this.$router.replace({ query: newQuery })
        this.profile()
      })
    },
  },
  watch: {
    $route: {
      handler(route) {
        const { code, state } = route.query
        if (code && state) {
          this.handleLogin(code, state)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-width: 1400px;
  position: relative;
  // 纯色
  background: linear-gradient(to bottom, $--color-primary 760px, #fbfbfa 760px);

  // 图片
  // background: url(../assets/imgs/sucaibg.jpg) left top no-repeat,
  //   #fbfbfa right bottom repeat;

  background-size: 100%, 390px, auto;
  height: auto;
}
</style>
