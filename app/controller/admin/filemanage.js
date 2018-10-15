'use strict';

const BaseController = require('./base');
const fs = require('fs');
const path = require('path');
class FilemanageController extends BaseController {
  // 文件列表
  async index() {
    var dir = path.join('app');
    // fs.readdir(dir, (err, files) => {
    //   console.log(files);
    //   for (var i = 0; i < files.length; i++) {
    //     (function(i) {
    //       fs.stat(path.join('app', files[i]), (err, stat) => {
    //         console.log(stat.isDirectory());
    //       });
    //     })(i);
    //   }

    // });
    const list = await fs.readdirSync(dir);
    list.forEach(item => {
      // const stat = await fs.statSync()
      // console.log(stat)
      console.log(item);
    });
  }
  async edit() {
    this.ctx.body = 'edit';
  }
  async doEdit() {
    this.ctx.body = 'doEdit';
  }
  async rename() {
    this.ctx.body = 'rename';
  }
  async delete() {
    this.ctx.body = 'delete';
  }
}

module.exports = FilemanageController;
