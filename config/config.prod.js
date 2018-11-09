'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // 设置线上环境端口
  config.cluster = {
    listen: {
      port: 8080,
      hostname: '127.0.0.1',
    },
  };
  return config;
};
