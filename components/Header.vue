<template>
  <div :class="['header', isHomePage && !showSearch ? '':'header-hover']">
    <div :class="['header-top', showHeaderTop ? 'header-top-show':'header-top-hide']">
      <div>
        <span class="link">OA入口</span>
        ·
        <span class="link">常见问题</span>
        ·
        <span class="link">用户指南</span>
        ·
        <span class="link">成绩查询</span>
      </div>
      <div>
        <span class="link">旧版网站</span>
        ·
        <span class="link">内容搜索</span>
      </div>
    </div>
    <div class="header-bottom">
      <img class="header-logo header-logo1" v-if="isHomePage" :src="logo1" alt="logo" @click="$router.push('/')">
      <img class="header-logo header-logo2" v-if="isHomePage" :src="logo2" alt="logo" @click="$router.push('/')">
      <img class="header-logo" v-if="!isHomePage" :src="logo2" alt="logo" @click="$router.push('/')">
      <div class="header-right">
        <div class="header-tabs">
          <template v-for="tab in menuList">
            <p class="tab" :key="tab.id" v-if="tab.event_type == 'navigationTo'" @click="$router.push(tab.event_link)">
              {{tab.name}}
            </p>
            <el-popover v-else placement="bottom" trigger="hover" :key="tab.id">
              <div>
                <!-- popover最小宽度150 -->
                <div :class="['tab-container', tab.children.length == 1 ? 'tab-container-single' : '']" v-for="tabChild in tab.children" :key="tabChild.name">
                  <p v-show="tabChild.name" class="tab-title">
                    <i class="el-icon-date" style="margin-right: 5px"></i>
                    {{tabChild.name}}
                  </p>
                  <p class="tab-link" v-for="child in tabChild.children" :key="child.url" @click="handleClick(tab, child)">{{child.name}}</p>
                </div>
              </div>
              <span slot="reference" class="tab">
                <span class="tab">{{tab.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              </span>
            </el-popover>
          </template>
          <i class="el-icon-search search-icon" @click="showSearch = !showSearch"></i>
        </div>
        <el-dropdown placement="bottom-start" v-if="isLogin">
          <span class="el-dropdown-link">
            <el-avatar :size="36" :src="user.avatar|cloudImage"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div class="header-dropdown">
              <div class="user-info">
                <p class="nickname">{{ user.nickname }}</p>
                <p class="user-type">学生用户</p>
              </div>
              <div class="option" @click="$router.push('/user/main')">
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
// import { AuthorizeCode } from '@/api/user'
// import { authorizeMixin } from '@/mixins/authorize'

import logo1 from '~/static/imgs/home/logo_01@2x.png'
import logo2 from '~/static/imgs/home/logo_02@2x.png'
export default {
  name: 'Header',
  // mixins: [authorizeMixin],
  data() {
    return {
      logo1,
      logo2,
      activeName: 'home',
      isLogin: false,
      showHeaderTop: true,
      searchText: '',
      showSearch: false,
      isHomePage: false,
    }
  },
  computed: {
    menuList() {
      return this.$store.state.config.menuList
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
    // ...mapActions({
    //   logout: 'user/logout',
    // }),
    handleClick(tab, child) {
      let c
      // 如果有下一级，那么默认跳到下一级的第一个选项
      if (child.children && child.children.length) {
        c = child.children[0]
      } else {
        c = child
      }
      let subPage = this.$utils.typeToPages[c.type]
      this.$router.push(
        `/content/${subPage}?menuId=${tab.menuId}&subMenuId=${c.menuId}`
      )
      return
    },
    async handleUlogin() {
      // let callback = window.location.href
      // const {
      //   data: { authorize_url },
      // } = await AuthorizeCode({ callback })
      // window.location.href = authorize_url
    },
    async handleLogout() {
      // await this.logout()
      // await this.$router.push('/')
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
        console.log(val)
        this.isHomePage = val == 'index-home'
        this.showHeaderTop = val == 'index-home'
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
        .tab {
          width: auto;
          // padding: 0 20px;
          margin: 0 20px;
          cursor: pointer;
          font-size: 15px;
          text-align: center;
          display: inline-block;
          color: white;
        }
        .search-icon {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          line-height: 80px;
          margin-right: 20px;
        }
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
        margin-left: 25px;
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
    background-color: white;
    color: #4d4d4d;
    border-bottom: none;
    backdrop-filter: blur(0px);
  }
  .header-top {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
