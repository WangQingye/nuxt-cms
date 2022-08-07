<template>
  <div :class="['news-detail']">
    <div class="top">
      <div class="left">
        <el-tag class='tag'
          style="margin-right: 10px"
          v-for="(tag,index ) in news.tags"
          :key="index">{{
            tag
          }}
        </el-tag>
        <el-tag class='tag'
          v-show="news.publish_at">{{ news.publish_at|parseTime('{y}年{m}月{d}日') }}</el-tag>
      </div>
      <el-button type="info"
        class="button"
        v-show="!isSinglePage"
        @click="!$store.state.news.isPreview && doPrint()">打印本页</el-button>
    </div>
    <div id="content-print"
      class="content-print">
      <p style="font-size: 24px;font-weight: bold;color: #1a1a1a;line-height: 30px;border-bottom: 2px solid #f2f2f2;padding: 40px 0;margin-bottom: 30px;text-align: center;">
        {{ news.title || news.name }}
      </p>
      <div ref="detail"
        v-if="news.content"
        v-html='news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
      <div class="attachments"
        v-show="news.attachment && news.attachment.length">
        <div
          v-for="(file,idx) in news.attachment"
          :key="file.name">
          <p  class="attachment" style="display: inline-block">
            附件{{idx+1}}：<a class="name" :href="$options.filters['cloudImage'](file.url)">{{file.name}}</a>
          </p>
        </div>
      </div>
    </div>
    <div v-show="!isSinglePage"
      class="bottom">
      <div class="left">
        <el-tag class='tag'
          type="warning"
          style="margin-right: 10px">
          <i class="el-icon-view" />
          {{ news.views }}
        </el-tag>
        <el-tag class='tag'
          :type="liked ? 'success' : 'info'"
          style="cursor:pointer"
          @click="clickLike">
          <i class="font_family icon-dianzan" />
          {{ news.like_num }}
        </el-tag>
      </div>
      <el-button type="info"
        class="button"
        @click="!$store.state.news.isPreview && $router.back()">返回列表</el-button>
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
      // 是否单页
      isSinglePage: false,
    }
  },
  head() {
    return {
      title: this.news.title || this.news.name,
      meta: [
        {
          hid: 'description',
          name: this.news.title || this.news.name,
          content: this.news.title || this.news.name,
        },
      ],
    }
  },
  async asyncData(context) {
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
  mounted() {},
  methods: {
    doPrint() {
      var printHtml = document.getElementById('content-print').innerHTML //这个元素的样式需要用内联方式，不然在新开打印对话框中没有样式
      var wind = window.open(
        '',
        'newwindow',
        'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
      )
      wind.document.body.innerHTML = printHtml
      wind.print()
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
.content-print {
  border-bottom: 1px solid #f2f2f2;
  padding: 0;
  padding-bottom: 50px;
  line-height: 25px;
  img {
    max-width: 100%;
    height: auto;
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

  .top {
    padding-top: 10px;
    @include flex-between;
  }
  .attachments {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    .attachment {
      padding: 12px 20px 12px 15px;
      border-radius: 4px;
      background-color: $--color-primary-light;
      color: #4d4d4d;
      display: inline-block;
      margin-bottom: 10px;
      .name {
        color: $--color-primary;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .bottom {
    margin-top: 40px;
    @include flex-between;
  }
  .bottom-1 {
    margin-top: 40px;
    @include flex-between;
    justify-content: flex-end;
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
