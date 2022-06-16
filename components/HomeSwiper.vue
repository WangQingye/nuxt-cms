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
  <el-carousel :interval="3000" class="swiper" arrow="never" indicator-position="none">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <div class="first-swiper" :style="{backgroundImage:`url(${$utils.cloudImg(item.cover)})`}">
        <p class="big-text" v-html="item.title">{{ item.title }}</p>
        <p class="small-text">{{ item.sub_title }}</p>
        <p class="button" v-if="item.event_name" @click="$router.push('/production')">{{ item.event_name }}</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
  name: "HomeSwiper",
  data() {
    return {
      list: [],
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
  async created() {
    const data = await this.$api.banner.bannerList({type: 'home'})
    console.log(data)
      this.list = data && data.map(o => {
        o.cover = this.$options.filters['cloudImage'](o.cover)
        return o
      })
      console.log(this.list)
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
    padding-top: 170px;
    height: 760px;
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
}
</style>
