import bannerModule from '~/api/banner'
import newsModule from '~/api/news'
export default function ({ $axios }, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
  	// 相关配置
  })
  $axios.onResponse((response) => {
  	// 相关配置
    return Promise.resolve(response.data.data)
  })
  apiModules.banner = bannerModule($axios)
  apiModules.news = newsModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}