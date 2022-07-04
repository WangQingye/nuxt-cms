<template>
  <div class='big-title' ref="title">
    <div>
      <span class="line"></span>
      <span class='cn-text'>{{cnText}}</span>
    </div>
    <div class="more" v-show="showMoreUrl" @click="clickMore">
      <span>查看更多</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <p class='en-text'>{{enText}}</p>
  </div>
</template>
<script>
export default {
  props: {
    cnText: {
      type: String,
      default: '标题',
    },
    enText: {
      type: String,
      default: 'TITLE',
    },
    color: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: 'center',
    },
    showMoreUrl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  mounted() {
    if (this.color) {
      this.$refs.title.style.color = this.color
    }
  },
  methods: {
    clickMore() {
      let ids = this.$utils.findMenuIdsByTitle(
        this.$store.state.config.menuList,
        this.cnText
      )
      let item = this.$utils.findMenuItemByTitle(
        this.$store.state.config.menuList,
        this.cnText
      )
      let subPage = this.$utils.typeToPages[item.event_type]
      this.$router.push(
        `/content/${subPage}?menuIds=${ids}&params=${item.event_link}&singlePage=1`
      )
    },
  },
}
</script>
<style scoped lang='scss'>
.big-title {
  @include flex-between(flex-start);
  position: relative;
  height: 0.3rem;
  .line {
    background: $--color-primary;
    display: inline-block;
    width: 0.01rem;
    height: 0.15rem;
    position: relative;
    z-index: 2;
  }
  .cn-text {
    vertical-align: top;
    font-size: 0.15rem;
    font-weight: bold;
    position: relative;
    z-index: 2;
  }
  .more {
    color: #4d4d4d;
    position: relative;
    z-index: 2;
    margin-top: 0.06rem;
  }
  .en-text {
    font-size: 0.38rem;
    font-family: Arial;
    font-weight: bold;
    color: #fff;
    position: absolute;
    z-index: 1;
    left: 0;
    top: -0.04rem;
    width: 100%;
    @include ellipsisBasic(1);
  }
}
</style>