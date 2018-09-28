'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render('admin/manager/index');
  }
  async add() {
    var add = new this.ctx.model.Admin({
      username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      mobile: '13527464482',
      email: '530385371@qq.com',
      is_super: 1,
    });
    add.save((err, doc) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(doc);
    });
    // this.ctx.model.Admin.find({}, (err, doc) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(doc);
    // });
    this.ctx.body = '管理员添加';
  }
  async edit() {
    this.ctx.body = '管理员编辑';
  }
  async del() {
    this.ctx.body = '管理员删除';
  }
}

module.exports = ManagerController;
