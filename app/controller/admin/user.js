'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base');
const md5 = require('md5');
class UserController extends BaseController {
  async login() {
    if (this.ctx.request.method === 'POST') {
      // 获取post的值
      let { username, password, vercode } = this.ctx.request.body;
      // 检测验证码
      if (vercode.toLowerCase() !== this.ctx.session.captcha.toLowerCase()) {
        return this.error('验证码输入错误');

      }
      // 查询数据库
      const result = await this.ctx.model.Admin.find({ username, password: md5(password) });
      // 用户名或密码错误
      if (!result.length) {
        return this.error('用户名或密码错误');
      }

      let userinfo = result[0];
      // status为0 禁止登录
      if (userinfo.status === 0) {
        return this.error('禁止登录，请联系管理员');
      }
      userinfo.password = null;
      this.ctx.session.userinfo = userinfo;
      return this.success('登录成功');


    }
    // get 渲染模版
    await this.ctx.render('admin/user/login');


  }

  // 注销
  async logout() {
    if (this.ctx.session.userinfo) {
      this.ctx.session.userinfo = null;
      return this.success('退出成功');
    }
  }
}

module.exports = UserController;
