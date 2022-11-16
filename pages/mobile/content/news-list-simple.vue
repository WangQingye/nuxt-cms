<template>
  <div class="news-list">
    <el-tabs v-model="newsActiveName" @tab-click="handleClick">
      <el-tab-pane v-for="tag in newsTags" :key="tag" :label="tag" :name="tag"></el-tab-pane>
    </el-tabs>
    <PageListMobile :page-size="pageSize" :total="total" @fetchData="fetchData">
      <div class="items">
        <div class="items" v-if="newsItems.length == 0 && !isLoading">
          <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
        </div>
        <div class="simple-item" v-for="item in newsItems" :key="item.id" @click.prevent="clickNew(item)">
          <span class="dot"></span>
          <p class="title">
            {{item.title}}
            <el-tag class="tag" type="primary" size="mini" v-if="item.isNew">新</el-tag>
          </p>
          <p class="time">
            {{item.publish_at|parseTime('{y}-{m}-{d}')}}
          </p>
        </div>
        <!-- <NewsItemListMobile class="list-way-item" v-for="i in newsItems" :key="i.id" :itemData="i" :showCategory="showCategory" /> -->
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
      pageSize: 12,
      total: 11,
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
      page: 1,
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
      this.fetchData()
    },
    handleClick() {
      this.isLoading = true
      this.newsItems = []
      this.fetchData()
    },
    clickNew(item) {
      let menuIds = this.$utils.findMenuIdsByEventLink(
        this.$store.state.config.menuList,
        item.category_id
      )
      this.$router.push(
        `/content/news-detail?params=${item.id}&menuIds=${menuIds.join(
          ','
        )}`
      )
    },
  },
  watch: {
    '$route.query.params': {
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
    .simple-item {
      @include flex-between(flex-start);
      flex-wrap: wrap;
      color: #666;
      border-bottom: 1px solid #E6EDFF;
      padding: 0.12rem 0;
      cursor: pointer;
      text-decoration: none;
      .dot {
        display: inline-block;
        width: 0.05rem;
        height: 0.05rem;
        margin-top: 0.1rem;
        border-radius: 50%;
        background: $--color-primary;
        vertical-align: middle;
        margin-right: 0.05rem;
      }
      .tag {
        margin-left: 0.1rem;
      }
      .title {
        line-height: 0.24rem;
        font-size: 0.18rem;
        flex: 1;
      }
      .time {
        // line-height: 24px;
        color: #808080;
        display: block;
        min-width: 100%;
        text-align: left;
        font-size: 0.12rem;
        margin-left: 0.1rem;
        margin-top: 0.12rem;
      }
    }
  }
}
</style>
