 <template>
  <div class='content-container' v-if="menuItem.name">
    <div class="header">
      <img class="header-logo" :src="$store.state.config.webConfig.logo|cloudImage" alt="logo" @click="$router.push('/')">
      <p>当前为预览状态，仅供预览确认资料效果。</p>
    </div>
    <div class="top" :style="`background-image: url(${contentTitleImg})`">
      <p class="top-title">{{$route.path.indexOf('person') > -1 ? "人员信息预览" : "新闻预览"}}</p>
    </div>
    <section class='content'>
      <div class='left'>
        <el-menu :default-openeds="defaultOpen">
          <template v-for="item in menuItem.children">
            <!-- 一级 -->
            <el-submenu v-if="item.children && item.children.length" :index="String(item.id)" :key="item.id">
              <template slot="title">
                <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold">
                  <img v-if="item.icon" class="icon" style="width: 20px;height: 20px;margin-right:8px" :src="item.icon|cloudImage" alt="icon">
                  <i v-else style="font-weight:bold" class="el-icon-tickets"></i>
                  <a>{{item.name}}</a>
                </div>
              </template>
              <template v-for="subItem in item.children">
                <!-- 二级 -->
                <el-submenu v-if="subItem.children && subItem.children.length" :index="String(subItem.id)" :key="subItem.id">
                  <template slot="title">
                    <a style="padding-left:12px;">{{subItem.name}}</a>
                  </template>
                  <el-menu-item v-for="thirdItem in subItem.children" :index="String(thirdItem.id)" :key="thirdItem.id">
                    <template slot="title">
                      <div class="item-line">
                        <a>{{thirdItem.name}}</a>
                        <el-tag class="tag" type="primary" v-if="thirdItem.num">
                          {{thirdItem.num}}
                        </el-tag>
                      </div>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="String(subItem.id)" :key="subItem.id">
                  <div class="item-line">
                    <a>{{subItem.name}}</a>
                    <el-tag class="tag" type="primary" v-if="subItem.num">
                      {{subItem.num}}
                    </el-tag>
                  </div>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <nuxt-child class="right"></nuxt-child>
    </section>
    <Footer />
  </div>
</template>
<script>
import img from '~/static/imgs/home/topbg@2x.jpg'
export default {
  data() {
    return {
      menuId: '',
      menuItem: {
        name: '人员信息预览',
        children: [
          {
            name: '中心概况',
            id: 1,
            children: [
              {
                name: '中心简介',
                id: 2,
              },
              {
                name: '中心领导',
                id: 3,
              },
              {
                name: '业务部门',
                id: 4,
              },
              {
                name: '信息公开',
                id: 5,
              },
            ],
          },
          {
            name: '中心动态',
            id: 7,
            children: [
              {
                name: '中心要闻',
                id: 8,
              },
              {
                name: '通知公告',
                id: 9,
              }
            ],
          },
        ],
      },
      subMenuItem: {},
      contentTitleImg: img,
      menuActiveNames: ['news', 'equipment'],
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
      context.redirect('/error?msg=请用电脑端打开此页面')
    }
    await context.app.$utils.getInitData(context)
  },
  computed: {
    defaultOpen() {
      let arr = []
      this.menuItem.children.forEach((m) => {
        arr.push(String(m.id))
        m.children.forEach((mc) => {
          // 子菜单也自动打开
          if (mc.children) {
            arr.push(String(mc.id))
          }
        })
      })
      return arr
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {},
  watch: {
    '$route.query.params': function (val) {
      window.scrollTo(0, 0)
    },
  },
}
</script>
<style scoped lang='scss'>
.content-container {
  min-height: 100vh;
  padding-top: 80px;
  .header {
    height: 80px;
    padding: 0 10%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    z-index: 2;
    position: fixed;
    color: #4d4d4d;
    top: 0;
    left: 0;
    font-size: 14px;
    width: 100%;
    .header-logo {
      height: 38px;
      z-index: 2;
      cursor: pointer;
    }
  }
  .top {
    width: 100%;
    height: 250px;
    padding: 0 10%;
    box-sizing: border-box;
    padding-top: 170px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-top: -80px;
    .top-title {
      font-size: 36px;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  .content {
    @include flex-between(flex-start);
    justify-content: space-between;
    min-height: calc(100vh - 380px);
    padding: 0 10%;
    padding-top: 20px;
    padding-bottom: 60px;
    background-color: white;
    .left {
      width: 240px;
      min-width: 180px;
      margin-right: 5%;
      ::v-deep .el-menu {
        border-right: none;
        .el-menu-item,
        .el-submenu__title {
          font-size: 15px !important;
        }
      }
      .item-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 12px;
        .menu-item-text {
          font-weight: 400;
          color: #4d4d4d;
        }
        .tag {
          height: 24px;
          border: none;
          line-height: 24px;
          text-align: center;
          font-weight: bold;
        }
      }
    }
    .right {
      width: 100%;
      flex: 1;
      // max-width: 1080px;
    }
  }
}
</style>
