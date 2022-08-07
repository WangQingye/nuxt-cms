<template>
  <div :class="['news-detail']">
    <span class="date" v-show="!isSinglePage">{{news.publish_at|parseTime('{y}年{m}月{d}日')}}</span>
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
       <div v-if="news.attachment && news.attachment.length >0">
        <span v-for="(option,idx) in news.attachment" :key="idx" class="attachment">
          附件{{idx+1}}：<a class="name" :href="$options.filters['cloudImage'](option.url)">{{ option.name }}</a>
        </span>
      </div>
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
  head() {
    return {
      title: this.news.title || this.news.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
  async asyncData(context) {
    // let data = await context.app.$api.news.newsDetail({ id: context.route.query.id })
    let data
    let isSinglePage = false
    if (context.route.query.singlePage == 1) {
      data = await context.app.$api.news.articleDetail({
        id: context.route.query.params,
      })
      isSinglePage = true
    } else {
      data = await context.app.$api.news.newsDetail({
        id: context.route.query.params,
      })
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
    async fetchData() {
      const { data } = await newsDetail({ id: this.news.id })
      this.news = data
      this.$refs.detail.innerHTML = data.content.replace(
        /src="\.\.\/media/g,
        `src="${imgDomain}`
      )
    },
    async clickLike() {
      if (this.liked) return
      const data = await this.$api.news.newsLike({
        id: this.news.id,
      })
      this.news.like_num = data.like_num
      this.liked = true
    },
    async getInfo() {
      let data
      let isSinglePage = false
      if (this.$route.query.singlePage == 1) {
        data = await this.$api.news.articleDetail({
          id: this.$route.query.params,
        })
        isSinglePage = true
      } else {
        data = await this.$api.news.newsDetail({
          id: this.$route.query.params,
        })
      }
      this.news = data
      this.isSinglePage = isSinglePage
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.getInfo(val)
      },
      immediate: true,
    },
  },
}
</script>
<style lang='scss'>
.content-print-mobile {
  line-height: 0.25rem;
  font-size: 0.15rem;
  border-bottom: 0.01rem #f5f5fc solid;
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
    padding: 0.1rem 0 0.3rem 0;
  }
  .attachment {
    padding: 0.12rem 0.2rem 0.12rem 0.15rem;
    border-radius: 0.04rem;
    display: inline-block;
    box-sizing: border-box;
    background-color: $--color-primary-light;
    color: #4d4d4d;
    margin-bottom: 0.1rem;
    .name {
      color: $--color-primary;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
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
