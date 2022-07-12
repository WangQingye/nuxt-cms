<template>
  <div class='footer'>
    <div class='content'>
      <p>
        <span v-if="$store.state.config.webConfig.copyright">
          {{ $store.state.config.webConfig.copyright }}
        </span>
        <span v-if="$store.state.config.webConfig.beian">
          | {{ $store.state.config.webConfig.beian }}
        </span>
      </p>
      <p>
        <span v-for="(link,index) in footerLinksRight" class="link" :key="index" @click="$utils.goLink(link.link)">{{link.title}} <span v-show="index != footerLinksRight.length - 1"> | </span></span>
      </p>
    </div>
  </div>
</template>
<script>
import { footerLinksRight } from '@/config'
export default {
  data() {
    return {
      footerLinksRight
    }
  },
  methods: {
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
      &:hover {
        color: $--color-primary;
      }
    }
  }
}
</style>
