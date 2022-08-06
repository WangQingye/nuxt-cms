<template>
  <div :class="['header', isHomePage && !showSearch ? '':'header-hover']" v-show="!isSearchPage">
    <div :class="['header-top', showHeaderTop ? 'header-top-show':'header-top-hide']">
      <div>
        <NuxtLink v-for="(link,index) in headerLinksLeft" class="link" :key="index" :to="link.link">{{link.title}}<span v-show="index != headerLinksLeft.length - 1" > ·</span></NuxtLink>
      </div>
      <div>
        <NuxtLink v-for="(link,index) in headerLinksRight" class="link" :key="index" :to="link.link">{{link.title}}<span v-show="index != headerLinksRight.length - 1"> ·</span></NuxtLink>
      </div>
    </div>
    <div class="header-bottom">
      <img class="header-logo header-logo1" v-if="isHomePage" :src="$store.state.config.webConfig.logo2|cloudImage" alt="logo" @click="$router.push('/')">
      <img class="header-logo header-logo2" v-if="isHomePage" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo" @click="$router.push('/')">
      <img class="header-logo" v-if="!isHomePage" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo" @click="$router.push('/')">
      <div class="header-right">
        <div class="header-tabs">
          <template v-for="tab in menuList">
            <NuxtLink class="tab tab-link" :key="tab.id" v-if="tab.event_type == 'navigationTo'" @click="$router.push(tab.event_link)" :to="tab.event_link">
              {{tab.name}}
            </NuxtLink>
            <el-popover v-else placement="bottom" :ref="`popover${tab.id}`" trigger="hover" :key="tab.id">
              <div>
                <div :class="['tab-container', tab.children.length == 1 ? 'tab-container-single' : '']" v-for="tabChild in tab.children" :key="tabChild.name">
                  <span v-show="tabChild.name" class="tab-title">
                    <i class="el-icon-date" style="margin-right: 5px"></i>
                    {{tabChild.name}}
                  </span>
                  <NuxtLink class="tab-link" v-for="child in tabChild.children" :key="child.url" @click="handleClick(tab, child)" :to="getLinkHref(child)" :title="child.name">{{child.name}}</NuxtLink>
                </div>
              </div>
                <span class="tab" slot="reference">{{tab.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            </el-popover>
          </template>
          <i class="el-icon-search search-icon" @click="showSearch = !showSearch"></i>
        </div>
        <el-dropdown placement="bottom-start" v-if="user.id">
          <span class="el-dropdown-link">
            <el-avatar :size="36" :src="user.avatar|cloudImage"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="header-dropdown">
              <div class="user-info">
                <p class="nickname">{{ user.nickname }}</p>
                <p class="user-type">{{ $store.state.user.userType[user.cate] }}</p>
              </div>
              <div class="option" @click="$utils.goLink(userCenter)">
                <i class="el-icon-user"></i>
                <p class="option-text">个人中心</p>
              </div>
              <div class="option" @click="handleLogout">
                <i class="el-icon-circle-close"></i>
                <p class="option-text">退出登录</p>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="login-button" type="primary" round @click="handleUlogin" v-else>用户登录</el-button>
      </div>
    </div>
    <transition name="search">
      <div class="search-container" v-show="showSearch" @click="showSearch = false">
        <div class="search" @click.stop="">
          <el-input placeholder="输入关键词进行搜索..." v-model="searchText">
          </el-input>
          <el-button class="button" type="primary" icon="el-icon-search" @click="clickSearch">搜 索</el-button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  headerLinksLeft,
  headerLinksRight,
  userCenter,
  tokenName,
} from '@/config'
export default {
  name: 'Header',
  // mixins: [authorizeMixin],
  data() {
    return {
      headerLinksLeft,
      headerLinksRight,
      userCenter,
      activeName: 'home',
      showHeaderTop: true,
      searchText: '',
      showSearch: false,
      isHomePage: false,
      isSearchPage: false,
    }
  },
  computed: {
    menuList() {
      return this.$store.state.config.menuList
    },
    user() {
      return this.$store.state.user.user
    },
  },
  mounted() {
    if (process.browser) {
      window.onscroll = () => {
        if (window.pageYOffset > 40) {
          this.showHeaderTop = false
        } else {
          if (this.isHomePage) this.showHeaderTop = true
        }
      }
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    getLinkHref(child) {
      let c
      // 如果有下一级，那么默认跳到下一级的第一个选项
      if (child.children && child.children.length) {
        c = child.children[0]
      } else {
        c = child
      }
      let title = c.name
      let ids = this.$utils.findMenuIdsByTitle(
        this.$store.state.config.menuList,
        title
      )
      let item = this.$utils.findMenuItemByTitle(
        this.$store.state.config.menuList,
        title
      )
      let subPage = this.$utils.typeToPages[item.event_type]
      if (subPage) {
        return `/content/${subPage}?menuIds=${ids}&params=${item.event_link}&singlePage=1`
      } else {
        return '#'
      }
    },
    handleClick(tab, child) {
      console.log(tab)
      let c
      // 如果有下一级，那么默认跳到下一级的第一个选项
      if (child.children && child.children.length) {
        c = child.children[0]
      } else {
        c = child
      }
      let title = c.name
      let ids = this.$utils.findMenuIdsByTitle(
        this.$store.state.config.menuList,
        title
      )
      let item = this.$utils.findMenuItemByTitle(
        this.$store.state.config.menuList,
        title
      )
      let subPage = this.$utils.typeToPages[item.event_type]
      if (!subPage) {
        this.$message.error('未找到菜单地址，请检查配置')
        return
        // throw new Error('未找到菜单地址，请检查配置')
      }
      this.$router.push(
        `/content/${subPage}?menuIds=${ids}&params=${item.event_link}&singlePage=1`
      )
    },
    async handleUlogin() {
      let callback = window.location.href
      const { authorize_url } = await this.$api.user.AuthorizeCode({ callback })
      if (authorize_url) {
        localStorage.removeItem(tokenName)
        window.location.href = authorize_url
      }
    },
    async handleLogout() {
      await this.logout()
      await this.$router.push('/')
    },
    close() {
      window.close()
    },
    clickSearch() {
      this.showSearch = false
      this.$router.push(`/search?text=${this.searchText}`)
    },
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler: function (val) {
        this.isHomePage = val == 'index-home'
        this.isSearchPage = val == 'index-search'
        this.showHeaderTop = val == 'index-home'
        this.menuList.forEach(tab => {
          console.log(this.$refs[`popover${tab.id}`])
          this.$refs[`popover${tab.id}`] && this.$refs[`popover${tab.id}`].length && this.$refs[`popover${tab.id}`][0].doClose()
        });
      },
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 1400px;
  z-index: 4;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.1);
  .header-top {
    height: 39px;
    font-size: 12px;
    padding: 0 10%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    transition: all 0.2s ease-in-out;
    .link {
      // transition: all 0.2s ease-in-out;
      text-decoration: none;
      color: white;
    }
    .link:hover {
      color: $--color-primary;
      cursor: pointer;
    }
  }

  .header-bottom {
    height: 80px;
    padding: 0 10%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
    z-index: 2;
    transition: all 0.2s ease-in-out;
    .header-logo {
      height: 38px;
      z-index: 2;
      cursor: pointer;
    }
    .header-logo1 {
      display: block;
    }
    .header-logo2 {
      display: none;
    }

    .header-right {
      display: flex;
      align-items: center;

      .header-tabs {
        height: 80px;
        position: relative;
        z-index: 2;
        .tab {
          width: 80px;
          // padding: 0 20px;
          margin: 0 16px;
          cursor: pointer;
          font-size: 15px;
          text-align: center;
          display: inline-block;
          color: white;
          text-decoration: none;
          &:hover {
            color: $--color-primary !important;
          }
        }
        .search-icon {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          line-height: 80px;
          margin-right: 10px;
          margin-left: 20px;
        }
      }
      ::v-deep .el-dropdown {
        margin-left: -40px;
        margin-right: -60px;
        position: relative;
        z-index: 1;
      }
      .el-dropdown-link {
        z-index: 2;
        height: 80px;
        margin: 0 60px;
        color: white;
        display: flex;
        align-items: center;
      }

      .login-button {
        z-index: 2;
        width: 120px;
        text-align: center;
        cursor: pointer;
        height: 40px;
        margin-left: 15px;
      }
    }
  }
  .search-container {
    height: 100vh;
    padding: 0 10%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    .search {
      border-top: 1px solid #e8eaed;
      width: 100%;
      height: 200px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 100px;
      box-sizing: border-box;
      border-radius: 0 0 4px 4px;
      .button {
        width: 200px;
        height: 70px;
        border-radius: 0 4px 4px 0;
        font-size: 18px;
      }
      ::v-deep .el-input__inner {
        height: 70px;
        line-height: 70px;
        border-radius: 4px 0 0 4px;
        border-right: none;
        font-size: 18px;
      }
    }
  }
}
.header:hover,
.header-hover {
  backdrop-filter: blur(0px);
  .header-top,
  .header-bottom {
    backdrop-filter: blur(0px);
    background-color: rgba(255, 255, 255, 0.9);
    color: #4d4d4d;
    border-bottom: none;
    backdrop-filter: blur(0px);
  }
  .header-top {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .link {
      color: #4d4d4d;
    }
    .link:hover {
      color: $--color-primary;
      cursor: pointer;
    }
  }

  .header-bottom {
    .header-logo1 {
      display: none;
    }
    .header-logo2 {
      display: block;
    }
    .header-tabs {
      .tab {
        color: #4d4d4d !important;
        text-align: center;
        &:hover {
          color: $--color-primary !important;
        }
      }
    }
    .el-dropdown-link {
      color: #4d4d4d;
    }
  }
  .search-container {
    backdrop-filter: blur(0px);
  }
}

.header-top-show {
  animation: mymove1 0.2s ease-in-out;
  height: 40px;
  opacity: 1;
  @keyframes mymove1 {
    0% {
      height: 0px;
    }
    100% {
      height: 40px;
    }
  }
}
.header-top-hide {
  animation: mymove 0.2s ease-in-out;
  height: 0px !important;
  border: none;
  opacity: 0;
  border-bottom: none !important;
  @keyframes mymove {
    0% {
      height: 40px;
    }
    100% {
      height: 0px;
    }
  }
}
.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease-in-out;
}
.search-enter,
.search-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
<style lang="scss">
.el-popover__reference-wrapper {
  text-align: center;
}
.header-dropdown {
  width: 160px;

  .user-info {
    width: 100px;
    padding: 0 15px;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;
    margin-bottom: 6px;

    .nickname {
      font-size: 16px;
      color: #1a1a1a;
      margin-top: 6px;
      margin-bottom: 12px;
    }

    .user-type {
      color: $--color-primary;
      font-size: 14px;
      margin-bottom: 12px;
    }
  }

  .option {
    width: 160px;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #f7f2f2;
    }

    .option-text {
      margin-left: 20px;
    }
  }
}
.tab-container {
  width: 120px;
  // margin: 0 auto;
  vertical-align: top;
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  .tab-title {
    color: #1a1a1a;
    font-weight: bold;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 10px;
    line-height: 34px;
  }
  .tab-link {
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: #1a1a1a;
    // background-color:
  }
  .tab-link:hover {
    background-color: $--color-primary-light;
    border-radius: 4px;
  }
}
.tab-container-single {
  width: 150px;
}
.tab-container:last-child {
  margin-right: 0px;
}
</style>
