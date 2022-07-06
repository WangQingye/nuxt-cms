<template>
  <div @click="clickPerson">
    <div class='person-item-search' v-if="type === 'search'">
      <img class="img" :src="itemData.avatar|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
      <div class="right">
        <p class="name">{{itemData.name}}</p>
        <p class="position">{{itemData.job_content}}</p>
        <p class="position">{{itemData.post}}</p>
      </div>
    </div>
    <div class='person-item-list' v-if="type === 'list'" :style="{backgroundImage:`url(${$utils.cloudImg(itemData.avatar)})`}">
      <div class="info">
        <p class="name">{{itemData.name}}</p>
        <div class="line"></div>
        <div class="bottom">
          <p class="position">{{itemData.job_content}}</p>
          <p class="position">{{itemData.post}}</p>
        </div>
      </div>
    </div>
    <div class='person-item-department' v-if="type === 'department'">
      <img class="img" :src="itemData.avatar|cloudImage" alt="logo" :onerror="$utils.getDefaultImg()">
      <div class="right">
        <p class="name">{{itemData.name}}</p>
        <div class="line"></div>
        <p class="position">{{itemData.job_content}}</p>
        <p class="position" style="margin-bottom: 25px;">{{itemData.post}}</p>
        <p class="desc">{{itemData.intro}}</p>
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
          avatar: '/backend/file/upload/b93cab64ff2e771304b6a953e6436fe6.png',
          id: '623c925ec14d4055b60a4b8c4c44d5fc',
          intro: '发的萨芬大师傅',
          job_content: '发的萨芬大师傅',
          name: '胡一刀',
          post: '放大佛挡杀佛',
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
  methods: {
    clickPerson() {
      if (this.$route.query.menuIds) {
        this.$router.push(`/content/person-detail?params=${this.itemData.id}&menuIds=${this.$route.query.menuIds}`)
      } else {        
        let menuIds = this.$utils.findMenuIdsByEventLink(this.$store.state.config.menuList, this.itemData.tags[0].tag)
        this.$router.push(`/content/person-detail?params=${this.itemData.id}&menuIds=${menuIds.join(',')}`)
      }
    },
  },
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
      @include ellipsisBasic(1);
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
    padding-top: 20px;
    color: white;
    width: 100%;
    .name {
      padding: 0 20px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .line {
      width: 20px;
      margin-left: 20px;
      height: 2px;
      background: $--color-primary;
    }
    .bottom {
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0)
      );
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 0 0 5px 5px;
      .position {
        font-size: 13px;
        line-height: 21px;
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
    width: 162px;
    height: 220px;
    border-radius: 4px;
    margin-right: 20px;
  }
  .right {
    min-height: 220px;
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
    .right {
      background: $--color-primary-light;
    }
    .link {
      opacity: 1;
    }
  }
}
</style>
