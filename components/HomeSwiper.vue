<template>
  <!-- <swiper class="swiper" :options="swiperOptions">
    <swiper-slide v-for="(item,index) in list" :key="index">
      <div class="first-swiper" :style="{backgroundImage:`url(${item.cover})`}">
        <p class="big-text" v-html="item.title">{{ item.title }}</p>
        <p class="small-text">{{ item.sub_title }}</p>
        <p class="button" v-if="item.event_name" @click="$router.push('/production')">{{ item.event_name }}</p>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper> -->
  <el-carousel :interval="3000" height="760px" class="swiper" arrow="never" trigger="click">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <div class="first-swiper" :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}">
        <p class="big-text" v-html="item.title">{{ item.title }}</p>
        <p class="small-text">{{ item.sub_title }}</p>
        <p class="button" v-if="item.event_name" @click="$utils.goLink(item.event_link)">{{ item.event_name }}</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import banner1 from '~/static/imgs/home/banner1.jpg'
import banner2 from '~/static/imgs/home/banner2.jpg'
import banner3 from '~/static/imgs/home/banner3.jpg'
export default {
  name: 'HomeSwiper',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // list: [{
      //   title: '测试标题',
      //   sub_title: '测试标题',
      //   event_name: '测试标题',
      //   cover: banner1
      // },{
      //   title: '测试标题2',
      //   sub_title: '测试标题',
      //   event_name: '测试标题',
      //   cover: banner2
      // },{
      //   title: '测试标题3',
      //   sub_title: '测试标题',
      //   event_name: '测试标题',
      //   cover: banner3
      // }],
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
    }
  },
  // async created() {
  //   const data = await this.$api.banner.bannerList({type: 'home'})
  //   console.log(data)
  //     this.list = data && data.map(o => {
  //       o.cover = this.$options.filters['cloudImage'](o.cover)
  //       return o
  //     })
  //     console.log(this.list)
  // },
  methods: {
    // clickBanner(banner) {
    //   let subPage = this.$utils.typeToPages[banner.event_type]
    //   subPage = this.$utils.typeToPages[banner.event_type]
    //   this.$router.push(
    //     `/content/${subPage}?param=${banner.event_link}`
    //   )
    // },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  margin-top: -80px;
  height: 760px;
  z-index: 1;

  .first-swiper {
    padding-left: 240px;
    display: flex;
    flex-direction: column;
    height: 760px;
    justify-content: center;
    box-sizing: border-box;
    background-image: url(~/static/imgs/sucaibg.jpg);
    background-repeat: no-repeat;
    background-size: cover;

    .big-text {
      font-size: 60px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
      line-height: 80px;
    }

    .small-text {
      width: 600px;
      height: 49px;
      font-size: 18px;
      color: #ffffff;
      font-weight: 400;
      line-height: 30px;
      margin-top: 20px;
    }

    .button {
      margin-top: 40px;
      width: 160px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid #ffffff;

      &:hover {
        opacity: 0.8;
      }
    }
  }
  ::v-deep .el-carousel__indicators--horizontal {
    left: 83%;
    bottom: 12%;
    .el-carousel__button {
      width: 40px;
      height: 5px;
      background: #ffffff;
      opacity: 0.45;
      margin-right: 10px;
    }
    .is-active .el-carousel__button {
      opacity: 1;
    }
  }
}
</style>
