<template>
  <div :class="['mobile-header', (isHomePage && !scrolled) ? 'home-header' : '']">
    <img class="header-logo"
      v-if="(isHomePage && !scrolled)"
      :src="$store.state.config.webConfig.logo2|cloudImage"
      @click="$router.push('/mobile/home')"
      alt="logo">
    <img class="header-logo"
      @click="$router.push('/mobile/home')"
      v-else
      :src="$store.state.config.webConfig.logo|cloudImage" />
    <img v-if="(isHomePage && !scrolled)" src="@/static/imgs/mobile-menu1.png"
      class="icon"
      @click="drawerVisible = true" />
    <img v-else src="@/static/imgs/mobile-menu.png"
      class="icon"
      @click="drawerVisible = true" />
    <el-drawer title="我是标题"
      :visible.sync="drawerVisible"
      :with-header="false"
      append-to-body
      size="3.08rem">
      <div class="mobile-menu">
        <div class="top-container">
          <div class="top">
            <div class="user"
              v-if="user.id"
              @click="$utils.goLink(userCenter)">
              <el-avatar :src="user.avatar|cloudImage"></el-avatar>
              <span class="name">{{user.nickname}}</span>
              <i class="el-icon-arrow-right icon"></i>
            </div>
            <el-button style="width: 1.64rem"
              type="primary"
              v-else
              @click="handleUlogin">用户登录</el-button>
            <i class="el-icon-close close"
              @click="drawerVisible = false"></i>
          </div>
          <el-input prefix-icon="el-icon-search"
            placeholder="搜索"
            v-model="searchText"
            @keyup.enter.native="goSearch"></el-input>
        </div>
        <el-menu class="main-menu"
          @select="onMenuSelect">
          <template v-for="item in menuList">
            <el-menu-item v-if="item.event_type == 'navigationTo'"
              :key="item.id"
              :index="String(item.id)">
              <template slot="title">
                <div class="single-link">
                  <i class="circle"></i>
                  <span style="font-size:0.14rem; font-weight: bold;margin-left:0.05rem">{{item.name}}</span>
                </div>
              </template>
            </el-menu-item>
            <!-- 一级 -->
            <el-submenu v-if="item.children && item.children.length"
              :index="String(item.id)"
              :key="item.id">
              <template slot="title">
                <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold; margin-left: -20px;">
                  <i class="circle"></i>
                  <span class="first-title">{{item.name}}</span>
                </div>
              </template>
              <template v-for="subItem in item.children">
                <!-- 二级 -->
                <el-submenu v-if="subItem.children && subItem.children.length"
                  :index="String(subItem.id)"
                  :key="subItem.id">
                  <template slot="title">
                    <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold; margin-left: -12px;">
                      <!-- <i class="el-icon-location"></i> -->
                      <img class="icon"
                        v-if="subItem.icon"
                        :src="subItem.icon|cloudImage"
                        alt="icon">
                      <i v-else
                        style="font-size:0.16rem"
                        class="el-icon-tickets"></i>
                      <span class="second-title">{{subItem.name}}</span>
                    </div>
                  </template>
                  <template v-for="thirdItem in subItem.children">
                    <template v-if="thirdItem.children && thirdItem.children.length">
                      <el-menu-item v-for="fourthItem in thirdItem.children"
                        :index="String(fourthItem.id)"
                        :key="fourthItem.id">
                        <template slot="title">
                          <div class="item-line">
                            <span class="third-title">{{fourthItem.name}}</span>
                          </div>
                        </template>
                      </el-menu-item>
                    </template>
                    <el-menu-item v-else
                      :index="String(thirdItem.id)"
                      :key="thirdItem.id">
                      <template slot="title">
                        <div class="item-line">
                          <span class="third-title">{{thirdItem.name}}</span>
                        </div>
                      </template>
                    </el-menu-item>
                  </template>
                  <!-- <el-menu-item v-for="thirdItem in subItem.children" :index="thirdItem.menuId" :key="thirdItem.menuId">
                    <template slot="title">
                      <div class="item-line">
                        <span class="third-title">{{thirdItem.title}}</span>
                      </div>
                    </template>
                  </el-menu-item> -->
                </el-submenu>
                <el-menu-item v-else
                  :index="String(subItem.id)"
                  :key="subItem.id">
                  <div class="item-line">
                    <span>{{subItem.name}}</span>
                    <el-tag class="tag"
                      type="primary"
                      v-if="subItem.num">
                      {{subItem.num}}
                    </el-tag>
                  </div>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <div class="links">
          <div class="link"
            v-for="(link,index) in footerLinksRight"
            :key="index"
            @click="$utils.goLink(link.link)">
            <span class="text-container"><i class="circle"></i><span class="text">{{link.title}}
              </span></span>
            <i class="el-icon-arrow-right icon"></i>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { userCenter, footerLinksRight, tokenName } from '@/config'
