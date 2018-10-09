'use strict';

const BaseController = require('./base');
class ManagerController extends BaseController {
  async index() {
    await this.ctx.render('admin/manager/index');
  }
  async list() {
    // 获取 query
    let { page, limit } = this.ctx.request.query;

    let skip = Number((Number(page) - 1) * Number(limit));
    // limit = Number(limit);
    limit = 100;
    // 多表关联 查询数据

    let list = await this.ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
    ]);

    // 统计数据
    const count = (await this.ctx.model.Admin.find({})).length;

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
      return;
    }

    this.ctx.body = { code: 1, msg: '暂无数据' };

  }
  async add() {
    const role = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/manager/add', { role });
  }
  async doAdd() {
    let field = this.ctx.request.body;
    if (!field.status) {
      field.status = 0;
    }
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
    const id = this.ctx.request.query.id;
    const user = await this.ctx.model.Admin.find({ _id: id });
    const role = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/manager/edit', {
      user: user[0],
      role,
    });
  }
  async doEdit() {
    let form = this.ctx.request.body;
    if (!form.status) {
      form.status = 0;
    }
    if (!form.password) {
      delete form.password;
    } else {
      form.password = await this.ctx.service.tools.md5(form.password);
    }
    const result = await this.ctx.model.Admin.updateOne({ username: form.username }, form);
    this.success('更新成功');

  }
  async del() {
    this.ctx.body = '管理员删除';
  }
}

module.exports = ManagerController;
