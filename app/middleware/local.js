
const LocalStrategy = require('passport-local').Strategy;

module.exports = (options, app) => {
  // 挂载 strategy
  return async function local(ctx, next) {
    app.passport.use(new LocalStrategy({
      passReqToCallback: true,
    }, (req, username, password, done) => {
      // format user

      const user = {
        provider: 'local',
        username,
        password,
      };

      app.passport.doVerify(req, user, done);
    }));

    // 校验用户 查询数据库
    app.passport.verify(async (ctx, user) => {

      return user;

    });
    // 序列化用户信息后存储进 session
    app.passport.serializeUser(async (ctx, user) => {
      return user;
    });
    // 反序列化后取出用户信息
    app.passport.deserializeUser(async (ctx, user) => {
      return user;
    });
    next();
  };
};
