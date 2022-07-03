<template>
  <div class="department-detail">
    <div class="top">
      <p class="name">{{departmentDetail.name}}</p>
      <p class="desc">{{departmentDetail.desc}}</p>
    </div>
    <PageListMobile :page-size="pageSize" :total="total" @fetchData="fetchData">
      <div class="items">
        <PersonItemMobile class="person-item" type="department" v-for="person in departmentDetail.personList" :itemData="person" :key="person.id" />
      </div>
    </PageListMobile>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      pageSize: 6,
      total: 7,
      departmentDetail: {
        name: '综合事务部',
        desc: '综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述综合事务部描述',
        personList: [
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 11,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 16,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 15,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 14,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 13,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
          {
            img: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.c9Flw6mbOMJxUo-rLx9EmgHaEO?w=306&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
            name: '陈云 ',
            id: 12,
            position: '办公室日常管理、组织工作、人事工作',
            position1: '学校双创推进办日常工作和部分接待工作',
            desc: '这是一段人员简介文本可替代内容，不代表实际文本内容仅作文本示例所用。 经过多年的实践和探索，上海交大创业教育硕果累累。在“创青春”全国大学生创业大赛等国内外创业赛事中摘金夺银，特别是在2014年的首届“创青春”全国大学生创业大赛中，上海交通大学选送6支团队参赛，获5金1银，以团体总分第一名的优异成绩，捧得赛事最高奖项“冠军杯”。根据腾讯开放平台发布的“2014城市&高校创业排行榜”中，上海交大位列“创业者最多的top10院校”榜单第三位。近年来，以饿了么网上订餐、触宝科技、应届生求职网、Teambition、在路上、59store等为代表的一批青年创业校友企业也正在迅速崛起中。立足民生、服务社会、转化才学、投身创业已成为上海交大众多学子的理想。',
          },
        ],
      },
    }
  },
  async asyncData(context) {
    let detail = await context.app.$api.department.deparmentDetail({
      key: context.route.query.params,
    })
    let { total, list } = await context.app.$api.department.deparmentPerson({
      key: context.route.query.params,
      page: 1,
      limit: 6,
    })
    return {
      departmentDetail: {
        ...detail,
        personList: list,
      },
      total,
    }
  },
  methods: {
    async fetchData(page = 1) {
      const { total, list } = await this.$api.department.deparmentPerson({
        page,
        limit: this.pageSize,
        key: this.$route.query.params,
      })
      this.total = total
      this.departmentDetail.personList = list
    },
    async getInfo() {
      let detail = await this.$api.department.deparmentDetail({
        key: this.$route.query.params,
      })
      let { total, list } = await this.$api.department.deparmentPerson({
        key: this.$route.query.params,
        page: 1,
        limit: 6,
      })
      this.departmentDetail = {
        ...detail,
        personList: list,
      }
      this.total = total
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.getInfo(val)
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang='scss'>
.department-detail {
  width: 100%;
  margin-bottom: 0.5rem;
  border-bottom:0.01rem solid #F5F5FC;
  .top {
    margin-bottom: 0.15rem;
    color: #4D4D4D;
    .name {
      font-size: 0.16rem;
      font-weight: bold;
      color: #4d4d4d;
      margin-bottom: 0.15rem;
    }
    .desc {
      font-size: 0.12rem;
      line-height: 0.21rem;
      color: #999999;
    }
  }

  .items {
    .person-item {
      margin-bottom: 18px;
    }
  }
}
</style>
