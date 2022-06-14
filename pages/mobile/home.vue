<template>
  <div class="mobile-home">
    <el-carousel :interval="3000"
      arrow="never"
      indicator-position="none">
      <el-carousel-item v-for="item in bannerList"
        :key="item.id">
        <div class="carousel-item"
          :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}">
          <p class="big-text"
            v-html="item.title">{{ item.title }}</p>
          <p class="small-text">{{ item.sub_title }}</p>
          <p class="button"
            v-if="item.event_name"
            @click="$router.push('/production')">{{ item.event_name }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="menu-list">
      <div class="single-menu" v-for="menu in menuList" :key="menu.url">
        <div class="top">
          <img class="menu-icon"
            :src="menu.icon"
            alt="icon" />
          <i class="el-icon-arrow-right" />
        </div>
        <p class="name">{{menu.name}}</p>
        <p class="desc">{{menu.desc}}</p>
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
    }
  },
  async asyncData(context) {
    const data = await context.app.$api.banner.bannerList({ type: 'home' })
    let bannerList = data
    console.log(bannerList)
    return { bannerList }
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
  .carousel-item {
    width: 100%;
    height: 3.8rem;
    background: $--color-primary;
    padding-top: 0.8rem;
    padding-left: 0.2rem;
    color: white;
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

    .menu-list {
      width: 100%;
      z-index: 3;
      position: relative;
      margin-top: -0.45rem;
      margin-bottom: 0.37px;
      .single-menu {
        cursor: pointer;
        background: white;
        border-radius: 4px;
        height: 1.14rem;
        width: 1.47rem;
        padding: 0.1rem;
        box-sizing: border-box;
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
}
</style>
