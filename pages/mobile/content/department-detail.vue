<template>
  <div class="department-detail">
    <div class="top">
      <p class="name">{{departmentDetail.name}}</p>
      <div ref="detail" class="content-print-mobile" style="border-bottom: none;padding-bottom: 20px" v-if="departmentDetail.desc" v-html='departmentDetail.desc.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
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

import { imgDomain } from '@/config'
export default {
  data() {
    return {
      imgDomain,
      pageSize: 6,
      total: 7,
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
