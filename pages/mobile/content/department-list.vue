<template>
  <div class="department-list">
    <!-- <p class="title">
      业务部门
    </p> -->
    <PageListMobile :page-size="pageSize"
      :total="total"
      @fetchData="fetchData">
      <!-- <div class="items" v-if="departmentItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <template v-for="(department,index) in departmentItems">
          <NuxtLink class="department-item"
            :key="index"
            :to="getLink(department)"
            v-if="department.type != 3">
            <img :src="department.cover|cloudImage"
              :alt="department.name">
          </NuxtLink>
          <img v-else
            class="department-item"
            :key="index"
            :src="department.cover|cloudImage"
            :alt="department.name">
        </template>
      </div>
    </PageListMobile>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      departmentItems: [],
      pageSize: 10,
      total: 0,
    }
  },
  async asyncData(context) {
    let { total, list } = await context.app.$api.department.deparmentList({
      type: Number(context.route.query.params),
      page: 1,
      limit: 6,
    })
    return {
      departmentItems: list,
      total,
    }
  },
  methods: {
    async fetchData(page = 1) {
      let { total, list } = await this.$api.department.deparmentList({
        type: Number(this.$route.query.params),
        page: page,
        limit: 6,
      })
      this.departmentItems = list
      this.total = total
    },
    getLink(department) {
      return `/content/lab-detail-info?params=${department.id}&menuIds=${this.$route.query.menuIds}`
    },
  },
  watch: {
    '$route.query.params': {
      handler: function (val) {
        if (val) this.fetchData()
      },
      immediate: true,
    },
  },
}
</script>
<style scoped lang='scss'>
.department-list {
  width: 100%;
  // .title {
  //   padding-top: 10px;
  //   font-size: 18px;
  //   font-weight: bold;
  //   color: #4d4d4d;
  //   margin-bottom: 30px;
  // }
  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0.14rem 0;
    border-top: 0.01rem solid #f5f5fc;
    border-bottom: 0.01rem solid #f5f5fc;
    .no-text {
      width: 100%;
    }
    .department-item {
      width: 48%;
      min-width: 1.6rem;
      // max-width: 330px;
      margin-right: 4%;
      margin-bottom: 0.12rem;
      cursor: pointer;
      img {
        width: 100%;
      }
      // &:hover {
      //   box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
      // }
    }

    .department-item:nth-child(2n + 2) {
      margin-right: 0px;
    }
  }
}
</style>
