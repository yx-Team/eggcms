'use strict';

const BaseController = require('./base');
const pump = require('mz-modules/pump');
const mkdirp = require('mz-modules/mkdirp');
const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');
class UploadController extends BaseController {
  async getTime() {
    var time = dayjs(new Date().getTime()).format('YYYYMMDD');
    return time;
  }
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
  async uploads() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        return;
      }
      const filename = stream.filename.toLowerCase();
      const fieldname = stream.fieldname;
      // 获取日期
      const date = await this.getTime();
      // 根据日期创建目录
      const dir = path.join(this.config.uploadDir, date);
      await mkdirp(dir);
      // 获取时间
      const time = await new Date().getTime();
      //   根据时间生成文件
      const target = path.join(dir, time + path.extname(filename));
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files.push({
        file: target,
      });
    }
    this.success('上传成功', files);

  }
}

module.exports = UploadController;
