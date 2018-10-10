'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./base');
class RoleController extends BaseController {
  // 显示角色列表界面
  async index() {
    // const list = this.ctx.model.Role.find({});
    await this.ctx.render('admin/role/index');
  }
  // 添加角色界面
  async add() {
    await this.ctx.render('admin/role/roleform');
  }
  // 添加角色
  async doAdd() {
    const roleForm = this.ctx.request.body;
    const hasOne = await this.ctx.model.Role.find({ title: roleForm.title });
    if (hasOne.length) {
      this.error('角色已存在，请勿重复添加');
      return;
    }
    const role = new this.ctx.model.Role(roleForm);
    const result = await role.save();
    this.success('添加成功');
  }
  // 编辑角色界面
  async edit() {
    // 查询角色
    let role = await this.ctx.model.Role.findOne({ _id: this.ctx.request.query.id });
    await this.ctx.render('admin/role/roleformEdit', { role });
  }
  // 编辑角色
  async doEdit() {
    const role = this.ctx.request.body;
    const result = await this.ctx.model.Role.updateOne({ _id: role._id }, role);
    this.success('修改成功');
  }
  // 授权
  async auth() {
    if (this.ctx.request.method === 'POST') {
      let { node, _id } = this.ctx.request.body;
      let data = [];
      node && node.forEach(item => {
        data.push({
          role_id: _id,
          access_id: item,
        });
      });
      // 先删除当前角色权限
      const delResult = await this.ctx.model.RoleAccess.deleteMany({ role_id: _id });
      // 再添加当前角色权限
      
      // 方式一：循环插入数据
      // for(var i=0;i<data.length;i++){
      //   let RoleAccessAdd = new this.ctx.model.RoleAccess(data[i])
      //   RoleAccessAdd.save();
      // }

      // 方式二：create插入
      const addResult = await this.ctx.model.RoleAccess.create(...data);
      return this.success('添加成功');
    }
    const _id = this.ctx.request.query.id;

    const roleAccessListObj = await this.ctx.model.RoleAccess.find({ role_id: this.app.mongoose.Types.ObjectId(_id) });
    let roleAccessList = [];
    roleAccessListObj.forEach(item => {
      roleAccessList.push(item.access_id.toString());
    });
    
    const accessList = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: { module_id: '0' },
      },

    ]);

    await this.ctx.render('/admin/role/auth', { accessList, _id, roleAccessList });
  }

}

module.exports = RoleController;
