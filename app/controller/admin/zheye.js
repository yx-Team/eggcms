'use strict';

const BaseController = require('./base');
const qiniu = require('qiniu');
const nanoid = require('nanoid');
class ZheyeController extends BaseController {

  async index() {
    await this.ctx.render('/admin/zheye/index');
  }
  async add() {
    const cate = await this.ctx.model.ZheyeCate.find({});
    await this.ctx.render('/admin/zheye/add', { cate });
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
    const cate = await this.ctx.model.ZheyeCate.find({});
    await this.ctx.render('/admin/zheye/edit', { zheye, cate });
  }
  async doEdit() {
    let body = this.ctx.request.body;

    if (!body.status || body.status === '0') {
      body.status = 0;
    } else if (body.status === '1') {
      body.status = 1;
    }
    if (body.add_time) {
      delete body.add_time;
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
    let newdata = [];
    data.forEach(item => {
      var newItem = JSON.parse(JSON.stringify(item));
      newItem.update_at = this.ctx.helper.timeFormat(newItem.update_at);
      newItem.create_at = this.ctx.helper.timeFormat(newItem.create_at);
      newdata.push(newItem);
    });
    const count = await this.ctx.service.zheye.count();

    this.ctx.body = {
      code: 0,
      msg: '获取成功',
      count,
      data: newdata,
    };
  }

  async uploadQiniu() {
    let url = 'http://dlweb.sogoucdn.com/translate/pc/static/img/logo@1x.dd6a432c.png';
    // 第一步：获取配置
    const qiniuOptions = this.config.qiniu;
    const bucket = qiniuOptions.bucket;
    const accessKey = qiniuOptions.accessKey;
    const secretKey = qiniuOptions.secretKey;
    const zone = qiniuOptions.zone;
    const key = nanoid() + '.png';
    // 第二步：定义好鉴权对象mac
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // 第三步：设置服务空间
    const cfg = new qiniu.conf.Config();
    cfg.zone = qiniu.zone[zone];
    // 第四步
    const client = new qiniu.rs.BucketManager(mac, cfg);
    let result;
    try {
      result = await this.fetch(client, url, bucket, key);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    this.ctx.body = this.config.qiniu.Domain + result.key;

  }
  async fetch(client, url, bucket, key) {
    return new Promise((resolve, reject) => {
      client.fetch(url, bucket, nanoid(), (err, ret, info) => {
        if (err) {
          reject(error);
        } else {
          if (info.status !== 200) {
            reject(info.data.error);
          } else {
            resolve(info.data);
          }
        }

      });
    });
  }

}

module.exports = ZheyeController;
