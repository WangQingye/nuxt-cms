<template>
  <div class="mobile-home">
    <el-carousel :interval="3000" arrow="never" height="3.8rem" indicator-position="none">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <div class="carousel-item" :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}">
          <p class="big-text" v-html="item.title">{{ item.title }}</p>
          <p class="small-text">{{ item.sub_title }}</p>
          <p class="button" v-if="item.event_name" @click="$router.push(item.event_link)">{{ item.event_name }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="menu-list">
      <div class="single-menu" v-for="menu in menuList" :key="menu.link" @click="$utils.goLink(menu.link)">
        <div class="top">
          <img class="menu-icon" :src="menu.icon|cloudImage" alt="icon" />
          <i class="el-icon-arrow-right" />
        </div>
        <p class="name">{{menu.name}}</p>
        <p class="desc">{{menu.desc}}</p>
      </div>
    </div>
    <div class="main-container">
      <BigTitleMobile cn-text="中心要闻" en-text="SIC NEWS" :moreUrl="'a'" />
      <el-carousel :interval="3000" height="1.75rem" indicator-position="none">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <div class="carousel-item" :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}">
            <p class="big-text" v-html="item.title">{{ item.title }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="new-item-container">
        <div class="new-item" v-for="news in newsList" :key="news.id">
          <el-tag type="warning" class="tag">{{news.tag}}</el-tag>
          <p class="title">{{news.title}}</p>
        </div>
      </div>
      <BigTitleMobile cn-text="中心要闻" en-text="SIC NEWS" :moreUrl="'a'" style="margin-top:0.4rem" />
      <div class="new-item-container" style="margin-bottom: 0.3rem">
        <div class="new-item" v-for="news in newsList" :key="news.id">
          <el-tag type="primary" class="tag">{{news.date|parseTime('{m}月{d}日')}}</el-tag>
          <p class="title">{{news.title}}</p>
        </div>
      </div>
      <img src="~/static/imgs/sucaibg.jpg" class="big-news-img" />
      <div class="news-part-container" v-for="(newsPart,index) in newsParts" :key="index">
        <BigTitleMobile :cn-text="newsPart.cnText" :en-text="newsPart.enText" style="margin-top:0.4rem" />
        <div class="new-item" v-for="news in newsPart.newsList" :key="news.id" :style="{backgroundImage:`url(${$utils.cloudImg(news.cover)})`}">
          <p class="title">{{news.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconImg from '~/static/imgs/sucaibg.jpg'
export default {
  name: 'MobileHome',
  data() {
    return {
      bannerList: [],
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
      newsList: [
        {
          id: 1,
          tag: '党建工作',
          title: '党建工作党建工作党建工作党建工',
          date: '2022-02-28',
        },
        {
          id: 2,
          tag: '党建工作',
          title: '党建工党建工作党建工作党建工作',
          date: '2022-02-28',
        },
        {
          id: 3,
          tag: '党建工作',
          title: '党建工党建工作党建工作党建工作',
          date: '2022-02-28',
        },
        {
          id: 4,
          tag: '党建工作',
          title:
            '党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作',
          date: '2022-02-28',
        },
        {
          id: 5,
          tag: '党建工作',
          title:
            '党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作党建工作',
          date: '2022-02-28',
        },
      ],
      newsParts: [
        {
          cnText: '创业学院',
          enText: 'ENTREPRENEURSHIP',
          newsList: [
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 1,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 2,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 3,
            },
          ],
        },
        {
          cnText: '学生风采',
          enText: 'STUDENT',
          newsList: [
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 1,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 2,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 3,
            },
          ],
        },
        {
          cnText: '媒体聚焦',
          enText: 'MEDIA FOCUS',
          newsList: [
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 1,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 2,
            },
            {
              cover:
                'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
              title: '交大创业宣怀班介绍',
              id: 3,
            },
          ],
        },
      ],
    }
  },
  async asyncData(context) {
    let banner = await context.app.$api.banner.bannerList({ type: 'home'})
    let middleBanner = await context.app.$api.banner.bannerList({ type: 'home_middle'})
    let quickLink = await context.app.$api.banner.getQuickLink()
    let friendLink = await context.app.$api.banner.getFriendLink()
    console.log('ql',quickLink)
    console.log('fl',friendLink)
    console.log('middle', middleBanner)
    return {
      bannerList: banner,
      menuList: quickLink
    }
  },
  mounted() {
    //按照宽度375图算， 1rem = 100px;
    function changeSize() {
      document.documentElement.style.fontSize = `${
        document.body.clientWidth / 3.75
      }px`
    }
    changeSize()
    window.addEventListener('resize', changeSize, false)
  },
}
</script>

<style lang="scss" scoped>
.mobile-home {
  font-size: 0.12rem;
  background: #f2f4f7;
  padding-bottom: 0.4rem;
  .carousel-item {
    width: 100%;
    height: 3.8rem;
    background: $--color-primary;
    padding-top: 0.8rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
    color: white;
    background-size: 100% 100%;
    .big-text {
      font-size: 0.28rem;
      line-height: 0.4rem;
      font-weight: bold;
    }
    .small-text {
      margin: 0.14rem 0 0.23rem 0;
      line-height: 0.15rem;
    }
    .button {
      width: 1.15rem;
      height: 0.3rem;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid #ffffff;
      line-height: 0.3rem;
      text-align: center;
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .menu-list {
    width: 100%;
    z-index: 3;
    position: relative;
    margin-top: -0.45rem;
    margin-bottom: 0.37rem;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .single-menu {
      cursor: pointer;
      background: white;
      display: inline-block;
      border-radius: 4px;
      height: 1.14rem;
      width: 1.47rem;
      padding: 0.1rem;
      box-sizing: border-box;
      margin-right: 0.04rem;
      .top {
        @include flex-between;
        margin-bottom: 0.27rem;
        .menu-icon {
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 0.04rem;
        }
      }
      .name {
        font-size: 0.12rem;
        color: #1a1a1a;
        font-weight: bold;
        margin-bottom: 0.07rem;
      }
      .desc {
        width: 100%;
        font-size: 0.1rem;
        @include ellipsisBasic(1);
        color: #999;
      }
    }
  }
  .main-container {
    padding: 0 0.2rem;
    .new-item-container {
      background: white;
      border-radius: 0.03rem;
      padding: 0 0.1rem;
      .new-item {
        @include flex-between;
        justify-content: flex-start;
        border-bottom: 0.01rem solid #f2f4f7;
        padding: 0.1rem 0;
        .tag {
          font-size: 0.1rem;
          margin-right: 0.12rem;
        }
        .title {
          @include ellipsisBasic(1);
          font-size: 0.12rem;
          font-weight: bold;
          color: #4d4d4d;
        }
      }
    }
    .big-news-img {
      width: 100%;
      height: 0.54rem;
    }
    .news-part-container {
      .new-item {
        width: 100%;
        height: 1.6rem;
        border-radius: 0.04rem;
        margin-bottom: 0.07rem;
        display: flex;
        .title {
          color: white;
          align-self: flex-end;
          padding: 0 0 0 0.15rem;
          box-sizing: border-box;
          @include ellipsisBasic(1);
          line-height: 0.3rem;
          background-image: linear-gradient(to top , rgba(0,0,0,0.2), rgba(0,0,0,0));
          width: 100%;
        }
      }
    }
  }
}
</style>
