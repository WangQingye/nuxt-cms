<template>
  <div class="department-detail">
    <div class="top">
      <p class="name">{{departmentDetail.name}}</p>
    <div ref="detail" class="content-print" style="border-bottom: none;padding-bottom: 20px" v-if="departmentDetail.desc" v-html='departmentDetail.desc.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    </div>
    <PageList :page-size="pageSize" :total="total" @fetchData="fetchData" ref="pageList">
      <div class="items">
        <PersonItem class="person-item" type="department" v-for="person in departmentDetail.personList" :itemData="person" :key="person.id" />
      </div>
    </PageList>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'
import { imgDomain } from '@/config'
export default {
  data() {
    return {
      imgDomain,
      pageSize: 6,
      total: 0,
      departmentDetail: {
        name: '综合事务部',
        desc: '综合事务部描述',
        personList: [],
      },
    }
  },
  async asyncData(context) {
    let detail = await context.app.$api.department.deparmentDetail({
      key: context.route.query.params,
    })
    let { total, list } = await context.app.$api.department.deparmentPerson({
      key: context.route.query.params,
      page: Number(context.route.query.page) || 1,
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
      this.departmentDetail.name = detail.name
      this.departmentDetail.desc = detail.desc
      this.$refs.pageList.reInit()

      // let { total, list } = await this.$api.department.deparmentPerson({
      //   key: this.$route.query.params,
      //   page: 1,
      //   limit: this.pageSize,
      // })
      // this.departmentDetail = {
      //   ...detail,
      //   personList: list,
      // }
      // this.total = total
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.getInfo(val)
      }
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
