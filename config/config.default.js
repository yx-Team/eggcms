'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538031526805_5014';

  // 中间件
  config.middleware = [];
  // 模版
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  return config;
};
