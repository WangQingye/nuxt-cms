<template>
  <div class="department-list">
    <p class="title">
      {{title}}
    </p>
    <PageList :page-size="pageSize"
      :total="total"
      @fetchData="fetchData">
      <!-- <div class="items" v-if="departmentItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <img class="department-item"
          :src="department.cover|cloudImage"
          :alt="department.name"
          v-for="(department,index) in departmentItems"
          :key="index"
          @click="$router.push(`/content/lab-detail-info?params=${department.id}&menuIds=${$route.query.menuIds}`)">
      </div>
    </PageList>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      departmentItems: [
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
      ],
      pageSize: 10,
      total: 0,
      title: '部门列表'
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let { total, list } = await context.app.$api.department.deparmentList({
      type: Number(context.route.query.params),
      page: 1,
      limit: 6,
    })
    let menuList = context.store.state.config.menuList
    let ids = context.route.query.menuIds.split(',')
    let title = context.app.$utils.findMenuTitle(menuList, ids[ids.length - 1])
    return {
      departmentItems: list,
      total,
      title
    }
  },
  methods: {
    async fetchData(page = 1) {
      let { total, list } = await this.$api.department.deparmentList({
        type: Number(this.$route.query.params),
        page: page,
        limit: 6,
      })
      this.departmentItems = list
      this.total = total
      let menuList = this.$store.state.config.menuList
      let ids = this.$route.query.menuIds.split(',')
      let title = this.$utils.findMenuTitle(menuList, ids[ids.length - 1])
      this.title = title
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.fetchData()
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang='scss'>
.department-list {
  width: 100%;
  .title {
    padding-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #4d4d4d;
    margin-bottom: 30px;
  }
  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    .no-text {
      width: 100%;
    }
    .department-item {
      width: 24%;
      min-width: 150px;
      min-height: 70px;
      // max-width: 330px;
      margin-right: 1.33%;
      margin-bottom: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        transition-timing-function: ease-in-out;
        box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
        transform: translateY(-8px);
      }
    }

    .department-item:nth-child(4n + 4) {
      margin-right: 0px;
    }
  }
}
</style>
