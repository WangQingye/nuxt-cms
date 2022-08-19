export default ({app}) => {
  console.log('全局插件执行了')
  app.router.afterEach((to, from) => {
    if (typeof window !== 'undefined') {
      (function () {
        var goatcounter = document.createElement("script")
        goatcounter.setAttribute("data-goatcounter", "http://cms.vispp.cn/analytics/count")
        goatcounter.setAttribute("async", "true");
//	   goatcounter.setAttribute("src","//gc.zgo.at/count.js");
        goatcounter.setAttribute("src", "http://cms.vispp.cn/analytics/count.js");
        var s = document.getElementsByTagName("script")[0]
        s.parentNode.insertBefore(goatcounter, s)
      })()
    }
  })
}

