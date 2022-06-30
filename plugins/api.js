import bannerModule from '~/api/banner'
import newsModule from '~/api/news'
import userModule from '~/api/user'
import { Message } from "element-ui";
export default function ({ $axios }, inject) {
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
      return Promise.resolve(response.data.data)
      // return Promise.reject(response.data.message)
    }
  })
  apiModules.banner = bannerModule($axios)
  apiModules.news = newsModule($axios)
  apiModules.user = userModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}