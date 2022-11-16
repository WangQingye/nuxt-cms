<template>
  <div class="news-list">
    <div class="top">
      <el-tabs v-model="newsActiveName" @tab-click="handleClick">
        <el-tab-pane v-for="tag in newsTags" :key="tag" :label="tag" :name="tag"></el-tab-pane>
      </el-tabs>
    </div>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData" ref="pageList">
      <div class="items" v-if="newsItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div>
      <div class="items">
        <a class="simple-item" v-for="item in newsItems" :key="item.id" :href="getLink(item)" @click.prevent="clickNew(item)">
          <span class="dot"></span>
          <p class="title">
            {{item.title}}
            <el-tag class="tag" type="primary" size="mini"  v-if="item.isNew">新</el-tag>
          </p>
          <p class="time">
            {{item.publish_at|parseTime('{y}-{m}-{d}')}}
          </p>
        </a>
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
      pageSize: 17,
      total: 0,
      showCategory: false,
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let tags = await context.app.$api.news.newsTag({
      category_id: context.query.params,
    })
    let { list, total } = await context.app.$api.news.newsList({
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
      showCategory,
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
    getLink(item) {
      let menuIds = this.$utils.findMenuIdsByEventLink(
        this.$store.state.config.menuList,
        item.category_id
      )
      return `/content/news-detail?params=${
        item.id
      }&menuIds=${menuIds.join(',')}`
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
    margin-bottom: 20px;
    .no-text {
      width: 100%;
    }
    .simple-item {
      @include flex-between(flex-start);
      color: #666;
      border-bottom: 1px solid #F2F2F2;
      padding: 12px 0;
      font-size: 14px;
      cursor: pointer;
      text-decoration: none;
      .dot {
        display: inline-block;
        width: 4px;
        height: 4px;
        margin-top: 10px;
        border-radius: 50%;
        background: $--color-primary;
        vertical-align: middle;
        margin-right: 14px;
      }
      .tag {
        margin-right: 10px;
      }
      .title {
        line-height: 24px;
        flex: 1;
      }
      .time {
        line-height: 24px;
        display: block;
        min-width: 65px;
        font-size: 12px;
        margin-left: 20px;
        flex: 0;
        color: #808080;
      }
    }
    .simple-item:hover {
      .title {
        color: $--color-primary;
      }
    }
  }
}
</style>
