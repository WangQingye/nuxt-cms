<template>
  <div @click="$router.push(`/content/person-detail?id=${itemData.id}&menuId=${$route.query.menuId}&subMenuId=${$route.query.subMenuId}`)">
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
        <div class="bottom">
          <p class="position">{{itemData.position}}</p>
          <p class="position">{{itemData.desc}}</p>
        </div>
      </div>
    </div>
    <div class='person-item-department' v-if="type === 'department'">
      <img class="img" :src="itemData.img|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
      <div class="right">
        <p class="name">{{itemData.name}}</p>
        <div class="line"></div>
        <p class="position">{{itemData.position}}</p>
        <p class="position">{{itemData.position1}}</p>
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
  border-radius: 0.04rem;
  position: relative;
  .info {
    position: absolute;
    bottom: 0;
    // padding-top: 0.2rem;
    color: white;
    .name {
      padding: 0 0.13rem;
      font-size: 0.13rem;
      font-weight: bold;
      margin-bottom: 0.08rem;
    }
    .line {
      width: 0.13rem;
      margin-left: 0.13rem;
      height: 0.01rem;
      background: $--color-primary;
    }
    .bottom {
      background-image: linear-gradient(to top , rgba(0,0,0,.5), rgba(0,0,0,0));
      width: 100%;
      padding: 0.13rem;
      box-sizing: border-box;
      border-radius: 0 0 0.04rem 0.04rem;
      .position {
        font-size: 0.08rem;
        line-height: 0.15rem;
        @include ellipsisBasic(1);
      }
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
    width: 1.11rem;
    height: 1.51rem;
    border-radius: 0.04rem;
    margin-right: 0.14rem;
  }
  .right {
    flex: 1;
    padding-top: 0.14rem;
    box-sizing: border-box;
    .name {
      font-size: 0.15rem;
      font-weight: bold;
      color: #4d4d4d;
    }
    .line {
      width: 0.14rem;
      height: 0.01rem;
      background: $--color-primary;
      margin-top: 0.08rem;
      margin-bottom: 0.11rem;
    }
    .position {
      font-size: 0.1rem;
      color: #4d4d4d;
      line-height: 0.15rem;
      @include ellipsisBasic(1);
    }
    .desc {
      margin-top: 0.14rem;
      font-size: 0.1rem;
      color: #666666;
      line-height: 0.15rem;
      @include ellipsisBasic(4);
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