export default {
  name: 'MobileHeader',
  // mixins: [authorizeMixin],
  data() {
    return {
      footerLinksRight,
      userCenter,
      drawerVisible: false,
      searchText: '',
      scrolled: false,
    }
  },
  mounted() {
    if (process.browser) {
      window.onscroll = () => {
        if (window.pageYOffset > 10) {
          this.scrolled = true
        } else {
          if (this.isHomePage) this.scrolled = false
        }
      }
    }
  },
  methods: {
    onMenuSelect(subMenuId, indexPath) {
      let topMenuId = indexPath[0]
      let topItem = this.menuList.find((m) => m.id == topMenuId)
      if (topItem.event_type == 'navigationTo') {
        this.$router.push(topItem.event_link)
      } else {
        let subItem = this.$utils.getSubMenuItem(topItem, subMenuId)
        let subPage = this.$utils.typeToPages[subItem.event_type]
        if (!subPage) {
          this.$message.error('未找到菜单地址，请检查配置')
          return
        }
        this.$router.push(
          `/mobile/content/${subPage}?menuIds=${indexPath.join(',')}&params=${
            subItem.event_link
          }&singlePage=1`
        )
      }
      this.drawerVisible = false
    },
    goSearch() {
      this.drawerVisible = false
      this.$router.push(`/mobile/search?text=${this.searchText}`)
    },
    async handleUlogin() {
      let callback = window.location.href
      const { authorize_url } = await this.$api.user.AuthorizeCode({ callback })      
      if (authorize_url) {
        localStorage.removeItem(tokenName)
        window.location.href = authorize_url
      }
    },
  },
  computed: {
    menuList() {
      return this.$store.state.config.menuList
    },
    isHomePage() {
      return this.$route.name == 'mobile-home'
    },
    user() {
      return this.$store.state.user.user
    },
  },
  watch: {
    // '$route.name': {
    //   immediate: true,
    //   handler: function (val) {
    //     console.log(val)
    //     this.isHomePage = val == 'mobile-home'
    //   },
    // },
  },
}
</script>

<style scoped lang="scss">
.mobile-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  height: 0.5rem;
  box-sizing: border-box;
  background: white;
  color: #323233;
  @include flex-between;
  padding: 0 0.2rem;
  .header-logo {
    margin: 0;
    height: 0.26rem;
    // width: 1rem;
  }
  .icon {
    width: 0.22rem;
    height: 0.22rem;
  }
}
.home-header {
  background: none;
  color: white;
}
</style>
<style lang="scss">
.mobile-menu {
  padding: 0.3rem;
  box-sizing: border-box;
  .top-container {
    width: 2.48rem;
    border-bottom: 0.01rem solid #ededed;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.14rem;
    margin-bottom: 0.08rem;
    .top {
      @include flex-between;
      margin-bottom: 0.21rem;
      .user {
        @include flex-between;
        color: #4d4d4d;
        .name {
          font-size: 0.12rem;
          font-weight: 500;
          margin: 0 0.06rem 0 0.1rem;
        }
        .icon {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      .close {
        font-size: 0.15rem;
        width: 0.31rem;
        height: 0.31rem;
        line-height: 0.31rem;
        text-align: center;
        background: $--color-primary-light;
        border-radius: 0.03rem;
        font-weight: bold;
        color: #b3b3b3;
      }
    }
    .el-input__inner {
      background: $--color-primary-light;
    }
  }
  .links {
    margin-top: 0.9rem;
    border-top: 0.01rem solid #ededed;
    padding-top: 0.24rem;
    box-sizing: border-box;
    .link {
      @include flex-between;
      margin-bottom: 0.24rem;
      .text-container {
        @include flex-between;
        .circle {
          vertical-align: middle;
          margin-right: 0.1rem;
        }
        .text {
          font-size: 0.14rem;
          font-weight: bold;
          color: #999;
        }
      }
      .icon {
        font-size: 0.12rem;
        color: #999;
      }
    }
  }
  .main-menu {
    width: 2.48rem;
    .single-link {
      height: 0.56rem;
      display: flex;
      align-items: center;
      margin-left: -0.2rem;
      color: #999;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  .el-menu {
    border: none;
    color: #999;
    .first-title {
      font-size: 0.14rem;
      color: #999;
    }
    .icon {
      height: 0.14rem;
      width: 0.14rem;
      margin-right: 0.1rem;
      margin-left: 0.05rem;
    }
    .second-title {
      font-size: 0.12rem;
      color: #999;
    }
    .third-title {
      font-size: 0.12rem;
    }
    .el-submenu__title:hover {
      background: none;
    }
    .el-menu--inline {
      box-sizing: border-box;
      margin-left: 0.08rem;
      border-left: 0.01rem solid #f5f8ff;
      .is-opened .el-menu--inline {
        border-left: 0.01rem solid white;
        margin-left: 0.08rem;
      }
      .el-submenu__title {
        // padding-right: 40px;
      }
    }
    .is-active {
      .first-title {
        color: $--color-primary;
      }
      .second-title {
        font-size: 0.12rem;
        color: #1a1a1a;
      }
      .is-active {
        .is-active {
          background: $--color-primary-light;
          border-radius: 0.03rem;
        }
      }
      .el-submenu__title:hover {
        background: none;
      }
    }
  }
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
}
</style>