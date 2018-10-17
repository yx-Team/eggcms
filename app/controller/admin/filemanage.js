'use strict';

const BaseController = require('./base');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

class FilemanageController extends BaseController {
  // 文件列表
  async index() {
    // 根目录
    let root = path.join(this.app.baseDir, 'app/public');
    let appRoot = path.join(this.app.baseDir, 'app');
    // 请求的目录
    let dir = path.join(this.ctx.request.query.dir || root);
    if (dir.split(root).length === 1) {
      dir = root;
    }
    // 上级目录
    let prevDir = path.join(dir, '..');
    dir = dir.replace(/\\/g, '//');
    appRoot = appRoot.replace(/\\/g, '//');
    // prevDir = prevDir.replace(/\\/g, '//');
    await this.ctx.render('/admin/filemanage/index', { dir, prevDir, appRoot });
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
  // 创建文件目录
  async create() {
    let { dir } = this.ctx.request.body;
    if (path.extname(dir)) {
      // 是文件
      try {
        await fse.ensureFile(dir);
        this.success('创建成功');
      } catch (error) {
        this.error('创建失败');
      }

    } else {
      // 目录
      try {
        await fse.ensureDir(dir);
        this.success('创建成功');
      } catch (error) {
        this.error('创建失败');
      }
    }
  }
  async edit() {
    const dir = this.ctx.request.query.dir;
    let editCode = await fs.readFileSync(dir, 'utf-8');
    await this.ctx.render('/admin/filemanage/edit', { editCode, dir });
  }
  async doEdit() {
    let { dir, editCode } = this.ctx.request.body;
    // await fs.writeFileSync(dir, editCode, 'utf-8');
    try {
      await fse.outputFile(dir, editCode, 'utf-8');
      this.success('编辑成功');
    } catch (error) {
      this.error('删除失败');
    }

  }
  // 重命名
  async rename() {
    let { oldName, currentName } = this.ctx.request.body;
    try {
      await fse.rename(oldName, currentName);
      this.success('重命名成功');
    } catch (error) {
      this.error('重命名失败');
    }
  }
  // 下载
  async download() {
    // 获取文件路径
    let { dir } = this.ctx.request.query;
    // 获取文件名
    let name = path.basename(dir);
    // 设置附件名字
    this.ctx.attachment(name);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(dir);
  }
  // 删除
  async delete() {
    let { dir } = this.ctx.request.body;
    try {
      await fse.remove(dir);
      this.success('删除成功');
    } catch (err) {
      this.error('删除失败');
    }
  }
}

module.exports = FilemanageController;
