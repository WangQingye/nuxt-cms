<template>
  <div :class="['news-detail']">
    <div class="top">
      <div class="left">
        <el-tag class='tag' style="margin-right: 10px" v-for="(tag,index ) in news.tags" :key="index">{{
            tag
          }}
        </el-tag>
        <el-tag class='tag' v-show="news.publish_at">{{ news.publish_at|parseTime('{y}年{m}月{d}日') }}</el-tag>
      </div>
    </div>
    <div id="content-print" class="content-print">
      <p style="font-size: 24px;font-weight: bold;color: #1a1a1a;line-height: 30px;border-bottom: 2px solid #f2f2f2;padding: 40px 0;margin-bottom: 30px;text-align: center;">
        {{ news.title || news.name }}
      </p>
      <div ref="detail" v-if="news.content" v-html='news.content.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
      <div class="attachments"
        v-show="news.attachment && news.attachment.length">
        <div
          v-for="(file,index) in news.attachment"
          :key="file.name">
          <p class="attachment" style="display: inline-block">
            附件{{index + 1}}：<span class="name" @click="$utils.goLink($utils.cloudImg(file.url))">{{file.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-show="!isSinglePage" class="bottom">
      <div class="left">
        <el-tag class='tag' type="warning" style="margin-right: 10px">
          <i class="el-icon-view" />
          {{ news.views }}
        </el-tag>
        <el-tag class='tag' :type="liked ? 'success' : 'info'" style="cursor:pointer" @click="clickLike">
          <i class="font_family icon-dianzan" />
          {{ news.like_num }}
        </el-tag>
      </div>
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
        tags: [],
      },
      // 是否已经点过赞
      liked: false,
      imgDomain,
      // 是否单页
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
    async clickLike() {},
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
    },
  },
}
</script>
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
