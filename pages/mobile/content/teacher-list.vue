<template>
  <div class="news-list">
    <div class="top">
      <!-- <el-button class="button" @click="showListWay = !showListWay">
        <div class="button-text">
          <p>{{ `${showListWay ? '首字母列表' : '返回图文列表'}` }}</p>
          <i v-show="!showListWay" class="el-icon-close" style="margin-left: 10px"></i>
        </div>
      </el-button> -->
    </div>
    <PageListMobile v-if="showListWay" :page-size="pageSize" :total="total" @fetchData="fetchData">
      <!-- <div class="items" v-if="newsItems.length == 0 && !isLoading">
        <el-empty class="no-text" description="该栏目暂无新闻"></el-empty>
      </div> -->
      <div class="items">
        <PersonItem class="person-item" type="list" v-for="i in 5" :key="i" />
      </div>
    </PageListMobile>
    <div class="letter-list" v-else>
      <div class="letter" v-for="letterPerson in letterPersons" :key="letterPerson.letter">
        <p class="letter-title">{{letterPerson.label}} <span class="sub-title">字母开头</span></p>
        <div class="persons">
          <p v-for="person in letterPerson.children" :key="person.id" class="person-name" @click="$router.push(`/content/person-detail?params=${person.id}&menuIds=${$route.query.menuIds}`)">· {{person.name}}</p>
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
      newsActiveName: '首字母列表',
      showListWay: false,
      isLoading: false,
      newsItems: [],
      newsTags: ['首字母列表'],
      pageSize: 10,
      total: 0,
      letterPersons: [
        {
          letter: 'A',
          persons: [
            {
              name: '某某',
              id: '1',
            },
            {
              name: '某某某',
              id: '2',
            },
            {
              name: '某某',
              id: '3',
            },
            {
              name: '某某',
              id: '4',
            },
            {
              name: '某某',
              id: '5',
            },
            {
              name: '某某',
              id: '6',
            },
            {
              name: '某某某某',
              id: '7',
            },
          ],
        },
        {
          letter: 'B',
          persons: [
            {
              name: '某某',
              id: '1',
            },
            {
              name: '某某某',
              id: '2',
            },
            {
              name: '某某',
              id: '3',
            },
            {
              name: '某某',
              id: '4',
            },
            {
              name: '某某',
              id: '5',
            },
            {
              name: '某某',
              id: '6',
            },
            {
              name: '某某某某',
              id: '7',
            },
          ],
        },
      ],
    }
  },
  async asyncData(context) {
    let list = await context.app.$api.department.personnelList({})
    return {
      letterPersons: list,
    }
  },
  methods: {
    handleClick() {

    }
  }
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
        .person-name {
          width: 33%;
          font-size: 18px;
          color: #000000;
          margin-top: 30px;
          cursor: pointer;
          &:hover {
            color: $--color-primary;
          }
        }
      }
    }
  }
}
</style>
