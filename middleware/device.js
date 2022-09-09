var config = require('../config')
function isMoible(UA) {
  if (UA.indexOf('Pad') > -1 || UA.indexOf('pad') > -1) {
    return false
  }
  return /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA) ?
    true :
    false;
}
export default function (context) {
  if (config.isUpdate) {
    context.redirect('/update')
  }
  context.userAgent = process.server ?
    context.req.headers["user-agent"] :
    navigator.userAgent;
  context.isMoible = isMoible(context.userAgent);
  if (context.route.path === '/') {
    context.redirect('/update')
    // context.redirect(context.isMoible ? `/mobile/home` : '/home')
  }
  // PC转移动
  if (context.isMoible && context.route.path.indexOf('mobile') == -1) {
    if (context.route.path.indexOf('invite') > -1 ) {
      context.redirect(context.route.fullPath.replace('/invite', '/mobileInvite'))
    } else if (context.route.path.indexOf('preview') > -1) {
      context.redirect(context.route.fullPath.replace('/preview', '/mobilePreview'))
    } else if (context.route.path.indexOf('update') > -1) {
      // 升级页没有手机版，所以就不转了
    } else {
      context.redirect(`/mobile${context.route.fullPath}`)
    }
  }
  // 移动转PC
  if (!context.isMoible && context.route.path.indexOf('mobile') > -1) {
    if (context.route.path.indexOf('mobilePreview') > -1) {
      context.redirect(context.route.fullPath.replace('/mobilePreview', '/preview'))
    } else if (context.route.path.indexOf('mobileInvite') > -1) {
      context.redirect(context.route.fullPath.replace('/mobileInvite', '/invite'))
    } else {
      context.redirect(context.route.fullPath.replace('/mobile', ''))
    }
  }
}
