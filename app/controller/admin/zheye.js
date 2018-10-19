'use strict';

const Controller = require('egg').Controller;

class ZheyeController extends Controller {
  async index() {
    await this.ctx.render('/admin/zheye/index');
  }
  async add() {
    await this.ctx.render('/admin/zheye/add');
  }
  async doAdd() {
    let body = this.ctx.request.body;
    if (!body.status) {
      body.status = 0;
    }
    const zheye = new this.ctx.model.Zheye(body);
    const result = zheye.save();
    return this.success('添加成功');
  }
  async edit() {
    const _id = this.ctx.request.query.id;
    const zheye = await this.ctx.model.Zheye.findOne({ _id });
    await this.ctx.render('/admin/zheye/edit', { zheye });
  }
  async doEdit() {
    let body = this.ctx.request.body;

    if (!body.status || body.status === '0') {
      body.status = 0;
    } else if (body.status === '1') {
      body.status = 1;
    }
    const result = await this.ctx.service.zheye.update(body);
    return this.success('编辑成功');
  }
  async delete() {
    const _id = this.ctx.request.query.id;
    await this.ctx.service.zheye.delete(_id);
    this.success('删除成功');
  }
  // 分页
  async page() {
    const { limit, page } = this.ctx.request.query;
    const data = await this.ctx.service.zheye.find({ page, limit });
    data.map(item => {
      item.add_time = this.ctx.helper.timeFormat(item.add_time);
      return item;
    });
    const count = await this.ctx.service.zheye.count();
    console.log(data);
    this.ctx.body = {
      code: 0,
      msg: '获取成功',
      count,
      data,
    };
  }
  // 上传
  async upload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        return;
      }
      const filename = stream.filename.toLowerCase();
      // 根据文件名得到上传路径
      let target = await this.ctx.service.tools.getUploadFile(filename);
      const fileSql = target.replace(/\\/g, '/');
      // 创建写入流
      const writeStream = fs.createWriteStream(target);
      // 写入成功，销毁流
      await pump(stream, writeStream);
      files.push({
        file: target.split('app')[1],
      });
    }
    this.success('上传成功', files);
  }
}

module.exports = ZheyeController;
