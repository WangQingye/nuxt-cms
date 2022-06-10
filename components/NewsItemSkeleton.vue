<template>
  <el-skeleton class='list-item' :loading="loading" animated>
    <template slot="template">
      <div class='img-container'>
        <el-skeleton-item variant="image" class="img" />
      </div>
      <div class="tags">
        <el-skeleton-item variant="text" />
      </div>
      <el-skeleton-item class='title' variant="text" />
      <el-skeleton-item class='desc' variant="text" />
    </template>
  </el-skeleton>
</template>
<script>
export default {
  props: {
    loading: {
      default: true
    }
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
