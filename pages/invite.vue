<template>
  <div class="invite" v-show="show">
    <div class="header">
      <img class="header-logo" v-if="isHomePage" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo" @click="$router.push('/')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invite',
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
    const isMoible =
      /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(
        context.userAgent
      )
        ? true
        : false
    if (isMoible) {
      context.redirect("/error?msg=请用电脑端打开此页面")
    }
    await context.app.$utils.getInitData(context)
  },
  mounted() {
    this.show = true
    console.log(this.$store.state.config)
  },
  methods: {
    isMoible(UA) {
      return
    },
  },
}
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  min-width: 1400px;
  height: auto;
}
</style>
