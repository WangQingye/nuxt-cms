<template>
  <div :class="['mobile-header', isHomePage ? 'home-header' : '']">
    <img class="header-logo"
      v-if="$store.state.config.webConfig.site_front_logo"
      :src="$store.state.config.webConfig.site_front_logo|cloudImage"
      alt="logo">
    <img class="header-logo"
      v-else
      src="https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7"
      alt="">
    <i class="el-icon-s-fold icon"
      @click="drawerVisible = true" />
    <el-drawer title="我是标题"
      :visible.sync="drawerVisible"
      :with-header="false"
      append-to-body
      size="80%">
      <el-menu :default-openeds="['1','2','1-1','1-2']">
        <template v-for="(item,index) in menuList">
          <!-- 一级 -->
          <el-submenu v-if="item.children && item.children.length"
            :index="item.url"
            :key="item.url">
            <template slot="title">
              <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold">
                <i class="el-icon-location"></i>
                <span>{{item.title}}</span>
              </div>
            </template>
            <template v-for="subItem in item.children">
              <!-- 二级 -->
              <el-submenu v-if="subItem.children && subItem.children.length"
                :index="subItem.url"
                :key="subItem.url">
                <template slot="title">
                  <span>{{subItem.title}}</span>
                </template>
                <el-menu-item v-for="thirdItem in subItem.children"
                  :index="thirdItem.url"
                  :key="thirdItem.url">
                  <template slot="title">
                    <div class="item-line">
                      <span>{{thirdItem.title}}</span>
                      <el-tag class="tag"
                        type="primary"
                        v-if="thirdItem.num">
                        {{thirdItem.num}}
                      </el-tag>
                    </div>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                :index="subItem.url"
                :key="subItem.url">
                <div class="item-line">
                  <span>{{subItem.title}}</span>
                  <el-tag class="tag"
                    type="primary"
                    v-if="subItem.num">
                    {{subItem.num}}
                  </el-tag>
                </div>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else
            :index="item.url"
            :key="index">
            <template slot="title">
              <div class="item-line">
                <span>{{item.title}}</span>
                <el-tag class="tag"
                  type="primary"
                  v-if="item.num">
                  {{item.num}}
                </el-tag>
              </div>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'MobileHeader',
  // mixins: [authorizeMixin],
  data() {
    return {
      drawerVisible: false,
      menuList: [
        {
          title: '菜单1',
          url: '1',
          children: [
            {
              title: '菜单1-1',
              url: '1-1',
              children: [
                {
                  title: '菜单1-1-1',
                  url: '1-1-1',
                  num: 2,
                },
                {
                  title: '菜单1-1-2',
                  url: '1-1-2',
                },
              ],
            },
            {
              title: '菜单1-2',
              url: '1-2',
              children: [
                {
                  title: '菜单1-2-1',
                  url: '1-2-1',
                },
                {
                  title: '菜单1-2-2',
                  url: '1-2-2',
                },
              ],
            },
            {
              title: '菜单1-3',
              url: '1-3',
              num: 2,
            },
          ],
        },
        {
          title: '菜单2',
          url: '2',
          children: [
            {
              title: '菜单2-1',
              url: '2-1',
            },
            {
              title: '菜单2-2',
              url: '2-2',
            },
          ],
        },
      ],
    }
  },
  mounted() {},
  methods: {},
  watch: {
    '$route.name': {
      immediate: true,
      handler: function (val) {
        this.isHomePage = val == 'mobile-home'
      },
    },
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
    max-height: 0.5rem;
    width: 1rem;
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
