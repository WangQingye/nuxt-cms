import bannerModule from '~/api/banner'
import newsModule from '~/api/news'
import userModule from '~/api/user'
import departmentModule from '~/api/department'
import {
  Message
} from "element-ui";
import Vue from "vue";
export default function ({
  $axios,
  redirect
}, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
    // 相关配置
  })
  $axios.onResponse((response) => {
    // 相关配置
    if (response.data.message == 'success') {
      return Promise.resolve(response.data.data)
    } else {
      Message.error(response.data.message)
      return Promise.reject(response.data.data)
      // redirect()
      // throw new Error(response.data.message)
      // return Promise.reject(response.data.message)
    }
  })
  $axios.onError(error => {
    if (error.code === 404) {
      redirect('/404')
    }
  })
  apiModules.banner = bannerModule($axios)
  apiModules.news = newsModule($axios)
  apiModules.user = userModule($axios)
  apiModules.department = departmentModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}
