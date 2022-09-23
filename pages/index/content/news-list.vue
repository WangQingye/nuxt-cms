<template>
  <div class="news-list">
    <div class="top">
      <el-tabs v-model="newsActiveName" @tab-click="handleClick">
        <el-tab-pane v-for="tag in newsTags" :key="tag" :label="tag" :name="tag"></el-tab-pane>
      </el-tabs>
      <el-button class="button" @click="showListWay = !showListWay">
        <div class="button-text">
          <p>{{ `以${showListWay ? '图文' : '列表'}显示` }}</p>
          <i :class="['font_family', showListWay ? 'icon-liebiao' : 'icon-tuwen']"></i>
        </div>
      </el-button>
    </div>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData" ref="pageList">
      <div class="items" v-if="newsItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div>
      <div class="items" v-if="!showListWay">
        <NewsItemSkeleton class="news-item" v-for="i in 3" :key="i" v-if="isLoading" />
        <NewsItem class="news-item" v-for="item in newsItems" :itemData="item" :key="item.id" :showCategory="showCategory" />
      </div>
      <div class="items" v-else>
        <NewsItemList class="list-way-item" v-for="item in newsItems" :itemData="item" :key="item.id"  :showCategory="showCategory"/>
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
      newsItems: [],
      newsTags: [],
      pageSize: 12,
      total: 0,
      showCategory: false
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let tags = await context.app.$api.news.newsTag({
      category_id: context.query.params,
    })
    let {list, total} = await context.app.$api.news.newsList({
      category_id: context.query.params,
      page: Number(context.route.query.page) || 1,
      limit: 12,
      tag: '',
    })
    let menuList = context.store.state.config.menuList
    let ids = context.route.query.menuIds.split(',')
    let title = context.app.$utils.findMenuTitle(menuList, ids[ids.length - 1])
    let showCategory = false
    if (title == '中心要闻' || title == '通知公告') {
      showCategory = true
    }
    return {
      newsTags: ['全部', ...tags],
      newsItems: list,
      total,
      showCategory
    }
  },
  methods: {
    async fetchData(page = 1) {
      const { total, list } = await this.$api.news.newsList({
        page,
        limit: this.pageSize,
        category_id: this.$route.query.params,
        // 查全部则tag传空字符串
        tag: this.newsActiveName === '全部' ? '' : this.newsActiveName,
      })
      this.total = total
      this.newsItems = list
      this.isLoading = false
      let menuList = this.$store.state.config.menuList
      let ids = this.$route.query.menuIds.split(',')
      let title = this.$utils.findMenuTitle(menuList, ids[ids.length - 1])
      this.showCategory = false
      if (title == '中心要闻' || title == '通知公告') {
        this.showCategory = true
      }
    },
    async fetchTags(key) {
      this.isLoading = true
      this.newsItems = []
      const data = await this.$api.news.newsTag({ category_id: key })
      this.newsTags = ['全部', ...data]
      this.newsActiveName = '全部'
      this.$refs.pageList.reInit()
    },
    handleClick() {
      this.isLoading = true
      this.newsItems = []
      this.$refs.pageList.reInit()
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.fetchTags(val)
      },
    },
  },
}
</script>
<style scoped lang='scss'>
.news-list {
  width: 100%;

  .top {
    @include flex-between(flex-start);
    margin-bottom: 15px;

    .button {
      background: $--color-primary-light;
      color: #999999;
      width: 130px;
      height: 40px;
      border-radius: 4px;
      border: none;
      line-height: 18px;
      .button-text {
        @include flex-between(flex-start);
        i {
          vertical-align: middle;
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
  }

  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    .no-text {
      width: 100%;
    }
    .news-item {
      width: 30%;
      min-width: 200px;
      // max-width: 330px;
      margin-right: 5%;
      margin-bottom: 60px;
    }

    .news-item:nth-child(3n + 3) {
      margin-right: 0px;
    }

    .list-way-item {
      width: 100%;
    }
  }
}
</style>
