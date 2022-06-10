<template>
  <div @click="$router.push(`/content/person-detail?id=${itemData.id}?key=${itemData.category_id}`)">
    <div class='person-item-search' v-if="type === 'search'">
      <img class="img" :src="itemData.img|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
      <div class="right">
        <p class="name">{{itemData.name}}</p>
        <p class="position">{{itemData.position}}</p>
        <p class="position">{{itemData.desc}}</p>
      </div>
    </div>
    <div class='person-item-list' v-if="type === 'list'" :style="{backgroundImage:`url(${itemData.img})`}">
      <div class="info">
        <p class="name">{{itemData.name}}</p>
        <div class="line"></div>
        <p class="position">{{itemData.position}}</p>
        <p class="position">{{itemData.desc}}</p>
      </div>
    </div>
    <div class='person-item-department' v-if="type === 'department'">
      <img class="img" :src="itemData.img|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
      <div class="right">
        <p class="name">{{itemData.name}}</p>
        <div class="line"></div>
        <p class="position">{{itemData.position}}</p>
        <p class="position" style="margin-bottom: 25px;">{{itemData.position1}}</p>
        <p class="desc">{{itemData.desc}}</p>
      </div>
      <span class="link">点击查看<i class="el-icon-arrow-right" style="margin-left:10px"></i></span>
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
          img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
          name: '武星域',
          position: '院长助理 \\ 副教授 航空航天学院',
          desc: '发动机推进与本科教学实验室建设',
        }
      },
    },
    type: {
      type: String,
      default: () => 'search',
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang='scss'>
.person-item-search {
  width: 100%;
  height: 150px;
  cursor: pointer;
  @include flex-between(flex-end);
  background: white;
  padding: 15px;
  box-sizing: border-box;
  &:hover {
    background: $--color-primary-light;
  }

  .img {
    width: 90px;
    height: 120px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .right {
    flex: 1;
    .name {
      font-size: 15px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
    .position {
      font-size: 13px;
      color: #4d4d4d;
      line-height: 21px;
      @include ellipsisBasic(2);
    }
  }
}
.person-item-list {
  padding-bottom: 136%;
  background-size: cover;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  .info {
    position: absolute;
    bottom: 0;
    padding: 20px;
    color: white;
    .name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .line {
      width: 20px;
      height: 2px;
      background: $--color-primary;
      margin-bottom: 15px;
    }
    .position {
      font-size: 13px;
      line-height: 21px;
      @include ellipsisBasic(1);
    }
  }
}
.person-item-department {
  width: 100%;
  cursor: pointer;
  @include flex-between(flex-start);
  box-sizing: border-box;
  position: relative;
  .img {
    width: 162px;
    height: 220px;
    border-radius: 4px;
    margin-right: 20px;
  }
  .right {
    flex: 1;
    border-bottom: 1px solid #e6e6e6;
    padding: 20px;
    box-sizing: border-box;
    .name {
      font-size: 20px;
      font-weight: bold;
      color: #4d4d4d;
    }
    .line {
      width: 20px;
      height: 2px;
      background: $--color-primary;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    .position {
      font-size: 13px;
      color: #4d4d4d;
      line-height: 21px;
      color: #4d4d4d;
      @include ellipsisBasic(2);
    }
    .desc {
      font-size: 14px;
      color: #999999;
      line-height: 18px;
    }
  }
  .link {
    position: absolute;
    right: 20px;
    top: 20px;
    opacity: 0;
    font-size: 14px;
    color: #4d4d4d;
  }
  &:hover {
    background: $--color-primary-light;
    .link {
      opacity: 1;
    }
  }
}
</style>
