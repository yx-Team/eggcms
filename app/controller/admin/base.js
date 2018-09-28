'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 生成验证码
  async verify() {
    const captcha = await this.service.tools.captcha({ color: false });
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
  error(msg) {
    this.ctx.body = {
      success: false,
      error_msg: msg,
    };
    return;
  }
  success(msg, data = []) {
    this.ctx.body = {
      success: true,
      success_msg: msg,
      data,
    };
    return;
  }
}

module.exports = BaseController;
