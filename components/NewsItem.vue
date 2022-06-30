<template>
  <div class='list-item' @click="$router.push(`/content/news-detail?id=${itemData.id}&menuId=${$route.query.menuId}&subMenuId=${$route.query.subMenuId}`)">
    <div class='img-container'>
      <img class="img" :src="itemData.cover|cloudImage" alt="logo">
      <div class="img-cover">
        <p>阅读全文</p>
      </div>
    </div>
    <div class="tags">
      <el-tag class="tag" type="primary" v-if="itemData.isNew">新</el-tag>
      <el-tag class="tag" type="primary" v-if="itemData.is_top" style="float: right"><i class="el-icon-top icon"></i>置顶
      </el-tag>
    </div>
    <p class='title'>{{ itemData.title }}</p>
    <p class='desc'>{{ itemData.digest }}</p>
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
          is_top: false,
          title: '标题',
          digest: "第七届中国国际“互联网+”大学生创新创业大赛总决赛在南昌大学举行。重庆大学的创新创业团队表现优异，7件入围总决赛答辩项目获得了5金2银的历史最好成绩。此次比赛，交大不仅金奖数量及获奖总数创历史新高，而且实现了红旅赛道历史首金的突破，并获上海市的“先进集体奖”",
          cover: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxy-IT_laAAP1DG9eVXQAALHwQC7EpUAA_Uk494.jpg',
          thumb: undefined,
        }
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang='scss'>
.list-item {
  width: 100%;
  color: #1a1a1a;
  cursor: pointer;

  &:hover {
    .title {
      color: #666666;
      transition-timing-function: ease-in-out;
    }

    .img-container {
      .img-cover {
        p {
          transform: scale(1, 1);
          transition-timing-function: ease-in-out;
        }

        transition-timing-function: ease-in-out;
        opacity: 1;
      }
    }
  }

  .img-container {
    position: relative;
    width: 100%;
    padding-top: 60%;
    box-sizing: border-box;
    // height: 195px;
    .img {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    .img-cover {
      transition: all 0.3s linear;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      border: 3px solid $--color-primary;
      border-radius: 4px;
      opacity: 0;
      display: flex;
      align-items: center;

      p {
        transition: all 0.3s linear;
        text-align: center;
        transform: scale(0, 1);
        color: #fff;
        width: 100%;
      }
    }
  }

  .tags {
    width: 100%;
    height: 30px;
    margin: 10px 0;

    .tag {
      height: 20px;
      line-height: 18px;
      font-weight: bold;

      .icon {
        margin-right: 5px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }

  .title {
    font-size: 15px;
    font-weight: bold;
    line-height: 22px;
    margin: 0px 0 20px 0;
    transition: all 0.5s linear;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .desc {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 21px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
