 <template>
  <div class='content-container' v-if="menuItem.title">
    <div class="top" :style="`background-image: url(${contentTitleImg})`">
      <p class="top-title">{{menuItem.title}}</p>
    </div>
    <section class='content'>
      <div class='left'>
        <el-menu :default-openeds="defaultOpen" :default-active="subMenuId" @select="onMenuSelect">
          <template v-for="item in menuItem.children">
            <!-- 一级 -->
            <el-submenu v-if="item.children && item.children.length" :index="item.menuId" :key="item.menuId">
              <template slot="title">
                <div style="border-bottom: 1px solid #F2F2F2;font-weight: bold">
                  <i class="el-icon-location"></i>
                  <span>{{item.title}}</span>
                </div>
              </template>
              <template v-for="subItem in item.children">
                <!-- 二级 -->
                <el-submenu v-if="subItem.children && subItem.children.length" :index="subItem.menuId" :key="subItem.menuId">
                  <template slot="title">
                    <span>{{subItem.title}}</span>
                  </template>
                  <el-menu-item v-for="thirdItem in subItem.children" :index="thirdItem.menuId" :key="thirdItem.menuId">
                    <template slot="title">
                      <div class="item-line">
                        <span>{{thirdItem.title}}11</span>
                        <el-tag class="tag" type="primary" v-if="thirdItem.num">
                          {{thirdItem.num}}
                        </el-tag>
                      </div>
                    </template>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.menuId" :key="subItem.menuId">
                  <div class="item-line">
                    <span>{{subItem.title}}</span>
                    <el-tag class="tag" type="primary" v-if="subItem.num">
                      {{subItem.num}}
                    </el-tag>
                  </div>
                </el-menu-item>
              </template>
            </el-submenu>
            <!-- <el-menu-item v-else :index="item.menuId" :key="item.menuId">
              <template slot="title">
                <div class="item-line">
                  <span>{{item.title}}</span>
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
      // menuItemId: 'news1',
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
    // await context.$utils.getInitData()
    await context.app.$utils.getInitData(context)
    let {menuItem, menuId, subMenuId, subMenuItem} = context.app.$utils.getContentPageMenuData(context.app.store.state.config.menuList, context.query.menuId, context.query.subMenuId)
    // const menuId = context.query.menuId
    // const subMenuId = String(context.query.subMenuId)
    // const menuItem = context.app.store.state.config.menuList.find(m => m.menuId == menuId)
    // let subMenuItem
    // menuItem.children.forEach(m => {
    //   if (m.menuId == subMenuId) {
    //     subMenuItem = m
    //   } else if (m.children) {
    //     let item = m.children.find(mc => mc.menuId == subMenuId)
    //     if (item) {
    //       subMenuItem = item
    //     }
    //   }
    // })
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
    menuItemId() {
      return this.$route.query.key || this.newsCategories[0].children[0].id
    },
    defaultOpen() {
      let arr = []
      this.menuItem.children.forEach(m => {
        arr.push(m.menuId)
        m.children.forEach(mc => {
          // 子菜单也自动打开
          if (mc.children) {
            arr.push(mc.menuId)
          }
        })
      })
      return arr
    }
  },
  methods: {
    async fetchCategories() {
      // const { data } = await newsCategory()
      // // 如果是直接跳转到新闻详情页，不要重定向
      // if (
      //   !this.$route.query.key &&
      //   data.length &&
      //   this.$route.name != 'news-detail' &&
      //   this.$route.name != 'news-preview'
      // ) {
      //   this.$router.push(`/news?key=${data[0].children[0].id}`)
      // }
      // this.newsCategories = data
      // this.menuActiveNames = data.map((c) => c.id)
    },
    onMenuSelect(subMenuId) {
      let subItem = this.$utils.getSubMenuItem(this.menuItem, subMenuId)
      let subPage = this.$utils.typeToPages[subItem.type]
      this.$router.push(`/content/${subPage}?menuId=${this.menuId}&subMenuId=${subMenuId}`)
    }
  },
  watch: {
    '$route.query.subMenuId': function (val) {
      let {menuItem, menuId, subMenuId, subMenuItem} = this.$utils.getContentPageMenuData(this.$store.state.config.menuList, this.$route.query.menuId, val)
      this.menuItem = menuItem
      this.menuId = menuId
      this.subMenuId = subMenuId
      this.subMenuItem = subMenuItem
    },
  },
}
</script>
<style scoped lang='scss'>
.content-container {
  min-height: calc(100vh - 161px);
  .top {
    width: 100%;
    height: 170px;
    padding: 0 10%;
    box-sizing: border-box;
    padding-top: 90px;
    background-repeat: no-repeat;
    background-size: 100% 170px;
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
      }
      .item-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .menu-item-text {
          font-size: 15px;
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
