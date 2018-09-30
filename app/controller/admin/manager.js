'use strict';

const BaseController = require('./base');
class ManagerController extends BaseController {
  async index() {
    await this.ctx.render('admin/manager/index');
  }
  async list() {
    // 获取 query
    const { page, limit, model } = this.ctx.request.query;
    const skip = (page - 1) * limit;
    // 多表关联 查询数据
    let list = await this.ctx.model[model].aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $limit: Number(limit),
      },
      {
        $skip: skip,
      },
    ]);
    // 统计数据
    const count = (await this.ctx.model[model].aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ])).length;

    if (list.length) {
      // 通过helper转换时间
      list = list.map(item => {
        item.add_time = this.ctx.helper.timeFormat(item.add_time);
        return item;
      });
      this.ctx.body = {
        code: 0,
        msg: '',
        count,
        data: list,
      };
    } else {
      this.ctx.body = { code: 1, msg: '暂无数据' };
    }
  }
  async add() {
    const role = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/manager/add', { role });
  }
  async doAdd() {
    let field = this.ctx.request.body;
    // 查询管理员是否存在
    const hasOne = await this.ctx.model.Admin.find({ username: field.username });
    if (hasOne.length) {
      this.error('管理员已存在，请不要重复添加');
      return;
    }
    // 不存在，添加
    field.password = await this.ctx.service.tools.md5(field.password);
    const manager = new this.ctx.model.Admin(field);
    const result = manager.save();
    this.success('添加成功');
  }
  async edit() {
    this.ctx.body = '管理员编辑';
  }
  async del() {
    this.ctx.body = '管理员删除';
  }
}

module.exports = ManagerController;
