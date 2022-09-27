<template>
  <div class="department-list">
    <p class="title">
      {{ title }}
    </p>
    <div ref="detail" class="content-print" style="border-bottom: none;padding-bottom: 20px" v-if="desc" v-html='desc.replace(/src="\.\.\/media/g, `src="${imgDomain}`)'></div>
    <div class="items">
      <template v-for="(department,index) in departmentItems">
        <NuxtLink class="department-item"
                  :key="index"
                  :to="getLink(department)">
          <img v-if="department.logo" :src="department.logo|cloudImage" :onerror="$utils.getDefaultImg()"
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
      }
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
    align-items: center;
    a {
      text-decoration: none;
    }
    .no-text {
      width: 100%;
    }

    .department-item {
      width: 24%;
      min-height: 100px;
      // max-width: 330px;
      margin-right: 1.33%;
      margin-bottom: 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      p {
        text-decoration: none;
        line-height: 100px;
        text-align: center;
        color: #4d4d4d;
      }
      img {
        width: 100%;
      }

      &:hover {
        transition-timing-function: ease-in-out;
        box-shadow: 0px 10px 8px 0px rgba(214, 202, 202, 0.25);
        transform: translateY(-8px);
      }
    }

    .department-item:nth-child(4n + 4) {
      margin-right: 0px;
    }
  }
}
</style>
