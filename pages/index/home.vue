<template>
  <div class="home">
    <!-- <client-only> -->
    <HomeSwiper />
    <!-- </client-only> -->
    <div class="main-container">
      <!-- <el-row class="menu-list" :gutter="20"> -->
      <!-- <el-col v-for="menu in menuList" :key="menu.url" :span="4"> -->
      <div class="menu-list">
        <div class="single-menu" v-for="menu in menuList" :key="menu.url" :span="4">
          <div class="top">
            <img class="menu-icon" :src="menu.icon" alt="icon" />
            <i class="el-icon-arrow-right" />
          </div>
          <p class="name">{{menu.name}}</p>
          <p class="desc">{{menu.desc}}</p>
        </div>
      </div>
      <!-- </el-col> -->
      <!-- </el-row> -->
      <el-row class="news" :gutter="20">
        <el-col :span="14" class="left">
          <BigTitle cn-text="中心要闻" en-text="SIC NEWS" />
          <!-- <swiper class="swiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in menuList" :key="index">
              <div class="swiper-item" :style="{backgroundImage:`url(${item.icon})`}">
                <p class="desc">通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告通</p>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper> -->

          <el-carousel :interval="3000" class="swiper" height="400px">
            <el-carousel-item v-for="item in newsList" :key="item.id">
              <div class="swiper-item" :style="{backgroundImage:`url(${item.cover})`}">
                <p class="desc" v-html="item.title">{{ item.title }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="list-container">
            <div class="list-item" v-for="item in news" :key="item.id">
              <el-tag type="warning">{{item.tag}}</el-tag>
              <p class="desc">{{item.desc}}</p>
              <p class="date">{{item.date}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="10" class="right">
          <img class="back" src="~/static/imgs/home/list-back.png">
          <BigTitle cn-text="通知公告" en-text="NOTIFICATION" />
          <div class="list-container" style="height: 100%">
            <div class="list-item" v-for="item in news" :key="item.id">
              <el-tag type="primary">{{item.date}}</el-tag>
              <p class="desc desc-1">{{item.desc}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="activity" :style="{backgroundImage:`url(${ad1})`}">
        <div class="title">
          <p>
            <!-- 第六届中国国际“互联网+”大学生创新创业大赛上海赛区 暨“青年红色筑梦之旅”活动正式启动 -->
          </p>
        </div>
        <!-- <img class="img" src="~/static/imgs/sucaibg.jpg" alt="link" /> -->
        <i class="el-icon-arrow-right link-arrow"></i>
      </div>
      <div class="sub-news" v-for="subNew in subNews" :key="subNew.name">
        <BigTitle :cn-text="subNew.name" :en-text="subNew.enName" />
        <el-row class="sub-new-list" :gutter="20">
          <el-col v-for="(newItem,index) in subNew.news" :key="newItem.id" :span="newItem.span">
            <!-- <div class="sub-item" :style="{backgroundImage:`url(${newItem.img})`}"> -->
            <div class="sub-item">
              <div class="back-img" :style="{backgroundImage:`url(${newItem.img})`}"></div>
              <div class="back-mask"></div>
              <!-- <img class="back-img" :src="newItem.img" alt=""> -->
              <div class="bottom">
                <p class="name">{{newItem.name}}</p>
                <span class="link" v-show="!index">点击查看<i class="el-icon-arrow-right"></i></span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom-links">
      <img src="~/static/imgs/home/logo_02@2x.png" class="icon" />
      <div class="links" v-for="links in bottomLinkList" :key="links.title">
        <p class="link-title">{{links.title}}</p>
        <p class="link" v-for="link in links.links" :key="link.name">
          {{link.name}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import { getIndexNews, getIndexDevice, getIndexModel } from '@/api/banner'
// import { mapActions } from 'vuex'
import icon1 from '~/static/imgs/home/entry_01.png'
import icon2 from '~/static/imgs/home/entry_02.png'
import icon3 from '~/static/imgs/home/entry_03.png'
import icon4 from '~/static/imgs/home/entry_04.png'
import icon5 from '~/static/imgs/home/entry_05.png'
import icon6 from '~/static/imgs/home/entry_06.png'
import news1 from '~/static/imgs/home/news-1.jpg'
import news2 from '~/static/imgs/home/news-2.jpg'
import ad1 from '~/static/imgs/home/ad1.jpg'
import b1 from '~/static/imgs/home/b-1.jpg'
import b2 from '~/static/imgs/home/b-2.jpg'
import b3 from '~/static/imgs/home/b-3.jpg'
import b4 from '~/static/imgs/home/b-4.jpg'
import b5 from '~/static/imgs/home/b-5.jpg'
import b6 from '~/static/imgs/home/b-6.jpg'
import b7 from '~/static/imgs/home/b-7.jpg'
import b8 from '~/static/imgs/home/b-8.jpg'
import b9 from '~/static/imgs/home/b-9.jpg'
export default {
  // components: {
  //   BigTitle,
  //   NewsItem,
  //   ModelItem,
  //   HomeSwiper,
  // },
  data() {
    return {
      ad1,
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
      services: [],
      modelItems: [],
      menuList: [
        {
          icon: icon1,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: icon2,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: icon3,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: icon4,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: icon5,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: icon6,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
      ],
      newsList: [
        {
          title: '新闻标题',
          cover: news1,
        },
        {
          title: '新闻标题1',
          cover: news2,
        },
      ],
      swiperOptions: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      subNews: [
        {
          name: '创业学院',
          enName: 'ENTREPRENEURSHIP',
          news: [
            {
              name: '交大创业宣怀版介绍',
              id: '1',
              span: 9,
              img: b1,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 9,
              img: b2,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 6,
              img: b3,
            },
          ],
        },
        {
          name: '学生风采',
          enName: 'STUDENT',
          news: [
            {
              name: '交大创业宣怀版介绍',
              id: '1',
              span: 8,
              img: b4,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 8,
              img: b5,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 8,
              img: b6,
            },
          ],
        },
        {
          name: '媒体聚焦',
          enName: 'MEDIA FOUCUS',
          news: [
            {
              name: '交大创业宣怀版介绍',
              id: '1',
              span: 12,
              img: b7,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 6,
              img: b8,
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 6,
              img: b9,
            },
          ],
        },
      ],
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
    }
  },
  mounted() {
    // this.fetchCraftList()
    // this.fetchCenterNews()
    // this.fetchCenterService()
    // this.fetchModelList()
  },
  methods: {
    // async fetchCenterNews() {
    //   const {
    //     data
    //   } = await getIndexNews()
    //   this.news = data
    // },
    // async fetchCenterService() {
    //   const {
    //     data
    //   } = await getIndexDevice()
    //   this.services = data
    // },
    // async fetchModelList() {
    //   const {
    //     data
    //   } = await getIndexModel()
    //   this.modelItems = data
    // },
    // ...mapActions({ fetchCraftList: 'craft/getCraftList' }),
  },
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
      @include flex-between;
      .single-menu {
        cursor: pointer;
        background: white;
        border-radius: 4px;
        height: 200px;
        padding: 20px 24px;
        margin-right: 8px;
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
      .left {
        .swiper {
          .swiper-item {
            width: 100%;
            // padding-bottom: 50%;
            border-radius: 4px 4px 0 0;
            position: relative;
            background-size: 100% 100%;
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
        .back {
          position: absolute;
          width: 100%;
          right: 0px;
          top: 100px;
          opacity: 0.3;
        }
        .list-container {
          min-height: 625px;
        }
      }
      .list-container {
        width: 100%;
        background: white;
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

      .right {
        .list-container {
          background: rgba(255, 255, 255, 0.9);
        }
      }
    }
    .activity {
      cursor: pointer;
      position: relative;
      width: 100%;
      padding-bottom: 16%;
      background-size: 100% 100%;
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
          background: rgba(0,0,0,.2);
          transition: all 0.5s ease-in-out;
        }
        .bottom {
          @include flex-between;
          width: 100%;
          padding: 20px 20px;
          background-image: linear-gradient(to top , rgba(0,0,0,0.6), rgba(0,0,0,0));
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
            background: rgba(0,0,0,0);
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
    .links {
      margin: 0 2%;
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
</style>
