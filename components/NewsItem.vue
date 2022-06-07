<template>
  <div class='list-item' @click="$router.push(`/news/detail/${itemData.id}?key=${itemData.category_id}`)">
    <div class='img-container'>
      <img class="img" :src="itemData.cover|cloudImage" alt="logo">
      <div class="img-cover">
        <p>阅读全文</p>
      </div>
    </div>
    <div class="tags">
      <el-tag class="tag" type="info" v-if="itemData.isNew">新</el-tag>
      <el-tag class="tag" type="info" v-if="itemData.is_top" style="float: right"><i class="el-icon-top icon"></i>置顶
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
          id: undefined,
          is_top: false,
          title: '标题',
          digest: undefined,
          cover: undefined,
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
