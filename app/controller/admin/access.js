'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
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
      {
        $sort: { sort: 1, _id: 1 },
      },
    ]);
    await this.ctx.render('admin/access/index', { accessList });
  }
  async add() {
    if (this.ctx.request.method === 'POST') {
      let body = this.ctx.request.body;
      if (body.module_id !== '0') {
        body.module_id = this.app.mongoose.Types.ObjectId(body.module_id);
      }
      const accessModel = new this.ctx.model.Access(body);
      accessModel.save();
      return this.success('添加成功');
    }
    const moduleList = await this.ctx.model.Access.find({ module_id: '0' });
    await this.ctx.render('admin/access/add', { moduleList });
  }
  async edit() {
    if (this.ctx.request.method === 'POST') {
      let body = this.ctx.request.body;
      if (body.module_id !== '0') {
        body.module_id = this.app.mongoose.Types.ObjectId(body.module_id);
      }
      const result = await this.ctx.model.Access.updateOne({ _id: body._id }, body);
      return this.success('修改成功');
    }
    const _id = this.ctx.request.query.id;
    const accessInfo = await this.ctx.model.Access.find({ _id });
    const moduleList = await this.ctx.model.Access.find({ module_id: '0' });
    await this.ctx.render('admin/access/edit', { accessInfo: accessInfo[0], moduleList });
  }

}

module.exports = AccessController;
