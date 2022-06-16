<template>
  <div class="home">
    <!-- <client-only> -->
      <HomeSwiper />
    <!-- </client-only> -->
    <div class="main-container">
      <el-row class="menu-list" :gutter="20">
        <el-col v-for="menu in menuList" :key="menu.url" :span="4">
          <div class="single-menu">
            <div class="top">
              <img class="menu-icon" :src="menu.icon" alt="icon" />
              <i class="el-icon-arrow-right" />
            </div>
            <p class="name">{{menu.name}}</p>
            <p class="desc">{{menu.desc}}</p>
          </div>
        </el-col>
      </el-row>
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

          <el-carousel :interval="3000" class="swiper" height="400px" indicator-position="none">
            <el-carousel-item v-for="item in menuList" :key="item.id">
              <div class="swiper-item" :style="{backgroundImage:`url(${item.icon})`}">
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
          <BigTitle cn-text="通知公告" en-text="NOTIFICATION" />
          <div class="list-container" style="height: 100%">
            <div class="list-item" v-for="item in news" :key="item.id">
              <el-tag type="primary">{{item.tag}}</el-tag>
              <p class="desc desc-1">{{item.desc}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="activity" :style="{backgroundImage:`url(https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7)`}">
        <div class="title">
          <p>
            第六届中国国际“互联网+”大学生创新创业大赛上海赛区 暨“青年红色筑梦之旅”活动正式启动
          </p>
        </div>
        <!-- <img class="img" src="~/static/imgs/sucaibg.jpg" alt="link" /> -->
        <i class="el-icon-arrow-right link-arrow"></i>
      </div>
      <div class="sub-news" v-for="subNew in subNews" :key="subNew.name">
        <BigTitle :cn-text="subNew.name" :en-text="subNew.enName" />
        <el-row class="sub-new-list" :gutter="20">
          <el-col v-for="(newItem,index) in subNew.news" :key="newItem.id" :span="newItem.span">
            <div class="sub-item" :style="{backgroundImage:`url(${newItem.img})`}">
              <p class="name">{{newItem.name}}</p>
              <span class="link" v-show="!index">点击查看<i class="el-icon-arrow-right"></i></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bottom-links">
      <img src="~/static/imgs/sucaibg.jpg" class="icon" />
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
import iconImg from '~/static/imgs/sucaibg.jpg'
export default {
  // components: {
  //   BigTitle,
  //   NewsItem,
  //   ModelItem,
  //   HomeSwiper,
  // },
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
      services: [],
      modelItems: [],
      menuList: [
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
        },
        {
          icon: iconImg,
          name: '设备申请',
          desc: '中心设备预约使用中心',
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
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 9,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 6,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
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
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 8,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 8,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
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
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '2',
              span: 6,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            },
            {
              name: '交大创业宣怀版介绍',
              id: '3',
              span: 6,
              img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
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
      .single-menu {
        cursor: pointer;
        background: white;
        border-radius: 4px;
        height: 200px;
        padding: 20px 24px;
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
          ::v-deep .swiper-pagination {
            text-align: right;
            right: 30px;
            bottom: 20px;

            .swiper-pagination-bullet {
              width: 5px;
              height: 5px;
              background: #ffffff;
              opacity: 0.45;
              border-radius: 50%;
              margin-right: 10px;
            }

            .swiper-pagination-bullet-active {
              width: 25px;
              border-radius: 3px;
              opacity: 1;
            }
          }
        }
        .list-container {
          min-height: 225px;
        }
      }
      .right {
        min-height: 100%;
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

    }
    .activity {
      cursor: pointer;
      position: relative;
      width: 100%;
      padding-bottom: 16%;
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
        @include flex-between(flex-end);
        cursor: pointer;
        width: 100%;
        height: 300px;
        background-size: cover;
        color: white;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 4px;
        transition: all 0.3s linear;
        .name {
          font-size: 26px;
        }
        .link {
          color: #fefefe;
          font-size: 12px;
          &:hover {
            text-decoration: underline;
          }
        }
        &:hover {
          transition-timing-function: ease-in-out;
          box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
          transform: translateY(-8px);
        }
      }
    }
  }
  .bottom-links {
    @include flex-between(flex-start);
    justify-content: flex-start;
    padding: 60px 10%;
    background: white;
    color: #1a1a1a;
    .icon {
      width: 38px;
      height: 38px;
      margin-right: 15%;
    }
    .links {
      margin: 0 5%;
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
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
