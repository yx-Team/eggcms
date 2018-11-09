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
      enable: false,
    },
  };
  // mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://admin:du123456@119.27.164.157:27017/cmsdb?authSource=admin',
      // mongodb://admin:123456@localhost:27017/
      // url: 'mongodb://test:du123456@ds127843.mlab.com:27843/cmsdb',
      options: {},
    },
  };
  // 中间件
  config.middleware = [ 'adminAuth', 'local' ];
  // 匹配链接有/admin的路径，需要验证
  config.adminAuth = {
    enable: true,
    match: '/admin',
  };
  config.local = {
    enable: true,
    // match: '/api/user',
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
    // html(err, ctx) {

    //   ctx.body = '<h3>error</h3>';
    //   ctx.status = 500;
    // },
    // json(err, ctx) {

    //   ctx.body = { success: false, message: 'error' };
    //   ctx.status = 500;
    // },

  };

  // 七牛云配置
  config.qiniu = {
    accessKey: 'vbfz0guEuh87tn1eKrg17UCqny00YHb6425t0Ehw',
    secretKey: 'cXI-HwRILF28uopvPQdtTXo9STSMHk96JDB5UcNN',
    bucket: 'iuehtml',
    zone: 'Zone_z2',
    prefix: '',
    Domain: 'http://static.iuehtml.cn/',
  };
  return config;
};
