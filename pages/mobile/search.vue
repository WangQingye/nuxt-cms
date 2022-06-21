<template>
  <div class="mobile-search">
    <div class="search-input">
      <el-input prefix-icon="el-icon-search"
        placeholder="搜索"
        v-model="searchText"
        @keyup.enter.native="goSearch">
        <template slot="suffix">
          <span class="cancel">取消</span>
        </template>
      </el-input>
    </div>
    <div class="news-list">
      <el-tabs style="margin-left:-0.15rem" v-model="newsActiveName"
        @tab-click="handleClick">
        <el-tab-pane v-for="tag in newsTags"
          :key="tag"
          :label="tag"
          :name="tag"></el-tab-pane>
      </el-tabs>
      <PageListMobile :page-size="pageSize"
        :total="total"
        @fetchData="fetchData">
        <div class="items" v-if="newsActiveName == '文章'">
          <NewsItemListMobile class="list-way-item"
            v-for="i in 10"
            :key="i" />
        </div>
        <div class="items" v-if="newsActiveName == '人员'">
          <PersonItemMobile class="person-item"
            type="search"
            v-for="i in 10"
            :key="i" />
        </div>
      </PageListMobile>
    </div>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      newsActiveName: '文章',
      showListWay: false,
      isLoading: false,
      newsItems: [],
      newsTags: [
        '文章',
        '人员'
      ],
      pageSize: 10,
      total: 11,
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
.mobile-search {
  background: $--color-primary-light;
  padding-top: 0.5rem;
  .search-input {
    height: 0.72rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.2rem;
    font-size: 0.12rem;
    .cancel {
      color: $--color-primary;
      line-height: 0.4rem;
      font-size: 0.12rem;
      margin-right: 0.14rem;
    }
  }
  .news-list {
    padding: 0 0.2rem;
    box-sizing: border-box;
    background: white;
    font-size: 0.12rem;
    width: 100%;
    margin-bottom: 0.8rem;
    ::v-deep .el-tabs__item {
      padding: 0 0.15rem !important;
    }
    .items {
      margin-top: 0.1rem;
      .list-way-item {
        width: 100%;
      }
      .person-item {
        margin-bottom: 0.27rem;
      }
    }
  }
}
</style>
