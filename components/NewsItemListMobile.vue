<template>
  <div class='list-item' @click="clickNew">
    <img class="img" :src="itemData.thumb|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
    <div class="right">
      <div class="top">
        <div class="top-left">
          <el-tag class="tag" type="primary" v-if="itemData.isNew">新</el-tag>
          <el-tag class="tag" type="primary" v-if="itemData.is_top" style="float: right"><i class="el-icon-top icon"></i>置顶
          </el-tag>
        </div>
        <span class="time">{{itemData.publish_at|parseTime('{m}-{d}')}}</span>
      </div>
      <p class='title'>{{ itemData.title }}</p>
      <!-- <p class='desc'>{{ itemData.digest }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          id: '87bc10c00baa42bb917908e89834ba83',
          title:
            '第七届中国国际“互联网+”大学生创新创业大赛总决赛在南昌大学举行。重庆大学的创新创业团队表现优异，7件入围总决赛答辩',
          digest:
            '第七届中国国际“互联网+”大学生创新创业大赛总决赛在南昌大学举行。重庆大学的创新创业团队表现优异，7件入围总决赛答辩项目获得了5金2银的历史最好成绩。此次比赛，交大不仅金奖数量及获奖总数创历史新高，而且实现了红旅赛道历史首金的突破，并获上海市的“先进集体奖”。',
          thumb:
            'https://ts1.cn.mm.bing.net/th/id/R-C.77987b680372887acc65ed8d58a9ba75?rik=Hx0zx3IHGhniLw&riu=http%3a%2f%2ftupian.sioe.cn%2fb%2fbing-home-image%2fpic%2f20140818.jpg&ehk=801LJ3t%2fhFQaU5x3M4NDlRwNeau%2budLrH0LW3ni0ahU%3d&risl=&pid=ImgRaw&r=0',
          is_new: true,
        }
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    clickNew() {
      let menuIds = this.$utils.findMenuIdsByEventLink(
        this.$store.state.config.menuList,
        this.itemData.category_id
      )
      this.$router.push(
        `/content/news-detail?params=${this.itemData.id}&menuIds=${menuIds.join(
          ','
        )}`
      )
    },
  },
}
</script>
<style scoped lang='scss'>
.list-item {
  width: 100%;
  height: 0.88rem;
  margin-bottom: 0.07rem;
  border-bottom: 0.01rem solid #f5f5f7;
  color: #1a1a1a;
  cursor: pointer;
  @include flex-between();

  &:hover {
    background: $--color-primary-light;
  }

  .img {
    width: 0.82rem;
    height: 0.75rem;
    border-radius: 0.04rem;
    margin-right: 0.2rem;
  }
  .right {
    width: 100%;
    // height: 0.88rem;
    height: 0.75rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .top {
      width: 100%;
      margin-bottom: 0.11rem;
      position: relative;
      .top-left {
        @include flex-between;
        justify-content: flex-start;
        // min-height: 0.24rem;
        // min-width: 0.1rem;
        .tag {
          height: 0.22rem;
          line-height: 0.18rem;
          padding: 0 0.05rem;
          font-weight: bold;
          margin-right: 0.1rem;

          .icon {
            margin-right: 0.05rem;
            font-weight: bold;
            vertical-align: middle;
          }
        }
      }
      .time {
        font-size: 0.1rem;
        color: #999;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .title {
      font-size: 0.12rem;
      font-weight: bold;
      line-height: 0.18rem;
      @include ellipsisBasic(2);
    }

    // .desc {
    //   font-size: 14rem;
    //   font-weight: 400;
    //   color: #666666;
    //   line-height: 21rem;
    //   display: -webkit-box;
    //   overflow: hidden;
    //   -webkit-line-clamp: 3;
    //   -webkit-box-orient: vertical;
    // }
  }
}
</style>
