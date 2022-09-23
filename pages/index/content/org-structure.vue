<template>
  <div class="org-structure">
    <p class="title">{{config.defaultWebSiteName}} - 组织架构</p>
    <div class="content-wrapper">
      <div class="content" ref="content">
        <img class="bg-line" src="~/static/imgs/zuzhi/line-bg.svg" alt="logo">
        <div class="top-title box-shadow">
          <img class="logo" src="~/static/imgs/zuzhi/logo.svg">
        </div>
        <div class="middle">
          <div class="left">
            <div class="left-button box-shadow hover-move" style="margin-top:28px;margin-bottom: 43px;" @click="$utils.goLink(config.orgnizationStructure.left[0].link, config.orgnizationStructure.left[0].newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-1.svg" alt="logo">
              {{config.orgnizationStructure.left[0].title}}
            </div>
            <div class="left-button box-shadow hover-move" @click="$utils.goLink(config.orgnizationStructure.left[1].link, config.orgnizationStructure.left[1].newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-2.svg" alt="logo">
              {{config.orgnizationStructure.left[1].title}}
            </div>
          </div>
          <div class="right">
            <div class="right-button box-shadow hover-move" v-for="(part,index) in config.orgnizationStructure.right" :key="index" @click="$utils.goLink(part.link, part.newPage)">
              {{part.title}}
            </div>
          </div>
        </div>
        <div class="bottom">
          <div v-for="(part,index) in config.orgnizationStructure.bottom" class="part" :key="index">
            <div :class="['part-title', 'box-shadow', `part-title-${index}`]">{{part.title}}</div>
            <div class="child hover-move" v-for="(c,i) in part.children" :key="i" @click="$utils.goLink(c.link, part.newPage)">{{c.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from '@/config'

export default {
  data() {
    return {
      config,
    }
  },
  mounted() {
    window.onresize = resize
    let that = this
    function resize() {
      let nowWidth = window.innerWidth
      that.$refs.content.style.transformOrigin = `50% 0%`
      if (nowWidth < 1920) {
        let scale = nowWidth / 1700
        if (scale < 1400 / 1700) scale = 1400 / 1700
        that.$refs.content.style.transform = `scale(${scale})`
        that.$refs.content.style.height = 900 * scale + 'px'
      }
    }
    resize()
  },
}
</script>
<style scoped lang='scss'>
.org-structure {
  width: 100%;
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;
    margin: 70px 0;
  }
  .box-shadow {
    box-shadow: 1px 3px 5px 1px #e8f0ff;
    border: 1px solid #e8f0ff;
    border-radius: 5px;
  }
  .hover-move {
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
    }
  }
  .content-wrapper {
    @include flex-between;
    justify-content: center;
  }
  .content {
    position: relative;
    width: 1023px;
    .top-title {
      @include flex-between;
      justify-content: center;
      height: 90px;
      .logo {
        height: 40px;
        width: 194px;
      }
    }
    .bg-line {
      position: absolute;
      left: 0;
      top: -24px;
      width: 1023px;
      z-index: 2;
      pointer-events: none;
    }
    .top {
      width: 100%;
      margin-left: -2px;
    }
    .middle {
      @include flex-between;
      height: 280px;
      .left {
        margin-left: 13px;
        .left-button {
          position: relative;
          width: 278px;
          height: 97px;
          text-align: center;
          line-height: 97px;
        }
        .deco {
          width: 80px;
          height: 80px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 280px;
        margin-right: 23px;
        margin-top: 29px;
        .right-button {
          height: 48px;
          width: 275px;
          text-align: center;
          line-height: 48px;
        }
      }
    }
    .bottom {
      @include flex-between;
      align-items: flex-start;
      margin-top: 88px;
      padding: 0 10px;
      .part {
        .part-title {
          width: 159px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          margin-bottom: 10px;
          margin-left: 10px;
        }
        .child {
          width: 180px;
          min-height: 43px;
          text-align: center;
          @include flex-between;
          justify-content: center;
          line-height: 24px;
          border: 1px solid rgb(0, 72, 255);
          border-radius: 4px;
          background: white;
          position: relative;
          z-index: 3;
          margin-top: 10px;
        }
        .part-title-0 {
          margin-left: 6px;
        }
        .part-title-1 {
          margin-left: 6px;
        }
        .part-title-2 {
          margin-left: 6px;
        }
        .part-title-3 {
          margin-left: 4px;
        }
        .part-title-4 {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
