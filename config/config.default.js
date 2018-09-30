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
  // mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/cmsdb',
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
