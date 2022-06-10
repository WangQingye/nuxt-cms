import Vue from "vue";
/**
 * @description 获取默认图片
 */
function getDefaultImg(event) {
  return "this.src='https://iconfont.alicdn.com/s/6120b0d8-d2f8-4902-a387-c6b128a6d698_origin.svg';this.onerror = null"
}
Vue.prototype.$utils = {
  getDefaultImg
}
