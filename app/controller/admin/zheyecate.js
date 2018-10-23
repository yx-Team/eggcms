'use strict';

const BaseController = require('./base');

class ZheyecateController extends BaseController {
  async index() {
    await this.ctx.render('/admin/zheyecate/index');
  }
  async add() {
    await this.ctx.render('/admin/zheyecate/add');
  }
  async doAdd() {
    let body = this.ctx.request.body;
    if (!body.status) {
      body.status = 0;
    }
    const zheye = new this.ctx.model.ZheyeCate(body);
    const result = zheye.save();
    return this.success('添加成功');
  }
  async edit() {
    const _id = this.ctx.request.query.id;
    const cate = await this.ctx.model.ZheyeCate.findOne({ _id });
    console.log(cate);
    await this.ctx.render('/admin/zheyecate/edit', { cate });
  }
  async doEdit() {
    let body = this.ctx.request.body;

    if (!body.status || body.status === '0') {
      body.status = 0;
    } else if (body.status === '1') {
      body.status = 1;
    }
    if (body.add_time) {
      delete body.add_time;
    }

    const result = await this.ctx.service.zheyecate.update(body);
    return this.success('编辑成功');
  }
  async delete() {
    const _id = this.ctx.request.query.id;
    await this.ctx.service.zheyecate.delete(_id);
    this.success('删除成功');
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
