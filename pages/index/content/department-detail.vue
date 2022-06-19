<template>
  <div class="department-detail">
    <div class="top">
      <p class="name">{{departmentDetail.name}}</p>
      <p class="desc">{{departmentDetail.desc}}</p>
    </div>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData">
      <div class="items">
        <PersonItem class="person-item" type="department" v-for="person in departmentDetail.personList" :itemData="person" :key="person.id" />
      </div>
    </PageList>
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
            desc: '这是一段人员简介文本可替代内',
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
  methods: {
    async fetchData(page = 1) {
      // const {
      //   data: { total, list },
      // } = await newsList({
      //   page,
      //   limit: this.pageSize,
      //   category_id: this.$route.query.key,
      //   // 查全部则tag传空字符串
      //   tag: this.newsActiveName === '全部' ? '' : this.newsActiveName,
      // })
      this.total = total
      // this.newsItems = list
    },
  },
  watch: {
    '$route.query.key': {
      handler: function (val) {
        // if (val) this.fetchTags(val)
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang='scss'>
.department-detail {
  width: 100%;

  .top {
    margin-bottom: 50px;
    padding-top: 10px;
    .name {
      font-size: 24px;
      font-weight: bold;
      color: #4d4d4d;
      margin-bottom: 20px;
    }
    .desc {
      font-size: 14px;
      color: #999999;
      line-height: 24px;
    }
  }

  .items {
    .person-item {
      margin-bottom: 18px;
    }
  }
}
</style>
