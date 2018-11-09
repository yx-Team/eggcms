'use strict';

const BaseController = require('../admin/base');
const JWT = require('jsonwebtoken');
class UserController extends BaseController {
  async login() {
    console.log(this.ctx.isAuthenticated());
    console.log(this.ctx.user.username);
    this.ctx.body = 'login';
  }
  async doLogin() {
    // const payload = {
    //   userId: 12314,
    //   exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
    // };
    // console.log(JWT.sign(payload, 'w530385371'));
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzE0LCJleHAiOjE1NDIzNTg1MTEsImlhdCI6MTU0MTc1MzcxMX0.5XxpaWoj5XwVRXvfX5V0euukaGEJyKJhnJf7IOs4JTw';

    var decoded = JWT.verify(token, 'w530385371');
    console.log(decoded);
  }
  async reg() {
    let { username, password, repassword, email } = this.ctx.request.body;
    if (!username || !password || !repassword || !email) {
      return this.error('请填写全部信息');
    }
    if (password !== repassword) {
      return this.error('两次密码不一致');
    }
  }
  async authCallback() {
    this.ctx.body = {
      success: true,
      message: '登录成功',
    };
  }
}

module.exports = UserController;
