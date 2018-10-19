'use strict';

const Controller = require('egg').Controller;

class ZheyeController extends Controller {
  async cate() {
    const data = await this.ctx.model.ZheyeCate.find({});
    this.ctx.body = {
      success: true,
      data,
    };
  }
}

module.exports = ZheyeController;
