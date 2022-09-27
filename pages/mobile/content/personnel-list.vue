<template>
  <div class="department-list">
    <p class="title" v-if="desc">
      {{ title }}
    </p>
    <div ref="detail" class="content-print-mobile" style="border-bottom: none;padding-bottom: 20px" v-if="desc" v-html='desc.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
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

import { imgDomain } from '@/config'
export default {
  data() {
    return {
      imgDomain,
      departmentItems: [],
      title: '部门列表',
      desc: ''
    }
  },
  async asyncData(context) {
    await context.app.$utils.getInitData(context)
    let list = await context.app.$api.department.personnelTags({
      type: 'office',
    })
    // 如果有cate，说明是组织架构过来的，这时候要请求详情去获取信息，因为这个可能没在导航菜单中
    let title, desc
    if (context.route.query.cate) {
      const info = await context.app.$api.department.getCateDetail({
        id: Number(context.route.query.cate),
      })
      title = info.name
      desc = info.desc
    } else {
      let menuList = context.store.state.config.menuList
      let ids = context.route.query.menuIds.split(',')
      title = context.app.$utils.findMenuTitle(menuList, ids[ids.length - 1])
    }
    return {
      departmentItems: list,
      title,
      desc
    }
  },
  methods: {
    async fetchData() {
      let list = await this.$api.department.personnelTags({
        type: 'office',
      })
      this.departmentItems = list
      if (this.$route.query.cate) {
        const info = await this.$api.department.getCateDetail({
          id: Number(this.$route.query.cate),
        })
        this.title = info.name
        this.desc = info.desc
      } else {
        let menuList = this.$store.state.config.menuList
        let ids = this.$route.query.menuIds.split(',')
        let title = this.$utils.findMenuTitle(menuList, ids[ids.length - 1])
        this.title = title
        this.desc = ''
      }
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
    '$route.query.cate': {
      handler: function (val) {
        this.fetchData()
      },
    },
  },
}
</script>
<style scoped lang='scss'>
.department-list {
  width: 100%;
  .title {
    padding-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #4d4d4d;
    margin-bottom: 30px;
  }
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
      min-height: 0.9rem;
      // max-width: 330px;
      margin-right: 4%;
      margin-bottom: 0.12rem;
      cursor: pointer;

      img {
        width: 100%;
      }
      p {
        line-height: 0.9rem;
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
