<template>
  <div :class="['person-detail']">
    <div class="top">
      <div class="left">
        <el-tag class='tag' type="primary" style="margin-right: 10px" v-for="(tag,index ) in personDetail.tags" :key="index">{{
            tag
          }}
        </el-tag>
        <!-- <el-tag class='tag' type="warning">{{ personDetail.publish_at|parseTime('{y}年{m}月{d}日') }}</el-tag> -->
      </div>
      <el-button type="warning" class="button" @click="$router.back()">关闭返回</el-button>
    </div>
    <div class="detial">
      <div class="base">
        <img class="img" :src="personDetail.img|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{personDetail.name}}</p>
          <div class="line"></div>
          <p class="position">{{personDetail.position}}</p>
          <p class="position" style="margin-bottom: 20px">{{personDetail.desc}}</p>
          <p class="position">所在所系：{{personDetail.department}}</p>
          <p class="position">办公电话：{{personDetail.phone}}</p>
          <p class="position">通讯地址：{{personDetail.address}}</p>
          <p class="position">电子邮件：{{personDetail.email}}</p>
          <p class="position">个人主页：{{personDetail.page }}</p>
        </div>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(info,index) in personDetail.infos" :key="index" :name="index">
          <template slot="title">
            <span style="font-size:15px;font-weight:bold">{{info.title}}</span>
          </template>
          <div v-html="info.content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { imgDomain } from '@/config'
export default {
  data() {
    return {
      personDetail: {
        id: undefined,
        tags: ['实验室部门一'],
        img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
        name: '武星域',
        position: '院长助理 \\ 副教授 航天航空学院',
        desc: '发动机推进与本科教学实验室建设',
        department: '航空动力研究所',
        phone: '021-1111111',
        address: 'sadasdasdsa地址',
        email: 'dasdasdas@qq.com',
        page: 'http://dasdsadas.com',
        infos: [
          {
            title: '教育背景',
            content:
              '<p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p>',
          },
          {
            title: '教育背景',
            content:
              '<p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p>',
          },
          {
            title: '教育背景',
            content:
              '<p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p>',
          },
          {
            title: '教育背景',
            content:
              '<p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p>',
          },
          {
            title: '教育背景',
            content:
              '<p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p><p>1993.02-1997.01，中国科技大学，硕士；</p>',
          },
        ],
      },
      imgDomain,
      activeNames: [0, 1, 2, 3, 4],
    }
  },
  async asyncData(context) {
    // let data = await context.app.$api.person.personDetail({ id: context.route.query.id })
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
.person-detail {
  width: 100%;

  .top {
    @include flex-between;
  }
  .detial {
    margin-top: 15px;
    .base {
      @include flex-between(flex-start);
      justify-content: flex-start;
      margin-bottom: 60px;
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
