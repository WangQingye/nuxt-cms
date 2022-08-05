<template>
  <div :class="['lab-detail']">
    <div class="detial">
      <div class="base">
        <img class="img" :src="labDetail.logo|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{labDetail.name}}</p>
          <div class="line"></div>
          <p class="position" style="margin-bottom: 20px">{{labDetail.sub_name}}</p>
          <p class="position" v-show="labDetail.address">通讯地址：{{labDetail.address}}</p>
          <p class="position" v-show="labDetail.tel">办公电话{{labDetail.tel}}</p>
          <!-- <p class="position">负责人：{{labDetail.head }}</p> -->
          <p class="position" v-show="labDetail.email">邮件地址：{{labDetail.email}}</p>
        </div>
      </div>
      <div v-html='labDetail.desc.replace(/src="media/g, `src="${imgDomain}`)' class="content-print-mobile"></div>
    </div>
    <div class="teachers" v-show="personList.length">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="中心教师" name="active"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <PersonItemMobile class="person-item" type="list" v-for="item in personList" :key="item.id" :itemData="item" />
      </div>
    </div>
    <div class="news" v-show="newsList.length">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="部门动态" name="active"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <NewsItemListMobile class="list-way-item" v-for="item in newsList" :key="item.id" :itemData="item" />
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
      activeTab: 'active',
      newsList: [],
      personList: [],
    }
  },
  async asyncData(context) {
    let data = await context.app.$api.department.labDetail({
      id: context.route.query.params,
    })
    let newsList = []
    let personList = []
    // 业务部门需要请求动态和人员
    // if (data.type == 1) {
    const newsData = await context.app.$api.department.deparmentNews({
      page: 1,
      limit: 10,
      id: context.route.query.params,
    })
    newsList = newsData
    if (data.personnel_tag) {
      const personData = await context.app.$api.department.deparmentPerson({
        page: 1,
        limit: 4,
        key: data.personnel_tag,
      })
    }
    personList = personData.list
    // }
    return { labDetail: data, newsList, personList }
  },
  methods: {
    async fetchData() {
      this.newsList = []
      this.personList = []
      let data = await this.$api.department.labDetail({
        id: this.$route.query.params,
      })
      this.labDetail = data
      // 业务部门需要请求动态和人员
      // if (data.type == 1) {
      const newsData = await this.$api.department.deparmentNews({
        page: 1,
        limit: 10,
        id: this.$route.query.params,
      })
      this.newsList = newsData
      if (data.personnel_tag) {
        const personData = await this.$api.department.deparmentPerson({
          page: 1,
          limit: 4,
          key: data.personnel_tag,
        })
        this.personList = personData.list
      }
      // }
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
        width: 3.35rem;
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
