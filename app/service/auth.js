'use strict';

const Service = require('egg').Service;
const url = require('url');
class AuthService extends Service {
  async hasAuth() {
    // 1、获取当前访问的url
    // 2、获取当前用户的角色
    // 3、根据角色获取当前角色的权限列表
    // 5、获取当前访问的url 对应的权限id
    // 6、判断当前访问的url对应的权限id 是否在权限列表中的id中

    const whiteList = [ '/admin/login', '/admin/doLogin', '/admin/logout', '/verify' ];

    // 1、获取当前用户的角色
    const userinfo = this.ctx.session.userinfo;
    const role_id = userinfo.role_id;
    // 2、获取当前访问的url
    const currentUrl = url.parse(this.ctx.request.url).pathname;
    // 3、判断如果是超级管理员或者白名单通过验证
    if (userinfo.is_super === 1 || whiteList.indexOf(currentUrl) > -1) {
      return true;
    }
    // 3、根据角色获取当前角色的权限列表
    const access = await this.ctx.model.RoleAccess.find({ role_id });
    let accessList = [];
    access.forEach(item => {
      var access_id = item.access_id.toString();
      accessList.push(access_id);
    });
    // 4、获取当前访问的url 对应的权限id

    const currentAccess = await this.ctx.model.Access.findOne({ url: currentUrl });
    const currentAccessId = currentAccess && currentAccess._id.toString();

    // 5、判断当前访问的url对应的权限id 是否在权限列表中的id中
    if (accessList.indexOf(currentAccessId) > -1) {
      return true;
    }
    return false;

  }
  async getAuthMenu() {
    const { role_id, is_super } = this.ctx.session.userinfo;
    let accessList = [];
    if (is_super === 1) {
      // 超级管理员拥有全部菜单
      accessList = await this.ctx.model.Access.find({ type: { $in: [ 1, 2 ] } }).sort({ sort: 1 });
    } else {
      // 查询权限菜单
      const access = await this.ctx.model.RoleAccess.find({ role_id });
      const accessIdList = access.reduce((arr, { access_id }) => {
        arr.push(access_id);
        return arr;
      }, []);
      accessList = await this.ctx.model.Access.find({ _id: { $in: accessIdList }, type: { $in: [ 1, 2 ] } }).sort({ sort: 1 });
    }
    return this.ctx.helper.getCate2(accessList);
  }
}

module.exports = AuthService;
