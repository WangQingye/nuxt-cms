<template>
  <div class='footer'>
    <div class='content'>
      <p>
        <span>
          © {{ (new Date).getFullYear() }} 上海交通大学学生创新中心
        </span>
        <span v-if="$store.state.config.webConfig.beian"
              @click="handleCommand($store.state.config.webConfig.beian)"
              class="link">
          | {{ $store.state.config.webConfig.beian }}
        </span>
        <span v-if="$store.state.config.webConfig.copyright"
              @click="handleCommand($store.state.config.webConfig.copyright)"
              class="link">
          | {{ $store.state.config.webConfig.copyright }}
        </span>
      </p>
      <p>
        <span v-if="$store.state.config.webConfig.friend_links && $store.state.config.webConfig.friend_links.length"
              class="link">
          <el-dropdown placement="top-end"
                       trigger="hover"
                       @command="handleCommand">
            <span class="link">
              友情链接
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(link,index ) in $store.state.config.webConfig.friend_links"
                                :key="index"
                                :command="link.value">{{ link.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span v-if="$store.state.config.webConfig.help_url"
              @click="handleCommand($store.state.config.webConfig.help_url)"
              class="link"> | 帮助文档</span>
      </p>
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
  font-size: 14px;
  height: 60px;
  margin: 0 auto;
  background: white;
  color: #999999;
  border-top: 1px solid #f2f2f2;
  padding: 0 10%;
  box-sizing: border-box;
  .content {
    margin: 0 auto;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .link {
      cursor: pointer;
      color: #999999;
    }
  }
}
</style>
