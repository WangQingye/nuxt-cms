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
    let data = await context.app.$api.banner.getWebConfig()
    context.store.commit('config/setWebConfig', data)
    context.store.commit('config/setMenuList', [
      { 
        title: '中心概况',
        menuId: "1",
        children: [
          {
            title: '中心概况',
            icon: '',
            menuId: "15",
            children: [
              {
                title: '中心简介',
                type: '1',
                menuId: "2",
              },
              {
                title: '中心领导',
                type: '2',
                menuId: "3",
              },
              {
                title: '职能部门',
                menuId: "16",
                children: [
                  {
                    title: '党政办公室',
                    type: '2',
                    menuId: "4",
                  },
                  {
                    title: '创新发展办公室',
                    type: '2',
                    menuId: "5",
                  },
                ]
              },
              {
                title: '业务部门',
                type: '3',
                menuId: "6",
              },
              {
                title: '信息公开',
                type: '4',
                menuId: "7",
              },
            ],
          },
          {
            title: '中心动态',
            icon: '',
            menuId: "17",
            children: [
              {
                title: '中心要闻',
                type: '4',
                menuId: "8",
              },
              {
                title: '通知公告',
                type: '4',
                menuId: "9", 
              },
            ],
          },
        ],
      },
      {
        title: '人才培养',
        menuId: "20",
        children: [
          {
            title: '教育教学',
            icon: '',
            menuId: "18",
            children: [
              {
                title: '课程体系',
                type: '4',
                menuId: "10",
                num: 5,
              },
              {
                title: '精品课程',
                type: '4',
                menuId: "11",
                num: 2,
              },
              {
                title: '校企课程',
                type: '4',
                menuId: "12",
                num: 1,
              },
            ]
          },
          {
            title: '大创项目',
            icon: '',
            menuId: "19",
            children: [
              {
                title: '大创概况',
                type: '1',
                menuId: "13",
              },
              {
                title: '大创培训',
                type: '1',
                menuId: "14",
              },
            ]
          },
        ],
      },
    ])
  }
  console.log('setinitdata')
}
function getSubMenuItem(menuItem, subMenuId) {
  console.log(menuItem,subMenuId )
  let subMenuItem
  menuItem.children.forEach(m => {
    // 一级
    if (m.menuId == subMenuId) {
      subMenuItem = m
    } else if (m.children) {
      m.children.forEach(mc => {
        // 二级
        if (mc.menuId == subMenuId) {
          subMenuItem = mc
        } else if (mc.children) {
          mc.children.forEach(mcc => {
            // 三级
            if (mcc.menuId = subMenuId) {
              subMenuItem = mcc
            }
          })
        }
      })
      // console.log(m.children)
      // console.log(item)
      // if (item) {
      //   subMenuItem = item
      // } else if () {

      // }
    }
  })
  return subMenuItem
}
function getContentPageMenuData(menuList, menuId, subMenuId) {
  const menuItem = menuList.find(m => m.menuId == menuId)
  let subMenuItem = getSubMenuItem(menuItem, subMenuId)
  return {
    menuItem,
    menuId: String(menuId),
    subMenuId: String(subMenuId),
    subMenuItem
  }
}
const typeToPages = {
  '1': 'news-detail',
  '2': 'department-detail',
  '3': 'department-list',
  '4': 'news-list'
}
// Vue.prototype.$utils = {
//   getDefaultImg,
//   cloudImg,
//   getInitData
// }
export default function ({ $axios }, inject) {
  // Inject to context as $api
  inject('utils', {
    getDefaultImg,
    cloudImg,
    getInitData,
    getContentPageMenuData,
    getSubMenuItem,
    typeToPages
  })
}
