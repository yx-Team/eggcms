'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538031526805_5014';
  config.session = {
    key: 'EGG_CMS',
    maxAge: 3600 * 1000, // 1 小时
    httpOnly: true,
    encrypt: true,
    renew: true, // 延迟有效期
  };
  // 安全验证
  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: ctx => isInnerIp(ctx.ip),
      enable: true,
    },
  };
  // mongoose
  config.mongoose = {
    client: {
       url: 'mongodb://127.0.0.1:27017/cmsdb',
      //url: 'mongodb://test:du123456@ds127843.mlab.com:27843/cmsdb',
      options: {},
    },
  };
  // 中间件
  config.middleware = [ 'adminAuth' ];
  config.adminAuth = {
    enable: true,
    match: '/admin',
  };
  // 模版
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  return config;
};
