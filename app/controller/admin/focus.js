'use strict';

const BaseController = require('./base');

class FocusController extends BaseController {
  async index() {
    await this.ctx.render('/admin/focus/index');
  }
  async add() {
    await this.ctx.render('/admin/focus/add');
  }
  async doAdd() {
    let body = this.ctx.request.body;
    if (!body.status) {
      body.status = 0;
    }
    const focus = new this.ctx.model.Focus(body);
    const result = focus.save();
    return this.success('添加成功');
  }
  async edit() {
    const _id = this.ctx.request.query.id;
    const focus = await this.ctx.model.Focus.findOne({ _id });
    await this.ctx.render('/admin/focus/edit', { focus });
  }
  async doEdit() {
    let body = this.ctx.request.body;

    if (!body.status || body.status === '0') {
      body.status = 0;
    } else if (body.status === '1') {
      body.status = 1;
    }
    const result = await this.ctx.service.focus.update(body);
    return this.success('编辑成功');
  }
  async delete() {
    const _id = this.ctx.request.query.id;
    await this.ctx.service.focus.delete(_id);
    this.success('删除成功');
  }
  // 分页
  async page() {
    const { limit, page } = this.ctx.request.query;
    const data = await this.ctx.service.focus.find({ page, limit });
    data.map(item => {
      item.add_time = this.ctx.helper.timeFormat(item.add_time);
      return item;
    });
    const count = await this.ctx.service.focus.count();
    this.ctx.body = {
      code: 0,
      msg: '获取成功',
      count,
      data,
    };
  }

}

module.exports = FocusController;
