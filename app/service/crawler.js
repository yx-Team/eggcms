'use strict';

const Service = require('egg').Service;
const path = require('path');
const fse = require('fs-extra');

class CrawlerService extends Service {
  /**
   * 根据网络路径下载文件
   * @param {*} imgURL
   */
  async download(imgURL) {
    // 文件后缀
    const ext = path.extname(imgURL);
    // 爬取图片
    let result = await this.ctx.curl(imgURL);
    // 获取日期
    const date = await this.ctx.service.tools.getTime();
    // 文件名
    const fileName = new Date().getTime() + ext;
    // 上传目录
    const uploadDir = path.join(
      this.app.baseDir,
      this.config.uploadDir,
      date,
      fileName
    );
    try {
      // 生成目录
      await fse.outputFile(uploadDir, result.data);
      return path.join('/public', date, fileName).replace(/\\/g, '/');
    } catch (error) {
      return false;
    }
  }
}

module.exports = CrawlerService;
