'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    await this.ctx.render('admin/index', {
      userinfo: this.ctx.session.userinfo,
    });
  }
  async console() {
    await this.ctx.render('admin/home/console');
  }
}

module.exports = AdminController;
