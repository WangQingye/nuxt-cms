<template>
  <div class="org-structure">
    <div class="content-wrapper">
      <div class="content" ref="content">
        <img class="bg-line" src="~/static/imgs/zuzhi/line-bg-m.svg" alt="logo">
        <div class="top-title box-shadow">
          <img class="logo" src="~/static/imgs/zuzhi/logo.svg">
        </div>
        <div class="middle">
          <div class="left" style="margin-bottom: 37px">
            <div class="left-button box-shadow hover-move" @click="$utils.goLink(orgnizationStructure.left[0].link, orgnizationStructure.left[0].newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-1-m.svg" alt="logo">
              {{orgnizationStructure.left[0].title}}
            </div>
            <div class="left-button box-shadow hover-move" @click="$utils.goLink(orgnizationStructure.left[1].link, orgnizationStructure.left[1].newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-2-m.svg" alt="logo">
              {{orgnizationStructure.left[1].title}}
            </div>
          </div>
          <div class="left">
            <div class="left-button box-shadow hover-move" v-for="(part,index) in orgnizationStructure.right" :key="index" @click="$utils.goLink(part.link, part.newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-4-m.svg" alt="logo">
              {{part.title}}
            </div>
          </div>
        </div>
        <div class="bottom">
          <div v-for="(part,index) in orgnizationStructure.bottom" :class="['part', `part-${index}`]" :key="index">
            <div :class="['part-title', 'box-shadow', `part-title-${index}`]" @click="$utils.goLink(part.link, part.newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-3-m.svg" alt="logo">
              {{part.title}}
            </div>
            <div class="child hover-move" v-for="(c,i) in part.children" :key="i" @click="$utils.goLink(c.link, c.newPage)">
              <img class="deco" src="~/static/imgs/zuzhi/deco-3-m.svg" alt="logo">{{c.title}}
            </div>
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
      orgnizationStructure: {}
    }
  },
  async asyncData(context) {
    let data = await context.app.$api.department.getOrganization({})
    return {
      orgnizationStructure: data
    }
  },
  mounted() {
    window.onresize = resize
    let that = this
    function resize() {
      let nowWidth = window.innerWidth
      that.$refs.content.style.transformOrigin = `50% 0%`
      let scale = nowWidth / 375
      that.$refs.content.style.transform = `scale(${scale})`
      that.$refs.content.style.height = 1800 * scale + 'px'
    }
    resize()
  },
}
</script>
<style scoped lang='scss'>
.org-structure {
  width: 100%;
  overflow: hidden;
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;
    margin: 70px 0;
  }
  .box-shadow {
    box-shadow: 1px 2px 3px 1px #e8f0ff;
    border: 1px solid #e8f0ff;
    border-radius: 5px;
  }
  .hover-move {
    // transition: all 0.3s ease-in-out;
    // cursor: pointer;
    // &:hover {
    //   transform: translateY(-5px);
    // }
  }
  .content-wrapper {
    @include flex-between;
    justify-content: center;
  }
  .content {
    position: relative;
    width: 330px;
    font-size: 14px;
    .top-title {
      @include flex-between;
      justify-content: center;
      height: 40px;
      width: 100%;
      margin-bottom: 35px;
      .logo {
        width: 90px;
        height: 24px;
      }
    }
    .bg-line {
      position: absolute;
      left: 14px;
      top: 38px;
      width: 100px;
      z-index: 0;
      pointer-events: none;
    }
    .middle {
      .left {
        padding-left: 38px;
        .left-button {
          font-size: 14px;
          position: relative;
          width: 288px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          margin-bottom: 8px;
          background: white;
        }
        .deco {
          width: 26px;
          height: 26px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
    .bottom {
      margin-top: 38px;
      padding-left: 58px;
      .part {
        margin-bottom: 42px;
        .part-title {
          position: relative;
          width: 266px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          margin-bottom: 1px;
          background: white;
          position: relative;
          z-index: 2;
        }
        .child {
          position: relative;
          margin-left: 50px;
          width: 215px;
          height: 34px;
          text-align: center;
          line-height: 35px;
          border: 1px solid #bdd1ff;
          border-radius: 4px;
          background: white;
          position: relative;
          z-index: 2;
          margin-top: 8px;
        }
        .deco {
          width: 26px;
          height: 26px;
          position: absolute;
          right: 0;
          top: 0;
        }
        // .part-title-0 {
        //   margin-left: 6px;
        // }
        // .part-title-1 {
        //   margin-left: 6px;
        // }
        // .part-title-2 {
        //   margin-left: 6px;
        // }
        // .part-title-3 {
        //   margin-left: 4px;
        // }
        // .part-title-4 {
        //   margin-left: 4px;
        // }
      }
      .part-0 {
        margin-bottom: 43px;
      }
      .part-1 {
        margin-bottom: 52px;
      }
      .part-2 {
        margin-bottom: 58px;
      }
      .part-3 {
        margin-bottom: 37px;
      }
    }
  }
}
</style>
