import Vue from "vue";
import {
  imgDomain
} from '@/config'

/**
 * @description 转换图片地址
 */
function cloudImg (image, dir) {
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

async function getInitData(context) {
  if (context.app.store.state.config.menuList.length == 0) {
    let config = await context.app.$api.banner.getWebConfig()
    let navigation = await context.app.$api.banner.getNavigation()
    context.store.commit('config/setWebConfig', config)
    context.store.commit('config/setMenuList', navigation)
  }
}
function getSubMenuItem(menuItem, subMenuId) {
  let subMenuItem
  findItem(menuItem.children)
  function findItem(arr) {
    arr.forEach(a => {
      if (a.id == subMenuId) {
        subMenuItem = a
        return;
      } else if (a.children) {
        findItem(a.children)
      }
    })
  }
  return subMenuItem
}
function getContentPageMenuData(menuList, menuId, subMenuId) {
  const menuItem = menuList.find(m => m.id == menuId)
  let subMenuItem = getSubMenuItem(menuItem, subMenuId)
  return {
    menuItem,
    menuId: String(menuId),
    subMenuId: String(subMenuId),
    subMenuItem
  }
}

function findMenuTitle(arr, id) {
  let name = ''
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a.id == id) {
      if (!name) name = a.name
      break;
    } else if (a.children) {
      if (!name) name = findMenuTitle(a.children, id)
    }
  }
  return name
}

function findMenuIdByTitle(arr, title) {
  let titleId = undefined
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a.name == title) {
      if (titleId == undefined) titleId = a.id
      break;
    } else if (a.children) {
      if (titleId == undefined) titleId = findMenuIdByTitle(a.children, title)
    }
  }
  return titleId
}

function findMenuItemByTitle(arr, title) {
  let item = undefined
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a.name == title) {
      if (item == undefined) item = a
      break;
    } else if (a.children) {
      if (item == undefined) item = findMenuItemByTitle(a.children, title)
    }
  }
  return item
}

function findMenuParentId(arr, id) {
  let parentId = undefined
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a.id == id) {
      if (parentId == undefined) parentId = a.parent_id
      break;
    } else if (a.children) {
      if (parentId == undefined) parentId = findMenuParentId(a.children, id)
    }
  }
  return parentId
}
function findMenuIdsByTitle(menuList, title) {  
  let id = findMenuIdByTitle(menuList, title)
  let ids = []
  ids.push(id)
  let parentId;
  for (let i = 0; i < 4; i++) {
    parentId = findMenuParentId(menuList, id)
    if (parentId && parentId != 0) {
      ids.push(parentId)
      id = parentId
    }
  }
  ids = ids.reverse()
  return ids
}


function findMenuIdByEventLink(arr, eventLink) {
  let itemId = undefined
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    if (a.event_link == eventLink) {
      if (itemId == undefined) itemId = a.id
      break;
    } else if (a.children) {
      if (itemId == undefined) itemId = findMenuIdByEventLink(a.children, eventLink)
    }
  }
  return itemId
}

function findMenuIdsByEventLink(arr, eventLink) {
  let itemId = findMenuIdByEventLink(arr, eventLink)
  let ids = []
  ids.push(itemId)
  let parentId;
  for (let i = 0; i < 4; i++) {
    parentId = findMenuParentId(arr, itemId)
    if (parentId && parentId != 0) {
      ids.push(parentId)
      itemId = parentId
    }
  }
  ids = ids.reverse()
  if (ids[0]) {
    return ids
  } else {
    return [arr[1].id]
  }
}
const typeToPages = {
  'newsTo': 'news-list',
  'pageTo': 'news-detail',
  'institutionTo': 'lab-detail-info',
  'personnelTo': 'department-detail',
  'personnelTagTo': 'personnel-list',
  'institutionTypeTo': 'department-list'
}
// Vue.prototype.$utils = {
//   getDefaultImg,
//   cloudImg,
//   getInitData
// }

function goLink(link, newPage = true){
  if (newPage) {
    window.open(link, '_blank')
  } else {
    window.open(link, '_self')
  }
}
export default function ({ $axios }, inject) {
  // Inject to context as $api
  inject('utils', {
    getDefaultImg,
    cloudImg,
    getInitData,
    getContentPageMenuData,
    getSubMenuItem,
    typeToPages,
    goLink,
    findMenuTitle,
    findMenuIdsByTitle,
    findMenuItemByTitle,
    findMenuIdsByEventLink,
    findMenuIdByTitle
  })
}