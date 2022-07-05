 <template>
  <div class='content-container' v-if="menuItem.name">
    <div class="top" :style="`background-image: url(${contentTitleImg})`">
      <p class="top-title">{{menuItem.name}}</p>
    </div>
    <section class='content'>
      <div class='left'>
        <el-menu :default-openeds="defaultOpen" :default-active="subMenuId" @select="onMenuSelect">
          <template v-for="item in menuItem.children">
            <!-- 一级 -->
            <el-submenu v-if="item.children && item.children.length" :index="String(item.id)" :key="item.id">
              <template slot="title">
                <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
                </div>
              </template>
              <template v-for="subItem in item.children">
                <!-- 二级 -->
                <el-submenu v-if="subItem.children && subItem.children.length" :index="String(subItem.id)" :key="subItem.id">
                  <template slot="title">
                    <span style="padding-left:12px;">{{subItem.name}}</span>
                  </template>
                  <el-menu-item v-for="thirdItem in subItem.children" :index="String(thirdItem.id)" :key="thirdItem.id">
                    <template slot="title">
                      <div class="item-line">
                        <span>{{thirdItem.name}}</span>
                        <el-tag class="tag" type="primary" v-if="thirdItem.num">
                          {{thirdItem.num}}
                        </el-tag>
                      </div>
                    </template>
                  </el-menu-item>
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
            <!-- <el-menu-item v-else :index="String(item.id)" :key="item.id">
              <template slot="title">
                <div class="item-line">
                  <span>{{item.name}}</span>
                  <el-tag class="tag" type="primary" v-if="item.num">
                    {{item.num}}
                  </el-tag>
                </div>
              </template>
            </el-menu-item> -->
          </template>
        </el-menu>
      </div>
      <nuxt-child class="right"></nuxt-child>
    </section>
  </div>
</template>
<script>
import img from '~/static/imgs/home/topbg@2x.jpg'
export default {
  data() {
    return {
      menuId: '',
      menuItem: {},
      subMenuId: '',
      subMenuItem: {},
      contentTitleImg: img,
      menuActiveNames: ['news', 'equipment'],
      newsCategories: [],
      newsTypes: [
        {
          name: '制造中心新闻',
          newNum: 5,
          key: '1',
        },
        {
          name: '制造中心',
          newNum: 2,
          key: 'news2',
        },
        {
          name: '帮助与教程',
          newNum: 1,
          key: 'news3',
        },
      ],
      equipmentTypes: [
        {
          name: '中心课程',
          newNum: 0,
          key: 'equip1',
        },
        {
          name: '中心设备',
          newNum: 0,
          key: 'equip2',
        },
      ],
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let ids = context.query.menuIds.split(',')
    let {menuItem, menuId, subMenuId, subMenuItem} = context.app.$utils.getContentPageMenuData(context.app.store.state.config.menuList, ids[0], ids[ids.length - 1])
    return {
      menuItem,
      menuId,
      subMenuId,
      subMenuItem
    }
  },
  created() {
    // this.fetchCategories()
  },
  computed: {
    defaultOpen() {
      let arr = []
      this.menuItem.children.forEach(m => {
        arr.push(String(m.id))
        m.children.forEach(mc => {
          // 子菜单也自动打开
          if (mc.children) {
            arr.push(String(mc.id))
          }
        })
      })
      return arr
    }
  },
  mounted() {
    window.scrollTo(0,0)
  },
  methods: {
    onMenuSelect(subMenuId) {
      let title = this.$utils.findMenuTitle(this.$store.state.config.menuList, subMenuId)      
      let ids = this.$utils.findMenuIdsByTitle(this.$store.state.config.menuList, title)
      let item = this.$utils.findMenuItemByTitle(this.$store.state.config.menuList, title)
      let subPage = this.$utils.typeToPages[item.event_type]
      if (!subPage) {
        this.$message.error('未找到菜单地址，请检查配置')
        return
      }
      this.$router.push(`/content/${subPage}?menuIds=${ids}&params=${item.event_link}&singlePage=1`)
    }
  },
  watch: {
    '$route.query.menuIds': function (val) {
      let ids = val.split(',')
      let {menuItem, menuId, subMenuId, subMenuItem} = this.$utils.getContentPageMenuData(this.$store.state.config.menuList, ids[0], ids[ids.length - 1])
      this.menuItem = menuItem
      this.menuId = menuId
      this.subMenuId = subMenuId
      this.subMenuItem = subMenuItem
      window.scrollTo(0,0)
    },
  },
}
</script>
<style scoped lang='scss'>
.content-container {
  min-height: calc(100vh - 161px);
  .top {
    width: 100%;
    height: 250px;
    padding: 0 10%;
    box-sizing: border-box;
    padding-top: 170px;
    background-repeat: no-repeat;
    background-size: 100% 250px;
    // background-position: 0 0px;
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
        .el-menu-item,.el-submenu__title {
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
