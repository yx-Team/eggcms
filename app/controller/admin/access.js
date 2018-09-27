'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
  async index() {
    await this.ctx.render('admin/access/index');
  }
  async add() {
    this.ctx.body = '权限添加';
  }
  async edit() {
    this.ctx.body = '权限编辑';
  }
  async del() {
    this.ctx.body = '权限编删除';
  }
}

module.exports = AccessController;
