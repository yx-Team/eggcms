'use strict';

const BaseController = require('../admin/base');
const JWT = require('jsonwebtoken');

// 定义注册接口的请求参数规则
const regRule = {
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
  /**
   * router GET /api/user/login
   * @description 登录界面
   * @access public
   */
  async login() {
    this.ctx.body = 'login';

  }
  /**
   * router POST /api/user/doLogin
   * @description 登录ACTION
   * @access public
   */
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
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      };
      const token = JWT.sign(payload, this.config.secret);
      this.ctx.body = {
        success: true,
        message: '登录成功',
        token,
      };
      return;
    }
  }
  /**
   * router get /api/user/reg
   * @description 注册界面
   * @access public
   */
  async reg() {
    this.ctx.body = '注册';
  }
  /**
   * router POST /api/user/reg
   * @description 注册Action
   * @access public
   */
  async doReg() {
    // 验证表单
    this.ctx.validate(regRule, this.ctx.request.body);
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
  /**
   * router get /api/user/info
   * @description 信息展示
   * @access private
   */
  async info() {
    const { authorization } = this.ctx.header;
    const user = JWT.verify(authorization, this.config.secret);
    this.ctx.body = user;
  }
}

module.exports = UserController;
