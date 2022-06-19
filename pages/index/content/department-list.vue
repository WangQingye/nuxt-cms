<template>
  <div class="department-list">
    <p class="title">
      业务部门
    </p>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData">
      <!-- <div class="items" v-if="departmentItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <img class="department-item" :src="department" v-for="(department,index) in departmentItems" :key="index" @click="$router.push(`/content/lab-detail-info?id=1&menuId=${$route.query.menuId}&subMenuId=${$route.query.subMenuId}`)">
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
    }
  },
  methods: {
    async fetchData(page = 1) {
      // const {
      //   data: { total, list },
      // } = await newsList({
      //   page,
      //   limit: this.pageSize,
      //   category_id: this.$route.query.key,
      //   // 查全部则tag传空字符串
      //   tag: this.newsActiveName === '全部' ? '' : this.newsActiveName,
      // })
      this.total = total
      // this.departmentItems = list
      this.isLoading = false
    },
    async fetchTags(key) {
      this.isLoading = true
      this.departmentItems = []
      const { data } = await categoryTag({ category_id: key })
      this.departmentTags = ['全部', ...data]
      this.newsActiveName = '全部'
      this.fetchData()
    },
    handleClick() {
      // this.isLoading = true
      // this.departmentItems = []
      // this.fetchData()
    },
  },
  watch: {
    '$route.query.key': {
      handler: function (val) {
        if (val) this.fetchTags(val)
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
