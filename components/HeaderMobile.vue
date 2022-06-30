<template>
  <div :class="['mobile-header', isHomePage ? 'home-header' : '']">
    <img class="header-logo" v-if="isHomePage" :src="logo1" @click="$router.push('/mobile/home')" alt="logo">
    <img class="header-logo" @click="$router.push('/mobile/home')" v-else :src="logo2" />
    <i class="el-icon-s-fold icon" @click="drawerVisible = true" />
    <el-drawer title="我是标题" :visible.sync="drawerVisible" :with-header="false" append-to-body size="3.08rem">
      <div class="mobile-menu">
        <div class="top-container">
          <div class="top">
            <el-button style="width: 1.64rem" type="primary">用户登录</el-button>
            <i class="el-icon-close close" @click="drawerVisible = false"></i>
          </div>
          <el-input prefix-icon="el-icon-search" placeholder="搜索" v-model="searchText" @keyup.enter.native="goSearch"></el-input>
        </div>
        <el-menu class="main-menu" @select="onMenuSelect">
          <template v-for="item in menuList">
            <!-- 一级 -->
            <el-submenu v-if="item.children && item.children.length" :index="String(item.id)" :key="item.id">
              <template slot="title">
                <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold; margin-left: -20px;">
                  <i class="circle"></i>
                  <span class="first-title">{{item.name}}</span>
                </div>
              </template>
              <template v-for="subItem in item.children">
                <!-- 二级 -->
                <el-submenu v-if="subItem.children && subItem.children.length" :index="String(subItem.id)" :key="subItem.id">
                  <template slot="title">
                    <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold; margin-left: -12px;">
                      <i class="el-icon-location"></i>
                      <span class="second-title">{{subItem.name}}</span>
                    </div>
                  </template>
                  <template v-for="thirdItem in subItem.children">
                    <template v-if="thirdItem.children && thirdItem.children.length">
                      <el-menu-item v-for="fourthItem in thirdItem.children" :index="String(fourthItem.id)" :key="fourthItem.id">
                        <template slot="title">
                          <div class="item-line">
                            <span class="third-title">{{fourthItem.name}}</span>
                          </div>
                        </template>
                      </el-menu-item>
                    </template>
                    <el-menu-item v-else :index="String(thirdItem.id)" :key="thirdItem.id">
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
                <el-menu-item v-else :index="String(subItem.id)" :key="subItem.id">
                  <div class="item-line">
                    <span>{{subItem.name}}</span>
                    <el-tag class="tag" type="primary" v-if="subItem.num">
                      {{subItem.num}}
                    </el-tag>
                  </div>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        <div class="links">
          <div class="link" v-for="i in 3" :key="i">
            <span class="text-container"><i class="circle"></i><span class="text">OA入口
              </span></span>
            <i class="el-icon-arrow-right icon"></i>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import logo1 from '~/static/imgs/home/logo_01@2x.png'
import logo2 from '~/static/imgs/home/logo_02@2x.png'
export default {
  name: 'MobileHeader',
  // mixins: [authorizeMixin],
  data() {
    return {
      logo1,
      logo2,
      drawerVisible: false,
      searchText: '',
    }
  },
  mounted() {},
  methods: {
    onMenuSelect(subMenuId, indexPath) {
      let topMenuId = indexPath[0]
      let subItem = this.$utils.getSubMenuItem(
        this.menuList.find((m) => m.id == topMenuId),
        subMenuId
      )
      let subPage = this.$utils.typeToPages[subItem.event_type]
      this.drawerVisible = false
      this.$router.push(
        `/mobile/content/${subPage}?menuIds=${indexPath.join(',')}`
      )
    },
    goSearch() {
      this.drawerVisible = false
      this.$router.push(`/mobile/search?text=${this.searchText}`)
    },
  },
  computed: {
    menuList() {
      return this.$store.state.config.menuList
    },
    isHomePage() {
      return this.$route.name == 'mobile-home'
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
    font-size: 0.21rem;
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
  }
  .el-menu {
    border: none;
    color: #999;
    .first-title {
      font-size: 0.14rem;
      color: #999;
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