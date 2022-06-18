<template>
  <div :class="['news-detail']">
    <div id="content-print" class="content-print">
      <p class="news-title">
        {{ news.title }}
      </p>
      <div ref="detail" v-if="news.content" v-html='news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    </div>
    <div class="bottom">
      <div class="left">
        <el-tag class='tag' type="warning" style="margin-right: 10px">
          <i class="el-icon-view" />
          {{ news.views }}
        </el-tag>
        <el-tag class='tag' :type="liked ? 'success' : 'danger'" style="cursor:pointer" @click="clickLike">
          <i class="font_family icon-dianzan" />
          {{ news.like_num }}
        </el-tag>
      </div>
      <el-button type="warning" class="button" @click="!$store.state.news.isPreview && $router.back()">返回列表</el-button>
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
      imgDomain
    }
  },
  async asyncData(context) {
    // let data = await context.app.$api.news.newsDetail({ id: context.route.query.id })
    let data = await context.app.$api.news.newsDetail({ id: '0100422d0c244083b844542b37e1766e' })
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
      this.$refs.detail.innerHTML = data.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)
    },
    async clickLike() {
      if (this.liked || this.$store.state.news.isPreview) return
      const {data}  = await newsLike({
        id: this.news.id
      })
      this.news.like_num = data.like_num
      this.liked = true
    },
  },
}
</script>
<style lang='scss'>
.content-print {
  border-bottom: 1px solid #f2f2f2;
  padding: 0 20px;
  padding-bottom: 50px;
  line-height: 25px;
  img {
    max-width:100%;
    height:auto;
  }
  h1 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 23px;
  }
  h2 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 20px;
  }
  h3 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 18px;
  }
  h4 {
    color: #444444;
    line-height: 1;
    letter-spacing: 0.2px;
    font-size: 17px;
  }
}
</style>
<style scoped lang='scss'>
.news-detail {
  width: 100%;

  .bottom {
    margin-top: 40px;
    @include flex-between;
  }

  .tag {
    height: 34px;
    line-height: 34px;
    border: none;

    i {
      font-size: 15px;
      line-height: 34px;
      font-weight: bold;
      vertical-align: middle;
      margin-right: 5px;
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
