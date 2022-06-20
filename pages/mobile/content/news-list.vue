<template>
  <div class="news-list">
    <el-tabs v-model="newsActiveName" @tab-click="handleClick">
      <el-tab-pane v-for="tag in newsTags" :key="tag" :label="tag" :name="tag"></el-tab-pane>
    </el-tabs>
    <PageListMobile :page-size="pageSize" :total="total" @fetchData="fetchData">
      <div class="items">
        <NewsItemListMobile class="list-way-item" v-for="i in 10" :key="i" />
      </div>
    </PageListMobile>
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
      newsItems: [],
      newsTags: [
        '全部',
        '标签2',
        '标签3',
        '标签41111',
        '标签5',
        '标签6',
        '标签7',
        '标签8',
      ],
      pageSize: 10,
      total: 11
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
      // this.newsItems = list
      this.isLoading = false
    },
    async fetchTags(key) {
      this.isLoading = true
      this.newsItems = []
      const { data } = await categoryTag({ category_id: key })
      this.newsTags = ['全部', ...data]
      this.newsActiveName = '全部'
      this.fetchData()
    },
    handleClick() {
      // this.isLoading = true
      // this.newsItems = []
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
.news-list {
  width: 100%;
  margin-bottom: 0.8rem;
  .items {
    .list-way-item {
      width: 100%;
    }
  }
}
</style>
