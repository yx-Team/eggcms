
const LocalStrategy = require('passport-local').Strategy;
const JWT = require('jsonwebtoken');
module.exports = (options, app) => {
  // 挂载 strategy
  return async function local(ctx, next) {
    app.passport.use(new LocalStrategy({
      passReqToCallback: true,
    }, async (req, username, password, done) => {
      // format user
      let md5password = await ctx.service.tools.md5(password);
      const user = {
        provider: 'local',
        username,
        password: md5password,
      };
      console.log('format');
      app.passport.doVerify(req, user, done);
    }));

    // 校验用户 查询数据库
    app.passport.verify(async (ctx, user) => {

      let hasUser = await ctx.model.User.findOne({ username: user.username, password: user.password });
      console.log(hasUser);
      if (hasUser) {
        const payload = {
          userId: hasUser._id,
          username: hasUser.username,
          email: hasUser.email,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
        let token = JWT.sign(payload, app.config.secret);
        console.log(token);
        return token;
      }
      return false;


    });
    // 序列化用户信息后存储进 session
    // app.passport.serializeUser(async (ctx, user) => {
    //   console.log('serializeUser');
    //   console.log(user);
    //   return user;
    // });
    // 反序列化后取出用户信息
    // app.passport.deserializeUser(async (ctx, user) => {
    //   console.log('deserializeUser');

    //   var decoded = JWT.verify(user, app.config.secret);
    //   console.log(decoded);
    //   return decoded;
    // });
    next();
  };
};
