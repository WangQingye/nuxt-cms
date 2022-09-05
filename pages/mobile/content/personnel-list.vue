<template>
  <div class="department-list">
      <div class="items">
        <template v-for="(department,index) in departmentItems">
          <NuxtLink class="department-item"
                    :key="index"
                    :to="getLink(department)">
            <img v-if="department.logo" :src="department.logo|cloudImage"
                 :alt="department.name">
            <p v-else>{{department.name}}</p>
          </NuxtLink>
        </template>
      </div>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      departmentItems: [],
    }
  },
  async asyncData(context) {
    let list = await context.app.$api.department.personnelTags({
      type: Number(context.route.query.params),
    })
    return {
      departmentItems: list,
    }
  },
  methods: {
    async fetchData(page = 1) {
      let list = await this.$api.department.personnelTags({
        type: Number(this.$route.query.params),
      })
      this.departmentItems = list
    },
    getLink(department) {
      return `/content/department-detail?params=${department.key}&menuIds=${this.$route.query.menuIds}`
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
    a {
      text-decoration: none;
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
      p {
        line-height: 0.5rem;
        text-align: center;
        color: #4d4d4d;
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
