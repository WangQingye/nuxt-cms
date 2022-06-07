import bannerModule from '~/api/banner'
export default function ({ $axios }, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
  	// 相关配置
  })
  $axios.onResponse((response) => {
  	// 相关配置
    return Promise.resolve(response.data)
  })
  apiModules.banner = bannerModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}