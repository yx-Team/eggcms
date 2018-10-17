'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538031526805_5014';
  // 上传目录
  config.uploadDir = 'app/public/upload/';
  // session
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
      // url: 'mongodb://test:du123456@ds127843.mlab.com:27843/cmsdb',
      options: {},
    },
  };
  // 中间件
  config.middleware = [ 'adminAuth' ];
  // 匹配链接有/admin的路径，需要验证
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
  // 错误处理
  config.onerror = {
    // all(err, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = 'error';
    //   ctx.status = 500;
    // },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { success: false, message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  };
  return config;
};
