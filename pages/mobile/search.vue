<template>
  <div class="mobile-search">
    <div class="search-input">
      <el-input prefix-icon="el-icon-search" placeholder="搜索" v-model="searchText" @keyup.enter.native="clickSearch">
        <template slot="suffix">
          <span class="cancel" @click="searchText = ''">取消</span>
        </template>
      </el-input>
    </div>
    <div class="news-list">
      <el-tabs style="margin-left:-0.15rem" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="文章" name="news"></el-tab-pane>
        <el-tab-pane label="人员" name="person"></el-tab-pane>
      </el-tabs>
      <PageListMobile :page-size="pageSize" :total="total" @fetchData="fetchData">
        <div class="items" v-if="activeTab == 'news'">
          <el-empty v-if="!newsItems.length" description="暂无内容"></el-empty>
          <NewsItemListMobile class="list-way-item" v-for="(news, index) in newsItems" :key="index" :itemData="news" />
        </div>
        <div class="items" v-if="activeTab == 'person'">
          <div style="background: white; width: 100%">
            <el-empty style="margin: 0 auto" v-if="!personItems.length" description="暂无内容"></el-empty>
          </div>
          <PersonItemMobile class="person-item" v-for="(person, index) in personItems" :key="index" :itemData="person" />
        </div>
      </PageListMobile>
    </div>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  name: 'searchPageMobile',
  data() {
    return {
      activeTab: 'news',
      searchText: '',
      total: 10,
      isLoading: false,
      historyItems: [],
      newsItems: [],
      personItems: [],
    }
  },
  async asyncData(context) {
    const { total, list } = await context.app.$api.news.newsSearch({
      page: 1,
      limit: 7,
      search: context.route.query.text,
    })
    return { total, newsItems: list }
  },
  mounted() {
    if (this.$route.query.text) {
      this.searchText = this.$route.query.text
      this.addSearchHistory()
      this.fetchData()
    }
  },
  methods: {
    clickSearch() {
      this.fetchData()
      this.addSearchHistory()
      this.getSearchHistory()
    },
    clickHistoryItem(text) {
      this.activeTab = 'news'
      this.searchText = text
      this.handleTabClick()
    },
    handleTabClick() {
      this.page = 1
      this.newsItems = []
      this.personItems = []
      this.fetchData()
    },
    async fetchData(page = 1) {
      this.isLoading = true
      if (this.activeTab == 'news') {
        const { total, list } = await this.$api.news.newsSearch({
          page,
          limit: this.pageSize,
          search: this.searchText,
        })
        this.total = total
        this.newsItems = list
      }
      if (this.activeTab == 'person') {
        const { total, list } = await this.$api.department.personSearch({
          page,
          limit: this.pageSize,
          search: this.searchText,
        })
        this.total = total
        this.personItems = list
      }
      this.isLoading = false
    },
    getSearchHistory() {
      if (process.browser) {
        this.historyItems = JSON.parse(
          window.localStorage.getItem('INNOVATION_SEARCH_HISTORY')
        )
      }
    },
    addSearchHistory() {
      this.historyItems.unshift({
        text: this.searchText,
        date: new Date().getTime(),
      })
      window.localStorage.setItem(
        'INNOVATION_SEARCH_HISTORY',
        JSON.stringify(this.historyItems.slice(0, 4))
      )
    },
    clearHistory() {
      this.historyItems = []
      window.localStorage.setItem(
        'INNOVATION_SEARCH_HISTORY',
        JSON.stringify(this.historyItems)
      )
    },
  },
  computed: {
    pageSize() {
      return this.activeTab == 'news' ? 7 : 15
    },
  },
}
</script>
<style scoped lang='scss'>
.mobile-search {
  background: $--color-primary-light;
  padding-top: 0.5rem;
  min-height: calc(100vh - 0.5rem);
  background: white;
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
