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
  async list() {
    let data = await this.ctx.model.Zheye.find({});
    this.ctx.body = {
      success: true,
      data,
    };
  }
  async update() {

  }
}

module.exports = ZheyeController;
