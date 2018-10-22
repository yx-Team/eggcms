'use strict';

const BaseController = require('./base');

class ZheyecateController extends BaseController {
  async index() {
    await this.ctx.render('/admin/zheyecate/index');
  }
  async page() {
    const { limit, page } = this.ctx.request.query;
    const data = await this.ctx.service.zheyecate.findAll({ page, limit });
    data.map(item => {
      item.add_time = this.ctx.helper.timeFormat(item.add_time);
      return item;
    });
    const count = await this.ctx.service.zheyecate.count();

    this.ctx.body = {
      code: 0,
      msg: '获取成功',
      count,
      data,
    };
  }

}

module.exports = ZheyecateController;
