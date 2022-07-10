<template>
  <div class='page-list'>
    <slot></slot>
    <ul class="my-pagination" v-show="totalPage > 1">
      <li>共 {{total}} 条</li>
      <li @click="prev">
        <NuxtLink :to="getLink(-1)"
          v-if="currentPage != 1">
          <i class="el-icon-arrow-left icon"></i>
        </NuxtLink>
        <i class="el-icon-arrow-left icon"
          style="cursor: not-allowed"
          v-else></i>
      </li>
      <li>
        <span class="now-text">{{currentPage}}</span>
        /
        <span>{{totalPage}}</span>
      </li>
      <li @click="next">
        <NuxtLink :to="getLink(1)"
          v-if="currentPage != totalPage">
          <i class="el-icon-arrow-right icon"
            style="margin-right:0"></i>
        </NuxtLink>
        <i class="el-icon-arrow-right icon"
          style="margin-right:0;cursor: not-allowed"
          v-else></i>
      </li>
      <li>
        <el-input v-model="jumpPage"
          class="jump-input"
          :minlength="1"
          :maxlength="100"
          :step="1">
        </el-input>
      </li>
      <li>
        <span class="jump-text"
          @click="jump">跳转</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
      jumpPage: '',
    }
  },
  methods: {
    prev() {
      if (this.currentPage == 1) return
      this.currentPage -= 1
      this.$route.query.page = Number(this.currentPage)
      this.$emit('fetchData', this.currentPage)
    },
    next() {
      if (this.currentPage == this.totalPage) return
      this.currentPage += 1
      this.$route.query.page = Number(this.currentPage)
      this.$emit('fetchData', this.currentPage)
    },
    jump() {
      this.currentPage = Number(this.jumpPage)
      this.$emit('fetchData', this.currentPage)
    },
    getLink(add) {
      let page = Number(this.currentPage) + Number(add)
      let path = this.$route.path + '?'
      for (const key in this.$route.query) {
        if (key == 'page') {
          path += `${key}=${page}&`
        } else {
          path += `${key}=${this.$route.query[key]}&`
        }
      }
      return path
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  mounted() {
    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page
    } else {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query.page = 1
      this.$router.replace({ path: this.$route.path, query })
    }
  },
}
</script>
<style lang='scss'>
.page-list {
  .my-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #4c4c4c;
    font-size: 14px;
    .icon {
      width: 24px;
      height: 24px;
      margin: 0 12px;
      line-height: 24px;
      text-align: center;
      background: #ffffff;
      border: 1px solid #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
    }
    .jump-input {
      width: 50px;
      margin-right: 12px;
      .el-input__inner {
        height: 24px !important;
        line-height: 24px !important;
        vertical-align: middle;
      }
    }
    .jump-text {
      color: $--color-primary;
      line-height: 24px;
      cursor: pointer;
      font-weight: normal;
    }
  }
}
</style>