'use strict';

const BaseController = require('./base');
const fs = require('fs');
const path = require('path');

class FilemanageController extends BaseController {
  // 文件列表
  async index() {
    // 根目录
    let root = this.app.baseDir;
    // 请求的目录
    let dir = path.join(this.ctx.request.query.dir || root);
    if (dir.split(root).length === 1) {
      dir = root;
    }
    // 上级目录
    let prevDir = path.join(dir, '..');
    dir = dir.replace(/\\/g, '//');
    // prevDir = prevDir.replace(/\\/g, '//');
    await this.ctx.render('/admin/filemanage/index', { dir, prevDir });
  }
  async list() {
    // 根目录
    let root = this.app.baseDir;
    // 请求的目录
    let dir = this.ctx.request.query.dir || root;
    // 根据目录获取文件
    const fileList = await this.ctx.service.tools.getFileList(path.join(dir));
    this.ctx.body = {
      code: 0,
      msg: '获取成功',
      count: 100,
      data: fileList,
    };
  }
  async edit() {
    const dir = this.ctx.request.query.dir;
    let editCode = await fs.readFileSync(dir, 'utf-8');

    await this.ctx.render('/admin/filemanage/edit', { editCode, dir });
  }
  async doEdit() {
    let { dir, editCode } = this.ctx.request.body;
    await fs.writeFileSync(dir, editCode, 'utf-8');
    this.success('编辑成功');
  }
  async rename() {
    this.success('编辑成功');
  }
  async delete() {
    let { dir } = this.ctx.request.body;
    const stat = await fs.statSync(dir);
    let result;
    if (stat.isDirectory()) {
      await fs.rmdirSync(dir);
    } else {
      await fs.unlinkSync(dir);
    }

  }
}

module.exports = FilemanageController;
