<template>
  <div class='list-item' @click="clickNew">
    <img class="img" :src="itemData.thumb|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
    <div class="right">
      <div class="top">
        <el-tag class="tag" type="primary" v-if="itemData.isNew">新</el-tag>
        <el-tag class="tag" type="primary" v-if="itemData.is_top" style="float: right"><i class="el-icon-top icon"></i>置顶
        </el-tag>
        <el-tag class="tag" type="warning" v-if="itemData.category.name && showCategory">{{itemData.category.name}}</el-tag>
        <p class='title'>{{ itemData.title }}</p>
      </div>
      <p class='desc'>{{ itemData.digest }}</p>
      <el-tag class="tag" style="font-weight: normal;margin-top: 12px;" type="primary" size="small">{{itemData.publish_at|parseTime('{y}-{m}-{d}')}}</el-tag>
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
          title: '标题',
          digest:
            '第七届中国国际“互联网+”大学生创新创业大赛总决赛在南昌大学举行。重庆大学的创新创业团队表现优异，7件入围总决赛答辩项目获得了5金2银的历史最好成绩。此次比赛，交大不仅金奖数量及获奖总数创历史新高，而且实现了红旅赛道历史首金的突破，并获上海市的“先进集体奖”。',
          thumb:
            'https://tse2-mm.cn.bing.net/th/id/OIP-C.18-23IyhMHV0DyhI4Rp-hAHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        }
      },
    },
    showCategory: {
      type: Boolean,
      default: false,
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
  height: 130px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f5f5f7;
  color: #1a1a1a;
  cursor: pointer;
  @include flex-between();

  &:hover {
    background: $--color-primary-light;
  }

  .img {
    width: 120px;
    height: 110px;
    border-radius: 4px;
    margin-right: 20px;
  }
  .right {
    width: 100%;
    height: 110px;
    flex: 1;
    .top {
      @include flex-between;
      justify-content: flex-start;
      margin-bottom: 10px;

      .title {
        font-size: 15px;
        font-weight: bold;
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .tag {
      height: 20px;
      line-height: 18px;
      font-weight: bold;
      margin-right: 10px;

      .icon {
        margin-right: 5px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
    .desc {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 21px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 45px;
    }
  }
}
</style>
