'use strict';

const BaseController = require('../admin/base');
const JWT = require('jsonwebtoken');

// 定义创建接口的请求参数规则
const createRule = {
  username: { type: 'string', required: true, max: 18, min: 6 },
  password: { type: 'password', required: true, max: 18, min: 6 },
  repassword: { type: 'password', compare: 'password' },
  email: { type: 'email', required: true },
};
// 定义登录接口的请求参数规则
const loginRule = {
  username: { type: 'string', required: true, max: 18, min: 6 },
  password: { type: 'password', required: true, max: 18, min: 6 },
};
class UserController extends BaseController {
  async login() {
    console.log(this.config.secret);
    this.ctx.body = 'login';
  }
  async doLogin() {
    // 验证表单
    this.ctx.validate(loginRule, this.ctx.request.body);
    // 获取表单用户名、密码
    let { username, password } = this.ctx.request.body;
    // 加密密码
    let md5Password = await this.ctx.service.tools.md5(password);
    // 查询用户
    const user = await this.ctx.model.User.findOne({ username, password: md5Password });
    if (user) {
      // 生成签名
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        isactive: user.isactive,
        exp: Math.floor(Date.now() / 1000) + (20),
      };
      const token = JWT.sign(payload, this.config.secret);
      this.ctx.body = {
        success: true,
        message: '登录成功',
        token,
      };
      return;
    }


    // var token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzE0LCJleHAiOjE1NDIzNTg1MTEsImlhdCI6MTU0MTc1MzcxMX0.5XxpaWoj5XwVRXvfX5V0euukaGEJyKJhnJf7IOs4JTw';

    // var decoded = JWT.verify(token, 'w530385371');
    // console.log(decoded);
  }
  /**
   * 注册
   * /api/user/reg
   * public
   */
  async reg() {
    // 验证表单
    this.ctx.validate(createRule, this.ctx.request.body);
    let { username, password, email } = this.ctx.request.body;
    // 密码加密
    password = await this.ctx.service.tools.md5(password);
    // 查询数据库是否存在用户
    let hasUser = await this.ctx.model.User.findOne({ username });
    // 不存在，创建用户
    if (!hasUser) {
      const user = new this.ctx.model.User({
        username,
        password,
        email,
      });
      await user.save();
      return this.success('注册成功');
    }
    return this.error('用户已注册');
  }
  async authCallback() {
    this.ctx.body = {
      success: true,
      message: '登录成功',
    };
  }
  async info() {
    this.ctx.body = 'info';
  }
}

module.exports = UserController;
