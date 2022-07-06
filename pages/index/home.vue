<template>
  <div class="home">
    <!-- 顶部banner -->
    <HomeSwiper :list="bannerList" />
    <div class="main-container">
      <!-- 快捷菜单 -->
      <el-row class="menu-list"
        :gutter="8">
        <el-col v-for="menu in menuList"
          :key="menu.link"
          :span="4">
          <div class="single-menu"
            @click="$utils.goLink(menu.link)">
            <div class="top">
              <img class="menu-icon"
                :src="menu.icon|cloudImage"
                alt="icon" />
              <i class="el-icon-arrow-right" />
            </div>
            <p class="name">{{menu.name}}</p>
            <p class="desc">{{menu.desc}}</p>
          </div>
        </el-col>
      </el-row>
      <!-- 中部新闻 -->
      <el-row class="news"
        :gutter="20">
        <img class="back"
          src="~/static/imgs/home/list-back.png">
        <el-col :span="14"
          class="left">
          <BigTitle cn-text="中心要闻"
            en-text="SIC NEWS"
            showMoreUrl
            :newsId="homeNewsId" />
          <el-carousel :interval="3000"
            class="swiper"
            height="400px">
            <el-carousel-item v-for="item in homeNewsList.slice(0,3)"
              :key="item.id">
              <div class="swiper-item"
                :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}"
                @click="clickNews('中心要闻', item.id)">
                <p class="desc"
                  v-html="item.title">{{ item.title }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="list-container">
            <div class="list-item"
              v-for="item in homeNewsList.slice(3)"
              :key="item.id"
              @click="clickNews('中心要闻', item.id)">
              <el-tag type="warning">{{item.tags[0]}}</el-tag>
              <p class="desc">{{item.title}}</p>
              <p class="date">{{item.publish_at|parseTime('{y}-{m}-{d}')}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="10"
          class="right">
          <BigTitle cn-text="通知公告"
            en-text="NOTIFICATION"
            showMoreUrl
            :newsId="homeNoticeId" />
          <div class="list-container"
            style="height: 100%">
            <div class="list-item"
              v-for="item in homeNoticeList"
              :key="item.id"
              @click="clickNews('通知公告', item.id)">
              <el-tag type="primary">{{item.publish_at|parseTime('{y}-{m}-{d}')}}</el-tag>
              <p class="desc desc-1">{{item.title}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 中部广告 -->
      <el-carousel :interval="3000"
        height="260px"
        arrow="never"
        indicator-position="none">
        <el-carousel-item v-for="item in middleBanner"
          :key="item.id">
          <div class="activity"
            :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}"
            @click="$utils.goLink(item.event_link)">
            <i class="el-icon-arrow-right link-arrow"></i>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- 底部新闻板块 -->
      <div class="sub-news"
        v-for="subNew in subNews"
        :key="subNew.name">
        <BigTitle :cn-text="subNew.name"
          :en-text="subNew.enName" />
        <el-row class="sub-new-list"
          :gutter="20">
          <el-col v-for="(newItem,index) in subNew.news"
            :key="newItem.id"
            :span="newItem.span">
            <div class="sub-item"
              @click="$utils.goLink(newItem.link)">
              <div class="back-img"
                :style="{backgroundImage:`url(${$utils.cloudImg(newItem.cover)})`}"></div>
              <div class="back-mask"></div>
              <div class="bottom">
                <p class="name">{{newItem.name}}</p>
                <span class="link"
                  v-show="!index">点击查看<i class="el-icon-arrow-right"></i></span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 底部链接 -->
    <div class="bottom-links">
      <img src="~/static/imgs/home/logo_02@2x.png"
        class="icon" />
      <el-row class="links-wrapper"
        :gutter="20">
        <el-col v-for="links in bottomLinkList"
          :key="links.title"
          :span="6">
          <div class="links">
            <p class="link-title">{{links.title}}</p>
            <template v-for="link in links.links">
              <el-popover :key="link.name"
                v-if="link.wechatQrImg"
                placement="bottom-start"
                width="200"
                trigger="hover">
                <p class="link"
                  slot="reference"
                  :key="link.name"
                  @click="$utils.goLink(link.link)">
                  {{link.name}}
                </p>
                <img :src="link.wechatQrImg|cloudImage"
                  style="width:200px;height:200px" />
              </el-popover>
              <p class="link"
                v-else-if="link.name=='联系我们'"
                :key="link.name"
                @click="goMenu('合作联系')">
                {{link.name}}
              </p>
              <p class="link"
                v-else
                :key="link.name"
                @click="$utils.goLink(link.link)">
                {{link.name}}
              </p>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      news: [
        {
          tag: '党建工作',
          desc: '党建工作党建工作党建工作党建工',
          date: '2022-02-28',
        },
        {
          tag: '党建工作',
          desc: '党建工党建工作党建工作党建工作',
          date: '2022-02-28',
        },
        {
          tag: '党建工作',
          desc: '党建工党建工作党建工作党建工作',
          date: '2022-02-28',
        },
        {
          tag: '党建工作',
          desc: '党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作',
          date: '2022-02-28',
        },
      ],
      menuList: [],
      subNews: [],
      bottomLinkList: [
        {
          title: '常用链接',
          links: [
            {
              name: '上海交通大学官网1',
              url: '321312',
            },
            {
              name: '上海交通大学官网2',
              url: '321312',
            },
            {
              name: '上海交通大学官网3',
              url: '321312',
            },
          ],
        },
        {
          title: '快速入口',
          links: [
            {
              name: '软件授权中心',
              url: '321312',
            },
            {
              name: '3D打印中心',
              url: '321312',
            },
            {
              name: '设备信用中心',
              url: '321312',
            },
          ],
        },
        {
          title: '关注我们',
          links: [
            {
              name: '微信公众号',
              url: '321312',
            },
            {
              name: '上海交通大学学生创新中心',
              url: '321312',
            },
          ],
        },
        {
          title: '联系我们',
          links: [
            {
              name: '联系我们',
              url: '321312',
            },
            {
              name: '帮助中心',
              url: '321312',
            },
          ],
        },
      ],
      bannerList: [],
      middleBanner: [],
      homeNewsId: '',
      homeNoticeId: '',
      homeNewsList: [],
      homeNoticeList: [],
    }
  },
  async asyncData(context) {
    // banner
    let banner = await context.app.$api.banner.bannerList({ type: 'home' })
    let middleBanner = await context.app.$api.banner.bannerList({
      type: 'home_middle',
    })
    // 顶部链接
    let quickLink = await context.app.$api.banner.getQuickLink()
    let friendLink = await context.app.$api.banner.getFriendLink()
    // 新闻
    let chuangye = await context.app.$api.banner.getHotPoint({
      type: 'chuangye',
    })
    let spans = [9, 9, 6]
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i]
      if (chuangye[i]) {
        chuangye[i].span = span
      }
    }
    let student = await context.app.$api.banner.getHotPoint({ type: 'student' })
    let spans1 = [8, 8, 8]
    for (let i = 0; i < spans1.length; i++) {
      const span = spans1[i]
      if (student[i]) {
        student[i].span = span
      }
    }
    let media = await context.app.$api.banner.getHotPoint({ type: 'media' })
    let spans2 = [12, 6, 6]
    for (let i = 0; i < spans1.length; i++) {
      const span = spans2[i]
      if (media[i]) {
        media[i].span = span
      }
    }
    let homeNewsId = context.app.store.state.config.webConfig.find(
      (c) => c.key == 'home_news'
    )
    const data = await context.app.$api.news.newsList({
      page: 1,
      limit: 10,
      category_id: homeNewsId.value,
    })
    let homeNewsList = data.list
    let homeNoticeId = context.app.store.state.config.webConfig.find(
      (c) => c.key == 'home_notice'
    )
    const data1 = await context.app.$api.news.newsList({
      page: 1,
      limit: 10,
      category_id: homeNoticeId.value,
    })
    let homeNoticeList = data1.list
    let wechatQrImg = context.app.store.state.config.webConfig.find(
      (c) => c.key == 'wechat_qr'
    )
    return {
      bannerList: banner,
      middleBanner,
      menuList: quickLink,
      bottomLinkList: [
        {
          title: '常用链接',
          links: friendLink,
        },
        {
          title: '快速入口',
          links: quickLink,
        },
        {
          title: '关注我们',
          links: [
            {
              name: '上海交通大学学生创新中心',
              wechatQrImg: wechatQrImg.value,
            },
          ],
        },
        {
          title: '联系我们',
          links: [
            {
              name: '联系我们',
              url: '321312',
            },
            {
              name: '帮助中心',
              url: '321312',
            },
          ],
        },
      ],
      subNews: [
        {
          name: '创业学院',
          enName: 'ENTREPRENEURSHIP',
          news: chuangye.slice(0, 3),
        },
        {
          name: '学生风采',
          enName: 'STUDENT',
          news: student.slice(0, 3),
        },
        {
          name: '媒体聚焦',
          enName: 'MEDIA FOUCUS',
          news: media.slice(0, 3),
        },
      ],
      homeNewsId: homeNewsId.value,
      homeNoticeId: homeNoticeId.value,
      homeNewsList,
      homeNoticeList,
    }
  },
  mounted() {},
  methods: {
    clickNews(menuTitle, newsId) {
      let ids = this.$utils.findMenuIdsByTitle(
        this.$store.state.config.menuList,
        menuTitle
      )
      this.$router.push(`/content/news-detail?menuIds=${ids}&params=${newsId}`)
    },
    goMenu(title) {
      let ids = this.$utils.findMenuIdsByTitle(
        this.$store.state.config.menuList,
        title
      )
      let item = this.$utils.findMenuItemByTitle(
        this.$store.state.config.menuList,
        title
      )
      let subPage = this.$utils.typeToPages[item.event_type]
      if (!subPage) {
        this.$message.error('暂无联系方式')
        return
      }
      this.$router.push(
        `/content/${subPage}?menuIds=${ids}&params=${item.event_link}&singlePage=1`
      )
    },
  },
  computed: {},
}
</script>
<style lang='scss'>
// .main {
//   background: linear-gradient(
//     180deg,
//     $--color-primary 600px,
//     #fbfbfa 0
//   ) !important;
// }
</style>
<style scoped lang='scss'>
.home {
  min-height: calc(100vh - 121px);
  .main-container {
    padding: 100px 10%;
    background: #f2f4f7;
    .menu-list {
      width: 100%;
      z-index: 3;
      position: relative;
      margin-top: -150px;
      margin-bottom: 60px;
      // @include flex-between;
      .single-menu {
        cursor: pointer;
        background: white;
        border-radius: 4px;
        height: 200px;
        padding: 20px 24px;
        // margin-right: 8px;
        box-sizing: border-box;
        // padding-bottom: 80%;
        transition: all 0.3s linear;
        .top {
          @include flex-between;
          margin-bottom: 38px;
          .menu-icon {
            width: 50px;
            height: 50px;
            border-radius: 16px;
          }
        }
        .name {
          font-size: 18px;
          color: #1a1a1a;
          font-weight: bold;
          margin-bottom: 14px;
          @include ellipsisBasic(1);
        }
        .desc {
          width: 100%;
          @include ellipsisBasic(1);
          color: #999;
        }
        &:hover {
          transition-timing-function: ease-in-out;
          box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
          transform: translateY(-8px);
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .news {
      position: relative;
      margin-bottom: 50px;
      .back {
        position: absolute;
        width: 100%;
        right: -100px;
        // opacity: 0.3;
        height: 100%;
        z-index: 1;
      }
      .left {
        position: relative;
        z-index: 2;
        .swiper {
          .swiper-item {
            width: 100%;
            // padding-bottom: 50%;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
            position: relative;
            background-size: cover;
            height: 400px;
            .desc {
              position: absolute;
              left: 40px;
              bottom: 40px;
              color: #fefefe;
              font-size: 20px;
              line-height: 30px;
              width: 80%;
              @include ellipsisBasic(2);
            }
          }
          ::v-deep .el-carousel__indicators--horizontal {
            left: 90%;
            bottom: 2%;
            .el-carousel__button {
              width: 5px;
              height: 5px;
              background: #ffffff;
              opacity: 0.45;
              border-radius: 50%;
              margin-right: 10px;
            }

            .is-active .el-carousel__button {
              width: 25px;
              border-radius: 3px;
              opacity: 1;
            }
          }
        }
        .list-container {
          min-height: 226px;
        }
      }
      .right {
        min-height: 100%;
        position: relative;
        z-index: 2;
        .list-container {
          min-height: 625px;
        }
      }
      .list-container {
        width: 100%;
        background: rgba(255, 255, 255, 0.9);
        box-sizing: border-box;
        .list-item {
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #f2f4f7;
          padding: 10px 20px;
          .desc {
            @include ellipsisBasic(2);
            font-size: 16px;
            margin: 0 20px;
            line-height: 22px;
            flex: 1;
          }
          .desc-1 {
            @include ellipsisBasic(1);
          }
          .date {
            color: #999;
            font-size: 14px;
          }
          &:hover {
            background: $--color-primary-light;
          }
        }
      }
      .left {
        .list-item:last-child {
          border-bottom: none;
        }
      }
    }
    .activity {
      cursor: pointer;
      position: relative;
      width: 100%;
      padding-bottom: 16%;
      background-size: cover;
      .title {
        position: absolute;
        left: 0;
        top: 14%;
        padding: 0 10%;
        p {
          text-align: left;
          font-size: 54px;
          font-weight: bold;
          color: white;
          @include ellipsisBasic(2);
          line-height: 72px;
        }
      }
      // .img {
      //   width: 100%;
      //   height: 260px;
      //   object-fit: cover;
      // }
      .link-arrow {
        position: absolute;
        right: 20px;
        top: 20px;
        background: white;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
      }
    }
    .sub-news {
      margin-top: 50px;
      .sub-item {
        cursor: pointer;
        @include flex-between(flex-end);
        width: 100%;
        height: 300px;
        background-size: cover;
        color: white;
        box-sizing: border-box;
        border-radius: 4px;
        transition: all 0.5s ease-in-out;
        // background-position: center;
        // background-size: cover;
        position: relative;
        overflow: hidden;
        .back-img {
          width: 100%;
          position: absolute;
          height: 300px;
          left: 0;
          top: 0;
          background-size: cover;
          z-index: 1;
          transition: all 0.5s ease-in-out;
        }
        .back-mask {
          width: 100%;
          position: absolute;
          z-index: 2;
          height: 300px;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.5s ease-in-out;
        }
        .bottom {
          @include flex-between;
          width: 100%;
          padding: 20px 20px;
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0)
          );
          position: relative;
          z-index: 3;
          .name {
            font-size: 20px;
          }
          .link {
            color: #fefefe;
            font-size: 12px;
            transition: all 0.5s ease-in-out;
            &:hover {
              color: $--color-primary;
              // text-decoration: underline;
            }
          }
        }
        &:hover {
          transition-timing-function: ease-in-out;
          // background-size: cover;
          .back-img {
            transform: scale(1.1);
          }
          .back-mask {
            background: rgba(0, 0, 0, 0);
          }
        }
      }
    }
  }
  .bottom-links {
    @include flex-between(flex-start);
    justify-content: space-between;
    padding: 60px 10%;
    background: white;
    color: #1a1a1a;
    .icon {
      // width: 38px;
      height: 38px;
      margin-right: 5%;
    }
    .links-wrapper {
      flex: 1;
      .links {
        // margin: 0 2%;
        min-width: 140px;
        .link-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .link {
          margin-bottom: 10px;
          line-height: 20px;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
          &:hover {
            color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>
