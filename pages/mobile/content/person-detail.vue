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
      <!-- <el-button type="warning" class="button" @click="$router.back()">关闭返回</el-button> -->
    </div>
    <div class="detial">
      <div class="base base-1">
        <img class="img" :src="personDetail.img|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{personDetail.name}}</p>
          <div class="line"></div>
          <p class="position">{{personDetail.position}}</p>
          <p class="position" style="margin-bottom: 20px">{{personDetail.desc}}</p>
        </div>
      </div>
      <div class="base" style="margin-bottom: 0.1rem; padding-top: 0.1rem; font-size:0.12rem; color:#1A1A1A">
        <div class="base-info">
          <p class="position">所在所系：{{personDetail.department}}</p>
          <p class="position">办公电话：{{personDetail.phone}}</p>
          <p class="position">通讯地址：{{personDetail.address}}</p>
          <p class="position">电子邮件：{{personDetail.email}}</p>
          <p class="position">个人主页：{{personDetail.page }}</p>
        </div>
      </div>
      <p class="desc">
        这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。
      </p>
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
.person-detail {
  width: 100%;
  margin-bottom: 0.2rem;
  .top {
    @include flex-between;
  }
  .detial {
    margin-top: 15px;
    .base {
      @include flex-between(flex-start);
      justify-content: flex-start;
      .img {
        width: 1.11rem;
        height: 1.51rem;
        border-radius: 0.04rem;
        margin-right: 0.14rem;
      }
      .base-info {
        padding-top: 0.14rem;
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
          line-height: 0.18rem;
        }
      }
    }
    .base-1 {
      padding-bottom: 0.2rem;
      border-bottom: 0.01rem solid #f5f5fc;
      .position {
        line-height: 0.15rem;
      }
    }
    .desc {
      margin: 0.2rem 0;
      color: #4d4d4d;
      line-height: 0.18rem;
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
