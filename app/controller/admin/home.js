'use strict';

const BaseController = require('./base');

class AdminController extends BaseController {
  async index() {
    // 根据权限获取菜单
    const menu = await this.ctx.service.auth.getAuthMenu();
    await this.ctx.render('admin/index', {
      userinfo: this.ctx.session.userinfo,
      menu,
    });
  }
  async console() {
    await this.ctx.render('admin/home/console');
  }
}

module.exports = AdminController;
