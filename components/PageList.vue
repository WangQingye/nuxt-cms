<template>
  <div class='page-list'>
    <slot></slot>
    <el-pagination style='float:right' class="my-pagination" @current-change="handleCurrentChange" :current-page="currentPage" hide-on-single-page :page-size="pageSize" layout="total, prev, pager, next, slot" :total="total">
      <el-input v-model="jumpPage" class="jump-input" :minlength="1" :maxlength="100" :step="1">
      </el-input>
      <span class="jump-text" @click="jump">跳转</span>
    </el-pagination>
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
      jumpPage: "",
    }
  },
  methods: {
    refresh() {
      this.$emit('fetchData', this.currentPage)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('fetchData', this.currentPage)
    },
    jump() {
      this.currentPage = Number(this.jumpPage)
      console.log(this.currentPage, '321312')
      this.$emit('fetchData', this.currentPage)
    },
  },
}
</script>
<style lang='scss'>
.page-list {
  .my-pagination {
    display: flex;
    align-items: center;
    .jump-input {
      width:50px;
      margin:0 10px;
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