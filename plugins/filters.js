import Vue from "vue";
import {
  imgDomain
} from '@/config'
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

Vue.filter("parseTime", (time, cFormat) => {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
    b: date.getMilliseconds(),
  }
  return format.replace(/{([ymdhisab])+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
})
