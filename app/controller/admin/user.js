'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base');
const md5 = require('md5');
class UserController extends BaseController {
  async login() {
    await this.ctx.render('admin/user/login');
  }
  // 登录
  async doLogin() {
    // 获取post的值
    let { username, password, vercode } = this.ctx.request.body;
    // 检测验证码
    if (vercode.toLowerCase() !== this.ctx.session.captcha.toLowerCase()) {
      this.ctx.body = {
        success: false,
        error_msg: '验证码输入错误',
      };
      return;
    }
    // 查询数据库
    console.log(username, md5(password));
    await this.ctx.model.Admin.findOne({ username, password: md5(password) }, (err, doc) => {
      if (err) {
        this.error(err);
      }
      if (doc) {
        this.ctx.session.userinfo = username;
        this.success('登录成功');
      } else {
        this.error('用户名或密码错误');
      }
      return;
    });
  }
  // 注销
  async logout() {
    if (this.ctx.session.userinfo) {
      this.ctx.session.userinfo = null;
      this.success('退出成功');
    }
  }
}

module.exports = UserController;