<template>
  <div class="partners-list">
    <el-tabs v-model="newsActiveName" @tab-click="handleClick">
      <el-tab-pane v-for="tag in partnerTags" :key="tag" :label="tag" :name="tag"></el-tab-pane>
    </el-tabs>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData">
      <!-- <div class="items" v-if="partnerItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <img class="partner-item" :src="partner" v-for="(partner,index) in partnerItems" :key="index">
      </div>
    </PageList>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      newsActiveName: '全部',
      showListWay: false,
      isLoading: false,
      partnerItems: [
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
      partnerTags: ['全部', '校企合作', '人才培养'],
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
      // this.partnerItems = list
      this.isLoading = false
    },
    async fetchTags(key) {
      this.isLoading = true
      this.partnerItems = []
      const { data } = await categoryTag({ category_id: key })
      this.partnerTags = ['全部', ...data]
      this.newsActiveName = '全部'
      this.fetchData()
    },
    handleClick() {
      // this.isLoading = true
      // this.partnerItems = []
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
.partners-list {
  width: 100%;

  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    .no-text {
      width: 100%;
    }
    .partner-item {
      width: 24%;
      min-width: 150px;
      // max-width: 330px;
      margin-right: 1.33%;
      margin-bottom: 30px;
    }

    .partner-item:nth-child(4n + 4) {
      margin-right: 0px;
    }
  }
}
</style>
