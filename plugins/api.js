import bannerModule from '~/api/banner'
import newsModule from '~/api/news'
import userModule from '~/api/user'
import departmentModule from '~/api/department'
import {
  Message
} from "element-ui";
import {
  tokenName
} from '@/config'
import Vue from "vue";
export default function ({
  $axios,
  redirect
}, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
    // 相关配置
    let token;
    if (!process.server) {
      token = localStorage.getItem(tokenName)
    }
    if (token) config.headers[tokenName] = token
  })
  $axios.onResponse((response) => {
    // 相关配置
    if (response.data.message == 'success') {
      return Promise.resolve(response.data.data)
    } else {
      if (!response.config.noTip) Message.error(response.data.message)
      if (response.config.goError) {
        return Promise.reject(response)
      } else {
        return Promise.resolve(response.data.data)
      }
      // redirect(`/error?msg=${error.data.message}`)
      // return Promise.reject(response)
      // throw new Error(response.data.message)
      // return Promise.reject(response.data.message)
    }
  })
  $axios.onError(error => {
    if (error.config.goError) {
      redirect(`/error?msg=${error.data.message}`)
    }
  })
  apiModules.banner = bannerModule($axios)
  apiModules.news = newsModule($axios)
  apiModules.user = userModule($axios)
  apiModules.department = departmentModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}
