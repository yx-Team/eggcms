const JWT = require('jsonwebtoken');
// jwt登录验证中间件
module.exports = (options, app) => {
  return async function jwtAuth(ctx, next) {
    // 白名单
    const white = options.white;
    const currentPath = ctx.request.url;
    if (white.indexOf(currentPath) > -1) {
      await next();
    } else {
      const { authorization } = ctx.header;
      // 验证jwt
      var decoded = await JWT.verify(authorization, app.config.secret);
      await next();
    }

  };
};
