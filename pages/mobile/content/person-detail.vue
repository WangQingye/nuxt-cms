<template>
  <div :class="['person-detail']">
    <div class="top">
      <div class="left">
        <el-tag class='tag' type="primary" style="margin-right: 10px" v-for="(tag,index ) in personDetail.tags" :key="index">{{
            tag.name
          }}
        </el-tag>
        <!-- <el-tag class='tag' type="warning">{{ personDetail.publish_at|parseTime('{y}年{m}月{d}日') }}</el-tag> -->
      </div>
      <!-- <el-button type="warning" class="button" @click="$router.back()">关闭返回</el-button> -->
    </div>
    <div class="detial">
      <div class="base base-1">
        <img class="img" :src="personDetail.avatar|cloudImage" alt="">
        <div class="base-info">
          <p class="name">{{personDetail.name}}</p>
          <div class="line"></div>
          <p class="position">{{personDetail.post}}</p>
          <p class="position" style="margin-bottom: 0.2rem">{{personDetail.job_content}}</p>
        </div>
      </div>
      <div class="base" style="margin-bottom: 0.1rem; padding-top: 0.1rem; font-size:0.12rem; color:#1A1A1A">
        <div class="base-info">
          <p class="position" v-show="personDetail.dept">所在部门：{{personDetail.dept}}</p>
          <p class="position" v-show="personDetail.tel">办公电话：{{personDetail.tel}}</p>
          <p class="position" v-show="personDetail.address">通讯地址：{{personDetail.address}}</p>
          <p class="position" v-show="personDetail.email">电子邮件：{{personDetail.email}}</p>
          <p class="position" v-show="personDetail.homepage">个人主页：{{personDetail.homepage }}</p>
        </div>
      </div>
      <p class="desc" v-html="personDetail.intro">
      </p>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(info,index) in personDetail.labels" :key="index" :name="index">
          <template slot="title">
            <span style="font-size:15px;font-weight:bold">{{info.name}}</span>
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
    let data = await context.app.$api.department.personDetail({
      id: context.route.query.params,
    })
    let activeNames =
      data.labels &&
      data.labels.map((labal, index) => {
        return index
      })
    return { personDetail: data, activeNames }
  },
  mounted() {},
  methods: {},
}
</script>
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
    margin-bottom: 0.05rem;

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
