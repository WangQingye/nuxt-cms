<template>
  <div :class="['lab-detail-info']">
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
        <img class="img" :src="labDetail.logo|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{labDetail.name}}</p>
          <div class="line"></div>
          <p class="position" style="margin-bottom: 20px">{{labDetail.sub_name}}</p>
          <p class="position" v-show="labDetail.address">通讯地址：{{labDetail.address}}</p>
          <p class="position" v-show="labDetail.tel">办公电话：{{labDetail.tel}}</p>
          <!-- <p class="position">负责人：{{labDetail.head }}</p> -->
          <p class="position" v-show="labDetail.email">邮件地址：{{labDetail.email}}</p>
        </div>
      </div>
      <div v-html='labDetail.desc.replace(/src="media/g, `src="${imgDomain}`)' class="content-print"></div>
    </div>
    <div class="teachers" v-show="personList.length">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="中心教师" name="active"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <PersonItem class="person-item" type="list" v-for="item in personList" :key="item.id" :itemData="item" />
      </div>
    </div>
    <div class="news" v-show="newsList.length">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="部门动态" name="active"></el-tab-pane>
      </el-tabs>
      <div class="items">
        <NewsItemList class="list-way-item" v-for="item in newsList" :key="item.id" :itemData="item" />
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
      activeTab: 'active',
      imgDomain,
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
      personList = personData.list
    }
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
.content-print {
  border-bottom: 1px solid #f2f2f2;
  padding: 0;
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
.lab-detail-info {
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
      border-bottom: 1px solid #eaeef5;
      .img {
        width: 250px;
        // height: 150px;
        border-radius: 5px;
        margin-right: 70px;
      }
      .base-info {
        // margin-top: 60px;
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
  .teachers {
    margin-top: 40px;
    .items {
      @include flex-between(flex-start);
      justify-content: flex-start;
      flex-wrap: wrap;
      .no-text {
        width: 100%;
      }
      .person-item {
        width: 24%;
        min-width: 150px;
        // max-width: 330px;
        margin-right: 1.33%;
        margin-bottom: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          transition-timing-function: ease-in-out;
          box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
          transform: translateY(-8px);
        }
      }

      .person-item:nth-child(4n + 4) {
        margin-right: 0px;
      }
    }
  }
  .news {
    .list-way-item {
      width: 100%;
    }
  }
}
</style>
