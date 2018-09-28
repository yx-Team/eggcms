'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base');
const md5 = require('md5');
class UserController extends BaseController {
  async login() {

    await this.ctx.render('admin/user/login');
  }
  async doLogin() {
    console.log(this.ctx.request.body);
    let { username, password, vercode } = this.ctx.request.body;

    // {"success":false,"error_msg":"不是有效的话题id"}
    // {"success":true,"data":{}}
    console.log(vercode);
    console.log(this.ctx.session.captcha);
    // 检测验证码
    if (vercode.toLowerCase() !== this.ctx.session.captcha.toLowerCase()) {
      this.ctx.body = {
        success: false,
        error_msg: '验证码输入错误',
      };
      return;
    }

    password = md5(password);

    await this.ctx.model.Admin.findOne({ username, password }, (err, doc) => {
      if (err) {
        this.error(err);
        // this.ctx.body = {
        //   success: false,
        //   error_msg: '用户名或密码错误',
        // };
        // return;
      }
      this.ctx.session.userinfo = username;
      this.success('登录成功');
      // this.ctx.body = {
      //   success: true,
      //   success_msg: '登录成功',
      // };
      return;
    });

  }
  async logout() {
    if (this.ctx.session.userinfo) {
      this.ctx.session.userinfo = null;
      this.success('退出成功');
    }

  }

}

module.exports = UserController;
