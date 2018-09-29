'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./base');
class RoleController extends BaseController {
  // 显示角色列表界面
  async index() {
    const list = this.ctx.model.Role.find({});
    await this.ctx.render('admin/role/index', {
      list,
    });
  }

  // 角色api列表
  async list() {
    const { list, count } = await this.page();
    if (list.length) {
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
  // 添加角色界面
  async add() {
    await this.ctx.render('admin/role/roleform');
  }
  // 添加角色
  async doAdd() {
    const roleForm = this.ctx.request.body;
    const role = new this.ctx.model.Role(roleForm);
    const result = await role.save();
    this.success('添加成功');
  }
  // 编辑角色界面
  async edit() {
    // 查询角色
    let role = await this.ctx.model.Role.findOne({ _id: this.ctx.request.query.id });
    await this.ctx.render('admin/role/roleformEdit', { role });
  }
  // 编辑角色
  async doEdit() {
    const role = this.ctx.request.body;
    const result = await this.ctx.model.Role.updateOne({ _id: role._id }, role);
    this.success('修改成功');
  }

}

module.exports = RoleController;
