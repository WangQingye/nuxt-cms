import Vue from "vue";
import {
  imgDomain
} from '@/config'

/**
 * @description 转换图片地址
 */
export function cloudImg (image, dir) {
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
}
/**
 * @description 获取默认图片
 */
function getDefaultImg(event) {
  return "this.src='https://iconfont.alicdn.com/s/6120b0d8-d2f8-4902-a387-c6b128a6d698_origin.svg';this.onerror = null"
}
Vue.prototype.$utils = {
  getDefaultImg,
  cloudImg
}
