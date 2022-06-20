<template>
  <div class='page-list'>
    <slot></slot>
    <el-pagination ref="pagination" :pager-count="5" style='float:right' class="my-pagination" @current-change="handleCurrentChange" :current-page="currentPage" hide-on-single-page :page-size="pageSize" layout="total, slot" :total="total">
      <div class="pager">
        <i class="el-icon-arrow-left" style="margin-right:0.2rem" @click="$refs.pagination.prev()"></i>
        <span class="current">{{currentPage}} </span>
        <span>/ {{total}}</span>
        <i class="el-icon-arrow-right" style="margin-left:0.2rem" @click="$refs.pagination.next()"></i>
      </div>
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
    prev() {
      console.log(this.$refs.pagination)
    },
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
    margin-top: 0.2rem;
    max-width: 100%;
    display: flex;
    align-items: center;
    .pager {
      @include flex-between;
      margin: 0 0.1rem;
      .current {
        color: $--color-primary;
      }
      span {
        min-width: 0.1rem;
      }
    }
    .jump-input {
      width:0.5rem;
      margin:0 0.1rem;
      .el-input__inner {
        height: 0.24rem !important;
        line-height: 0.24rem !important;
        vertical-align: middle;
      }
    }
    .jump-text {
      color: $--color-primary;
      line-height: 0.24rem;
      cursor: pointer;
      font-weight: normal;
    }
  }
}
</style>