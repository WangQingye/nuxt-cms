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
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData">
      <!-- <div class="items" v-if="newsItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items" v-if="!showListWay">
        <NewsItemSkeleton class="news-item" v-for="i in 3" :key="i" v-show="isLoading" />
        <NewsItem class="news-item" v-for="i in 3" :key="i" />
      </div>
      <div class="items" v-else>
        <NewsItemList class="list-way-item" v-for="i in 3" :key="i" />
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
      newsTags: ['全部', '标签2', '标签3'],
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
