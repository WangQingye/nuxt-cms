<template>
  <div class="search-page">
    <div class="search-top">
      <img class="header-logo" src="~/static/imgs/home/logo_02@2x.png" alt="logo" @click="$router.push('/')">
      <!-- <img class="header-logo" v-else src="~/static/imgs/home/logo_02@2x.png" alt=""> -->
      <div class="search-input">
        <el-input placeholder="输入关键词进行搜索..." v-model="searchText">
        </el-input>
        <el-button type="primary" style="width: 200px;height: 60px;font-size:18px;border-radius: 0 4px 4px 0" icon="el-icon-search" @click="clickSearch">搜 索</el-button>
      </div>
    </div>
    <div class="search-container">
      <div class="left">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="文章" name="news"></el-tab-pane>
          <el-tab-pane label="人员" name="person"></el-tab-pane>
        </el-tabs>
        <PageList :page-size="pageSize" :total="total" @fetchData="fetchData" v-loading="isLoading">
          <div class="items" v-show="activeTab == 'news'">
            <el-empty v-if="!newsItems.length" description="暂无内容"></el-empty>
            <NewsItemList class="list-way-item" v-for="(news, index) in newsItems" :key="index" :itemData="news" />
          </div>
          <div class="items-person" v-show="activeTab == 'person'">
            <div style="background: white; width: 100%">
              <el-empty style="margin: 0 auto" v-if="!personItems.length" description="暂无内容"></el-empty>
            </div>
            <PersonItem class="person-item" v-for="(person, index) in personItems" :key="index" :itemData="person" />
          </div>
        </PageList>
      </div>
      <div class="right">
        <div class="history">
          <p class="title">历史搜索</p>
          <div v-if="historyItems.length">
            <div class="item" v-for="(item,index) in historyItems" :key="index">
              <span class="text" @click="clickHistoryItem(item.text)">{{item.text}}</span>
              <span>{{item.date|parseTime('{m}-{d}')}}</span>
            </div>
            <p class="clear" @click="clearHistory">全部清除</p>
          </div>
          <div v-else>
            <p style="text-align:center;padding-bottom:20px;">暂无历史</p>
          </div>
        </div>
        <p class="back-button">返回中心首页</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchPage',
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
    const { total, list } = await this.$api.news.newsSearch({
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

<style lang="scss" scoped>
.search-page {
  width: 100%;
  min-width: 1440px;
  padding-top: 0 !important;
  .search-top {
    width: 100%;
    height: 160px;
    background: white;
    @include flex-between;
    padding: 0 10%;
    box-sizing: border-box;
    .header-logo {
      // width: 200px;
      height: 38px;
      margin-right: 100px;
      cursor: pointer;
    }
    .search-input {
      flex: 1;
      @include flex-between;
      ::v-deep .el-input__inner {
        height: 60px;
        font-size: 18px;
        border-radius: 4px 0 0 4px;
      }
    }
  }
  .search-container {
    width: 100%;
    background: #f5f7fa;
    padding: 30px 10%;
    box-sizing: border-box;
    min-height: calc(100vh - 230px);
    @include flex-between(flex-start);
    .left {
      flex: 1;
      margin-right: 10px;
      .items {
        padding: 10px 20px;
        background: white;
        border-radius: 4px;
        margin-bottom: 20px;
      }
      .items-person {
        @include flex-between(flex-start);
        justify-content: flex-start;
        flex-wrap: wrap;
        .person-item {
          width: 32%;
          min-width: 200px;
          // max-width: 330px;
          margin-right: 2%;
          margin-bottom: 2%;
        }

        .person-item:nth-child(3n + 3) {
          margin-right: 0px;
        }
      }
    }
    .right {
      width: 300px;
      margin-top: 53px;
      .history {
        color: #999;
        background: white;
        border-radius: 4px;
        padding: 20px;
        padding-bottom: 0;
        box-sizing: border-box;
        margin-bottom: 10px;
        .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .item {
          @include flex-between(flex-start);
          margin-bottom: 10px;
          .text {
            cursor: pointer;
            flex: 1;
            margin-right: 20px;
            @include ellipsisBasic(2);
          }
        }
        .clear {
          margin-top: 10px;
          border-top: 1px solid #f5f7fa;
          padding: 15px 0;
          text-align: center;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
          &:hover {
            color: $--color-primary;
          }
        }
      }
      .back-button {
        background: white;
        line-height: 60px;
        text-align: center;
        color: $--color-primary;
        cursor: pointer;
        border-radius: 4px;
        font-weight: bold;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
