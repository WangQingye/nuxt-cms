function isMoible(UA) {
  return /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA) ?
    true :
    false;
}

export default function (context) {
  context.userAgent = process.server ?
    context.req.headers["user-agent"] :
    navigator.userAgent;
  context.isMoible = isMoible(context.userAgent);
  console.log(context.route)
  if (context.route.path === '/') {
    context.redirect(context.isMoible ? `/mobile/home` : '/home')
  }
  if (context.isMoible && context.route.path.indexOf('mobile') == -1) {
    context.redirect(`/mobile${context.route.fullPath}`)
  }
}
