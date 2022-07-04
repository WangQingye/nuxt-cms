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
    console.log('config', config)
    let navigation = await context.app.$api.banner.getNavigation()
    console.log('navigation', JSON.parse(JSON.stringify(navigation)))
    context.store.commit('config/setWebConfig', config)
    context.store.commit('config/setMenuList', navigation)
    // context.store.commit('config/setMenuList', [
    //   {
    //     title: '中心概况',
    //     menuId: "1",
    //     children: [
    //       {
    //         title: '中心概况',
    //         icon: '',
    //         menuId: "15",
    //         children: [
    //           {
    //             title: '中心简介',
    //             type: '1',
    //             menuId: "2",
    //           },
    //           {
    //             title: '中心领导',
    //             type: '2',
    //             menuId: "3",
    //           },
    //           {
    //             title: '职能部门',
    //             menuId: "16",
    //             children: [
    //               {
    //                 title: '党政办公室',
    //                 type: '2',
    //                 menuId: "4",
    //               },
    //               {
    //                 title: '创新发展办公室',
    //                 type: '2',
    //                 menuId: "5",
    //               },
    //             ]
    //           },
    //           {
    //             title: '业务部门',
    //             type: '3',
    //             menuId: "6",
    //           },
    //           {
    //             title: '信息公开',
    //             type: '4',
    //             menuId: "7",
    //           },
    //         ],
    //       },
    //       {
    //         title: '中心动态',
    //         icon: '',
    //         menuId: "17",
    //         children: [
    //           {
    //             title: '中心要闻',
    //             type: '4',
    //             menuId: "8",
    //           },
    //           {
    //             title: '通知公告',
    //             type: '4',
    //             menuId: "9",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     title: '人才培养',
    //     menuId: "20",
    //     children: [
    //       {
    //         title: '教育教学',
    //         icon: '',
    //         menuId: "18",
    //         children: [
    //           {
    //             title: '课程体系',
    //             type: '4',
    //             menuId: "10",
    //             num: 5,
    //           },
    //           {
    //             title: '精品课程',
    //             type: '4',
    //             menuId: "11",
    //             num: 2,
    //           },
    //           {
    //             title: '校企课程',
    //             type: '4',
    //             menuId: "12",
    //             num: 1,
    //           },
    //         ]
    //       },
    //       {
    //         title: '大创项目',
    //         icon: '',
    //         menuId: "19",
    //         children: [
    //           {
    //             title: '大创概况',
    //             type: '1',
    //             menuId: "13",
    //           },
    //           {
    //             title: '大创培训',
    //             type: '1',
    //             menuId: "14",
    //           },
    //         ]
    //       },
    //     ],
    //   },
    // ])
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

const typeToPages = {
  'newsTo': 'news-list',
  'pageTo': 'news-detail',
  'institutionTo': 'lab-detail',
  'personnelTo': 'department-detail',
  'institutionTypeTo': 'department-list'
}
// Vue.prototype.$utils = {
//   getDefaultImg,
//   cloudImg,
//   getInitData
// }

function goLink(link){
  window.open(link, '_blank')
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
    findMenuTitle
  })
}