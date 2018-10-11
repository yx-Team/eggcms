const url = require('url');
module.exports = (options, app) => {
  const whiteList = [ '/admin/login', '/admin/doLogin' ];
  //  检测白名单是否存在
  function checkUrl(ctx) {
    // url.parse()  方法会解析一个 URL 字符串并返回一个 URL 对象
    // 通过 pathname 获取URL的路径(path)部分
    // 比对是否存在白名单内
    const myurl = url.parse(ctx.request.url).pathname;
    return whiteList.indexOf(myurl) > -1;
  }

  return async function adminAuth(ctx, next) {
    // form全局变量
    ctx.state.csrf = ctx.csrf;

    if (ctx.session.userinfo) {
      // 权限验证
      const hasAuth = await ctx.service.auth.hasAuth();
      // const hasAuth = true;
      if (hasAuth) {
        await next();
      } else {
        // ctx.body = '没有权限';
        await ctx.render('/admin/template/auth.html');
      }

    } else {
      if (checkUrl(ctx)) {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
};
