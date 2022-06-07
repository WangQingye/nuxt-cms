import Vue from "vue";
import { imgDomain } from '@/config'
// 无内容占位符
Vue.filter("cloudImage", (image, dir) => {
  if (image === undefined || image === '' || image === null) {
    return
  }
  if (image.indexOf('http://') === 0 || image.indexOf('https://') === 0) {
    return image
  }
  if (image) {
    if (dir) {
      image = dir + '/' + image
    }
    return imgDomain + image
  }
  return
})