<template>
  <div class="department-list">
    <p class="title">
      {{ title }}
    </p>
    <div ref="detail" class="content-print-mobile" style="border-bottom: none;padding-bottom: 20px" v-if="desc" v-html='desc.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    <PageListMobile :page-size="pageSize"
                    :total="total"
                    @fetchData="fetchData">
      <!-- <div class="items" v-if="departmentItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <template v-for="(department,index) in departmentItems">
          <NuxtLink class="department-item"
                    :key="index"
                    :to="getLink(department)"
                    v-if="department.type != 3">
            <img :src="department.cover|cloudImage"
                 :alt="department.name">
          </NuxtLink>
          <img v-else
               class="department-item"
               :key="index"
               :src="department.cover|cloudImage"
               :alt="department.name">
        </template>
      </div>
    </PageListMobile>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

import { imgDomain } from '@/config'
export default {
  data() {
    return {
      departmentItems: [],
      pageSize: 32,
      total: 0,
      imgDomain,
      title: '',
      desc: ''
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let res, title, desc, info
    // 如果有cate，说明是组织架构过来的，这时候要请求详情去获取信息，因为这个可能没在导航菜单中
    if (context.route.query.cate) {
      res = await context.app.$api.department.deparmentList({
        type: Number(context.route.query.params),
        cate: Number(context.route.query.cate),
        page: 1,
        limit: 32,
      })
      info = await context.app.$api.department.getCateDetail({
        id: Number(context.route.query.cate),
      })
      title = info.name
      desc = info.desc
    } else {
      res = await context.app.$api.department.deparmentList({
        type: Number(context.route.query.params),
        page: 1,
        limit: 32,
      })
      let menuList = context.store.state.config.menuList
      let ids = context.route.query.menuIds.split(',')
      title = context.app.$utils.findMenuTitle(menuList, ids[ids.length - 1])
      let menuItem = await context.app.$api.banner.getNavigationDesc({
        id: ids[ids.length - 1],
      })
      desc = menuItem.desc
    }
    return {
      departmentItems: res.list,
      total: res.total,
      title,
      desc,
    }
  },
  methods: {
    async fetchData(page = 1) {
      let {total, list} = await this.$api.department.deparmentList({
        type: Number(this.$route.query.params),
        cate: this.$route.query.cate ? Number(this.$route.query.cate) : undefined,
        page: page,
        limit: this.pageSize,
      })
      this.departmentItems = list
      this.total = total
      if (this.$route.query.cate) {
        const info = await this.$api.department.getCateDetail({
          id: Number(this.$route.query.cate),
        })
        this.title = info.name
        this.desc = info.desc
      } else {
        let menuList = this.$store.state.config.menuList
        let ids = this.$route.query.menuIds.split(',')
        let title = this.$utils.findMenuTitle(menuList, ids[ids.length - 1])
        let menuItem = await this.$api.banner.getNavigationDesc({
          id: ids[ids.length - 1],
        })
        this.title = title
        this.desc = menuItem.desc
      }
    },
    getLink(department) {
      return `/content/lab-detail-info?params=${department.id}&menuIds=${this.$route.query.menuIds}`
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.fetchData()
      },
      immediate: true,
    },
    '$route.query.cate': {
      handler: function (val) {
        this.fetchData()
      },
    },
  },
}
</script>
<style scoped lang='scss'>
.department-list {
  width: 100%;
  margin-top: -0.2rem;
  .title {
    padding-top: 0.22rem;
    font-size: 0.14rem;
    font-weight: bold;
    color: #4d4d4d;
    margin-bottom: 0.2rem;
    border-top: 1px solid #F5F5FC;
  }
  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0.14rem 0;
    border-bottom: 0.01rem solid #f5f5fc;

    .no-text {
      width: 100%;
    }

    .department-item {
      width: 48%;
      min-width: 1.6rem;
      // max-width: 330px;
      margin-right: 4%;
      margin-bottom: 0.12rem;
      cursor: pointer;

      img {
        width: 100%;
      }

      // &:hover {
      //   box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
      // }
    }

    .department-item:nth-child(2n + 2) {
      margin-right: 0px;
    }
  }
}
</style>
