'use strict';

const BaseController = require('./base');

class AdminController extends BaseController {
  async index() {

    // 查询权限菜单
    // const { role_id, is_super } = this.ctx.session.userinfo;
    // let accessList = [];
    // if (is_super === 1) {
    //   accessList = await this.ctx.model.Access.find({ type: { $in: [ 1, 2 ] } }).sort({ sort: 1 });
    // } else {
    //   const access = await this.ctx.model.RoleAccess.find({ role_id }).sort({ sort: 1 });
    //   // 权限id数组['asdasd','asdasd','asdsad']
    //   const accessIdList = access.reduce((arr, { access_id }) => {
    //     arr.push(access_id);
    //     return arr;
    //   }, []);
    //   accessList = await this.ctx.model.Access.find({ _id: { $in: accessIdList }, type: { $in: [ 1, 2 ] } });
    // }
    // const accessData = this.getCate2(accessList);
    const menu = await this.ctx.service.auth.getAuthMenu();
    console.log(menu);
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
