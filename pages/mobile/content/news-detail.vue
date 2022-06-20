<template>
  <div :class="['news-detail']">
    <div id="content-print" class="content-print">
      <p class="news-title">
        {{ news.title }}
      </p>
      <div class="detail" ref="detail" v-if="news.content" v-html='news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    </div>
    <div class="bottom">
      <div class="left">
        <el-tag class='tag' type="info" style="margin-right: 10px">
          <i class="el-icon-view" />
          {{ news.views }}
        </el-tag>
        <el-tag class='tag' size="mini" :type="liked ? 'success' : 'info'" style="cursor:pointer" @click="clickLike">
          <i class="font_family icon-dianzan" />
          {{ news.like_num }}
        </el-tag>
      </div>
      <!-- <el-button type="warning" class="button" @click="!$store.state.news.isPreview && $router.back()">返回列表</el-button> -->
    </div>
  </div>
</template>
<script>
import { imgDomain } from '@/config'
export default {
  data() {
    return {
      news: {
        id: undefined,
      },
      // 是否已经点过赞
      liked: false,
      imgDomain,
    }
  },
  async asyncData(context) {
    // let data = await context.app.$api.news.newsDetail({ id: context.route.query.id })
    let data = await context.app.$api.news.newsDetail({
      id: '0100422d0c244083b844542b37e1766e',
    })
    console.log(context.route)
    console.log(context.app.$refs)
    return { news: data }
  },
  mounted() {
    console.log(this.news)
    // this.$refs.detail.innerHTML = this.news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)
    // const { id } = this.$route.query
    // console.log(this.$route.query)
    // this.$store.commit('news/setIsPreview', this.$route.name == 'news-preview')
    // this.news.id = id
    // if (id) {
    //   this.fetchData()
    // }
  },
  methods: {
    async fetchData() {
      const { data } = await newsDetail({ id: this.news.id })
      this.news = data
      this.$refs.detail.innerHTML = data.content.replace(
        /src="\.\.\/media/g,
        `src="${imgDomain}`
      )
    },
    async clickLike() {
      if (this.liked || this.$store.state.news.isPreview) return
      const { data } = await newsLike({
        id: this.news.id,
      })
      this.news.like_num = data.like_num
      this.liked = true
    },
  },
}
</script>
<style lang='scss'>
.content-print {
  line-height: 0.25rem;
  font-size: 0.15rem;
  padding: 0;
  img {
    max-width: 100%;
    height: auto;
  }
  h1 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.23rem;
  }
  h2 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.2rem;
  }
  h3 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.18rem;
  }
  h4 {
    color: #444444;
    line-height: 1;
    font-size: 0.17rem;
  }
}
</style>
<style scoped lang='scss'>
.news-detail {
  width: 100%;
  .news-title {
    font-size: 0.21rem;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 0.2rem;
  }
  .detail {
    border-top: 0.01rem #F5F5FC solid;
    border-bottom: 0.01rem #F5F5FC solid;
    padding: 0.1rem 0 0.3rem 0;
  }
  .bottom {
    margin-top: 0.15rem;
    margin-bottom: 0.3rem;
    @include flex-between;
  }

  .tag {
    height: 0.3rem;
    line-height: 0.3rem;
    border: none;
    padding: 0 0.1rem;
    box-sizing: border-box;

    i {
      font-size: 0.14rem;
      line-height: 0.3rem;
      font-weight: bold;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
  }

  .button {
    line-height: 14px;
    border: none;
    font-size: 14px;
    font-weight: 400;
    color: #4d4d4d;
    background: #f7f7f7;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
