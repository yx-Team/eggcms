'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    await this.ctx.render('admin/role/index');
  }
  async add() {
    this.ctx.body = '角色添加';
  }
  async edit() {
    this.ctx.body = '角色编辑';
  }
  async del() {
    this.ctx.body = '角色删除';
  }
}

module.exports = RoleController;
