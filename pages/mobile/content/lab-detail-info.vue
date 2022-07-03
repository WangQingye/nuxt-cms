<template>
  <div :class="['lab-detail']">
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
      <div v-html="labDetail.content" class="content-print-mobile"></div>
    </div>
    <div class="teachers">
      <el-tabs v-model="teacherTab">
        <el-tab-pane label="中心教师" name="teacher"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <PersonItemMobile class="person-item" type="list" v-for="i in 4" :key="i" />
      </div>
    </div>
    <div class="news">
      <el-tabs v-model="teacherTab">
        <el-tab-pane label="部门动态" name="teacher"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <NewsItemListMobile class="list-way-item" v-for="i in 3" :key="i" />
      </div>
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
        content: '<p>实验室介绍</p><p>实验室介绍</p><p>实验室介绍</p>',
      },
      imgDomain,
      teacherTab: 'teacher',
    }
  },
  async asyncData(context) {
    let data = await context.app.$api.department.labDetail({ id: context.route.query.params })
    return { news: data }
  },
  mounted() {},
  methods: {
    async fetchData() {
      let data = await this.$api.department.labDetail({ id: this.$route.query.params })
      this.labDetail = data
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.fetchData()
      },
    },
  },
}
</script>
<style lang='scss'>
.content-print-mobile {
  line-height: 0.25rem;
  font-size: 0.15rem;
  padding: 0;
  img {
    max-width: 100%;
    height: auto;
  }
  h1 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.23rem;
  }
  h2 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.2rem;
  }
  h3 {
    color: #444444;
    line-height: 1.5;
    font-size: 0.18rem;
  }
  h4 {
    color: #444444;
    line-height: 1;
    font-size: 0.17rem;
  }
}
</style>
<style scoped lang='scss'>
.lab-detail {
  width: 100%;

  .detial {
    .base {
      margin-bottom: 0.2rem;
      padding-bottom: 0.2rem;
      border-bottom: 0.01rem solid #f5f5fc;
      .img {
        width: 100%;
        border-radius: 0.02rem;
      }
      .base-info {
        margin-top: 0.4rem;
        .name {
          font-size: 0.21rem;
          font-weight: bold;
          color: #1a1a1a;
        }
        .line {
          width: 0.14rem;
          height: 0.01rem;
          background: $--color-primary;
          margin-top: 0.2rem;
          margin-bottom: 0.15rem;
        }
        .position {
          font-size: 0.12rem;
          color: #1a1a1a;
          line-height: 0.18rem;
        }
      }
    }
  }
  .teachers {
    margin-top: 0.3rem;
    .items {
      @include flex-between(flex-start);
      justify-content: flex-start;
      flex-wrap: wrap;
      .person-item {
        width: 48%;
        // max-width: 330px;
        margin-right: 4%;
        margin-bottom: 0.2rem;
        cursor: pointer;
      }
      .person-item:nth-child(2n + 2) {
        margin-right: 0px;
      }
    }
  }
}
</style>
