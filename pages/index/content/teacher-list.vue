<template>
  <div class="news-list">
    <div class="top">
      <el-radio-group v-model="newsActiveName" size="medium" style="margin-bottom: 30px;">
        <el-radio-button v-for="tag in newsTags" :key="tag" :label="tag">{{tag}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="letter-list">
      <div class="letter" v-if="newsActiveName == '按首字母查找'" v-for="letterPerson in letterPersons" :key="letterPerson.letter">
        <p class="letter-title">{{letterPerson.label}} <span class="sub-title">字母开头</span></p>
        <div class="persons">
          <div v-for="person in letterPerson.children" :key="person.id" class="person" @click="$router.push(`/content/person-detail?params=${person.id}&menuIds=${$route.query.menuIds}`)">
            <span class="person-name">{{person.name}}</span>
          </div>
        </div>
      </div>
      <div class="letter" v-if="newsActiveName == '按部门查找'" v-for="department in departmentPersons" :key="department.key">
        <p class="letter-title">{{department.name}}</p>
        <div class="persons">
          <div v-for="person in department.options" :key="person.id" class="person" @click="$router.push(`/content/person-detail?params=${person.id}&menuIds=${$route.query.menuIds}`)">
            <span class="person-name">{{person.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { newsList, categoryTag } from '@/api/news'

export default {
  data() {
    return {
      newsActiveName: '按首字母查找',
      newsTags: ['按首字母查找', '按部门查找'],
      letterPersons: [],
      departmentPersons: [],
    }
  },
  async asyncData(context) {
    let list = await context.app.$api.department.personnelList({})
    return {
      letterPersons: list,
    }
  },
  watch: {
    async newsActiveName(val) {
      console.log(val)
      if (val == '按部门查找' && !this.departmentPersons.length) {
        const list = await this.$api.department.personnelListByDept({})
        this.departmentPersons = list
      }
    },
  },
}
</script>
<style scoped lang='scss'>
.news-list {
  width: 100%;

  .top {
    @include flex-between(flex-start);
    margin-bottom: 15px;

    .button {
      background: $--color-primary-light;
      color: #999999;
      // width: 130px;
      height: 40px;
      border-radius: 4px;
      border: none;
      line-height: 18px;
      .button-text {
        @include flex-between();
      }
    }
  }

  .items {
    @include flex-between(flex-start);
    justify-content: flex-start;
    flex-wrap: wrap;
    .no-text {
      width: 100%;
    }
    .person-item {
      width: 24%;
      min-width: 150px;
      // max-width: 330px;
      margin-right: 1.33%;
      margin-bottom: 30px;
    }

    .person-item:nth-child(4n + 4) {
      margin-right: 0px;
    }
  }
  .letter-list {
    .letter {
      margin-bottom: 50px;
      .letter-title {
        font-size: 16px;
        font-weight: bold;
        color: #1a1a1a;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 10px;
        .sub-title {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          margin-left: 10px;
        }
      }
      .persons {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .person {
          width: 16.6%;
          font-size: 18px;
          color: #000000;
          margin-top: 30px;
          .person-name {
            border: 1px solid #dddfe6;
            border-radius: 8px;
            cursor: pointer;
            padding: 8px 24px;
            &:hover {
              border: 1px solid $--color-primary;
              color: $--color-primary;
              background: $--color-primary-light;
            }
          }
        }
      }
    }
  }
}
</style>
