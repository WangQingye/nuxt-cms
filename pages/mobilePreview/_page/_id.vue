<template>
  <div :class="['news-detail']">
    <div class="top">
      <el-tag class='tag' style="margin-right: 10px" v-for="(tag,index ) in news.tags" :key="index">{{
            tag
          }}
      </el-tag>
    </div>
    <div id="content-print-mobile" class="content-print-mobile">
      <p class="news-title">
        {{ news.title || news.name }}
      </p>
      <div class="detail" ref="detail" v-if="news.content" v-html='news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    </div>
    <div class="bottom" v-show="!isSinglePage">
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
      isSinglePage: false,
    }
  },
  async asyncData(context) {
    let data
    let isSinglePage
    if (context.route.params.page == 'news') {
      isSinglePage = false
      data = await context.app.$api.news.newsDetail({
        id: context.route.params.id,
      })
    } else {
      data = await context.app.$api.news.articleDetail({
        id: context.route.params.id,
      })
      isSinglePage = true
    }
    return { news: data, isSinglePage }
  },
  mounted() {
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
    async clickLike() {
      return
    },
    async getInfo() {
      let data
      let isSinglePage
      if (this.$route.params.page == 'news') {
        data = await this.$api.news.newsDetail({
          id: this.$route.params.id,
        })
        isSinglePage = false
      } else {
        data = await this.$api.news.articleDetail({
          id: this.$route.params.id,
        })
        isSinglePage = true
      }
      this.news = data
      this.isSinglePage = isSinglePage
    },
  },
  watch: {
    '$route.params.id': {
      handler: function (val) {
        if (val) this.getInfo(val)
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang='scss'>
.news-detail {
  width: 100%;
  .date {
    font-size: 0.1rem;
    color: #999999;
    float: right;
    margin-top: -0.54rem;
  }
  .top {
    @include flex-between;
    justify-content: flex-start;
    margin-bottom: 0.3rem;
    .tag {
      margin-right: 0.05rem;
    }
  }
  .news-title {
    font-size: 0.21rem;
    text-align: left;
    color: #1a1a1a;
    margin-bottom: 0.2rem;
  }
  .detail {
    border-top: 0.01rem #f5f5fc solid;
    border-bottom: 0.01rem #f5f5fc solid;
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
