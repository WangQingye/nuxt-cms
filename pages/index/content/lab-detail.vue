<template>
  <div :class="['lab-detail']">
    <div class="top">
      <div class="left">
        <el-tag class='tag' type="primary" style="margin-right: 10px" v-for="(tag,index ) in labDetail.tags" :key="index">{{
            tag
          }}
        </el-tag>
        <!-- <el-tag class='tag' type="warning">{{ labDetail.publish_at|parseTime('{y}年{m}月{d}日') }}</el-tag> -->
      </div>
      <el-button type="warning" class="button" @click="$router.back()">关闭返回</el-button>
    </div>
    <div class="detial">
      <div class="base">
        <img class="img" :src="labDetail.img|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{labDetail.name}}</p>
          <div class="line"></div>
          <p class="position" style="margin-bottom: 20px">{{labDetail.desc}}</p>
          <p class="position">所在所系：{{labDetail.department}}</p>
          <p class="position">办公电话：{{labDetail.phone}}</p>
          <p class="position">通讯地址：{{labDetail.address}}</p>
          <p class="position">电子邮件：{{labDetail.email}}</p>
          <p class="position">个人主页：{{labDetail.page }}</p>
        </div>
      </div>
      <div v-html="labDetail.content"></div>
    </div>
  </div>
</template>
<script>
import { imgDomain } from '@/config'
export default {
  data() {
    return {
      labDetail: {
        id: undefined,
        tags: ['实验室'],
        img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        name: '机器人中心实验室',
        phone: '021-1111111',
        desc: '在这里，丰富的机器人实践平台，专业的课程教学与技术指导，将成就你的机器人梦想!',
        address: 'sadasdasdsa地址',
        manager: '张三李四',
        email: 'dasdasdas@qq.com',
        page: 'http://dasdsadas.com',
        content:
          '<p>实验室介绍</p><p>实验室介绍</p><p>实验室介绍</p>',
      },
      imgDomain,
    }
  },
  async asyncData(context) {
    // let data = await context.app.$api.person.labDetail({ id: context.route.query.id })
    // console.log(context.route)
    // console.log(context.app.$refs)
    // return { news: data }
  },
  mounted() {},
  methods: {
    async fetchData() {
      const { data } = await newsDetail({ id: this.news.id })
      this.news = data
      this.$refs.detail.innerHTML = data.content.replace(
        /src="\.\.\/media/g,
        `src="${imgDomain}`
      )
    },
  },
}
</script>
<style lang='scss'>
.content-print {
  border-bottom: 1px solid #f2f2f2;
  padding: 0 20px;
  padding-bottom: 50px;
  line-height: 25px;
  img {
    max-width: 100%;
    height: auto;
  }
  h1 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 23px;
  }
  h2 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 20px;
  }
  h3 {
    color: #444444;
    line-height: 1.5;
    letter-spacing: 0.2px;
    font-size: 18px;
  }
  h4 {
    color: #444444;
    line-height: 1;
    letter-spacing: 0.2px;
    font-size: 17px;
  }
}
</style>
<style scoped lang='scss'>
.lab-detail {
  width: 100%;

  .top {
    @include flex-between;
  }
  .detial {
    margin-top: 15px;
    .base {
      @include flex-between(flex-start);
      justify-content: flex-start;
      margin-bottom: 30px;
      padding-bottom: 50px;
      border-bottom: 1px solid #EAEEF5;
      .img {
        width: 250px;
        height: 340px;
        border-radius: 5px;
        margin-right: 70px;
      }
      .base-info {
        margin-top: 60px;
        .name {
          font-size: 30px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .line {
          width: 20px;
          height: 2px;
          background: $--color-primary;
          margin-top: 20px;
          margin-bottom: 15px;
        }
        .position {
          font-size: 15px;
          color: #1a1a1a;
          line-height: 24px;
        }
      }
    }
  }
  .tag {
    height: 34px;
    line-height: 34px;
    border: none;

    i {
      font-size: 15px;
      line-height: 34px;
      font-weight: bold;
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  .button {
    line-height: 14px;
    border: none;
    font-size: 14px;
    font-weight: 400;
    color: #4d4d4d;
    background: #f7f7f7;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
