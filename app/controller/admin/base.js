'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  // 生成验证码
  async verify() {
    const captcha = await this.service.tools.captcha({ color: false });
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
  // 错误处理
  error(msg) {
    this.ctx.body = {
      success: false,
      error_msg: msg,
    };
    return;
  }
  // 成功处理
  success(msg, data = [], redirect = '') {
    this.ctx.body = {
      success: true,
      success_msg: msg,
      data,
      redirect,
    };
    return;
  }
  // 分页
  async page() {
    // 获取 query
    const { page, limit, model } = this.ctx.request.query;
    const skip = (page - 1) * limit;
    // 查询数据
    const list = await this.ctx.model[model].find({}).limit(Number(limit)).skip(skip);
    // 统计数据
    const count = (await this.ctx.model[model].find({})).length;
    return {
      list,
      count,
    };
  }
  // 公共的删除数据
  async delete() {
    // 获取query传过来的model
    const model = this.ctx.request.query.model;
    // 获取id
    const id = this.ctx.request.query.id;
    // 根据id删除对应模型数据
    const result = await this.ctx.model[model].deleteOne({ _id: id });
    this.success('删除成功');
  }
  // 批量删除
  async deleteMany() {
    // 获取query传过来的model
    const model = this.ctx.request.query.model;
    // 将获取到的ids转为数组 { ids: '5baf2885f772080500697b4e|5baf288ff772080500697b4f|5baf2898f772080500697b50|5baf32efbeb0b235cc607c1e|5baf32f3beb0b235cc607c1f' }
    var ids = this.ctx.request.query.ids.split('|');
    // 删除多条数据
    const result = await this.ctx.model[model].remove({ _id: { $in: ids } });
    this.success('删除成功');
  }
}

module.exports = BaseController;
