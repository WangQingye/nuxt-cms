<template>
  <div :class="['header', isHomePage ? '':'header-hover']">
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
        <span class="link">English</span>
        ·
        <span class="link">内容搜索</span>
      </div>
    </div>
    <div class="header-bottom">
      <img class="header-logo" v-if="$store.state.config.webConfig.site_front_logo" :src="$store.state.config.webConfig.site_front_logo|cloudImage" alt="logo">
      <img class="header-logo" v-else src="https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7" alt="">
      <div class="header-right">
        <div class="header-tabs">
          <el-popover placement="bottom" trigger="hover" v-for="(tab,index) in tabList" :key="index">
            <div>
              <!-- popover最小宽度150 -->
              <div :class="['tab-container', tab.children.length == 1 ? 'tab-container-single' : '']" v-for="tabChild in tab.children" :key="tabChild.name">
                <p v-show="tabChild.name" class="tab-title">
                  <i class="el-icon-date" style="margin-right: 5px"></i>
                  {{tabChild.name}}
                </p>
                <p class="tab-link" v-for="child in tabChild.children" :key="child.url">{{child.name}}</p>
              </div>
            </div>
            <span slot="reference" class="tab">
              <span class="tab">{{tab.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            </span>
          </el-popover>
          <i class="el-icon-search search-icon" @click="showSearch = !showSearch"></i>
        </div>
        <!-- <el-tabs class="header-tabs" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane name="home">
            <p class="tab" slot="label">首页</p>
          </el-tab-pane>
          <el-tab-pane name="news">
            <p class="tab" slot="label">中心新闻</p>
          </el-tab-pane>
          <el-tab-pane name="models">
            <p class="tab" slot="label">资料库</p>
          </el-tab-pane>
          <el-tab-pane name="production">
            <p class="tab" slot="label">预约制造</p>
          </el-tab-pane>
        </el-tabs> -->
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
      <div class="search" v-show="showSearch">
        <div class="search-container">
          <el-input placeholder="输入关键词进行搜索..." v-model="searchText">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="clickSearch">搜索</el-button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
// import { AuthorizeCode } from '@/api/user'
// import { authorizeMixin } from '@/mixins/authorize'
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  // mixins: [authorizeMixin],
  data() {
    return {
      activeName: 'home',
      isLogin: false,
      showHeaderTop: true,
      tabList: [
        {
          name: '人才培养',
          children: [
            {
              children: [
                {
                  name: '课程体系',
                  url: '16',
                },
              ],
            },
          ],
        },
        {
          name: '人才培养',
          children: [
            {
              children: [
                {
                  name: '课程体系',
                  url: '11',
                },
                {
                  name: '课程体系1',
                  url: '13',
                },
                {
                  name: '课程体系3',
                  url: '15',
                },
              ],
            },
            {
              children: [
                {
                  name: '课程体系4',
                  url: '1',
                },
                {
                  name: '课程体系5',
                  url: '12',
                },
                {
                  name: '课程体系6',
                  url: '13',
                },
              ],
            },
          ],
        },
        {
          name: '中心概况',
          children: [
            {
              name: '教育教学2',
              children: [
                {
                  name: '课程体系',
                  url: '2',
                },
              ],
            },
            {
              name: '教育教学3',
              children: [
                {
                  name: '课程体系',
                  url: '3',
                },
              ],
            },
            {
              name: '教育教学4',
              children: [
                {
                  name: '课程体系',
                  url: '4',
                },
              ],
            },
            {
              name: '教育教学',
              children: [
                {
                  name: '课程体系',
                  url: '21',
                },
                {
                  name: '课程体系1',
                  url: '34',
                },
              ],
            },
          ],
        },
      ],
      searchText: '',
      showSearch: false,
      isHomePage: false
    }
  },
  // computed: {
  //   ...mapGetters({
  //     isLogin: 'user/isLogin',
  //     user: 'user/user',
  //   }),
  // },
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
    handleClick(tab) {
      this.$router.push(`/${tab.name}`)
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
      this.showSearch = false;
      this.$router.push(`/search?text=${this.searchText}`);
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
  .header-top {
    height: 39px;
    padding: 0 5%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    .link:hover {
      text-decoration: underline;
      cursor: pointer;
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
    height: 0px;
    border: none;
    opacity: 0;
    @keyframes mymove {
      0% {
        height: 40px;
      }
      100% {
        height: 0px;
      }
    }
  }

  .header-bottom {
    height: 80px;
    padding: 0 5%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    color: white;
    position: relative;
    z-index: 2;
    .header-logo {
      height: 50px;
      z-index: 2;
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
  .search {
    height: 150px;
    padding: 0 5%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    .search-container {
      border-top: 1px solid #e8eaed;
      width: 100%;
      height: 150px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 100px;
      box-sizing: border-box;
      border-radius: 0 0 4px 4px;
    }
  }
}
.header:hover, .header-hover {
  .header-top,
  .header-bottom {
    background-color: white;
    backdrop-filter: blur(0px);
    color: #4d4d4d;
  }
  .header-top {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .header-bottom {
    .header-tabs {
      .tab {
        color: #4d4d4d !important;
      }
    }
    .el-dropdown-link {
      color: #4d4d4d;
    }
  }
}
.search-enter-active, .search-leave-active {
  transition: all .3s ease-in-out;
}
.search-enter, .search-leave-to {
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
