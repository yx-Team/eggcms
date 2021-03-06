'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');

const mkdirp = require('mz-modules/mkdirp');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
class ToolsService extends Service {
  /**
   * @param {*} [options={}] 自定义参数设置
   * @example
   * var options={}
   * const captcha = await this.ctx.service.tools.captcha(options)
   * this.ctx.response.type = 'image/svg+xml'    //设置响应的格式
   * console.log(captcha.text)        //返回验证码的字符
   * this.ctx.body = captcha.data     //返回图片
   *
   * @description 验证码
   */
  async captcha(options = {}) {
    var opt = {
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 1, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#ffffff', // 验证码图片背景颜色
    };
    opt = Object.assign({}, opt, options);
    var captcha = svgCaptcha.create(opt);
    this.ctx.session.captcha = captcha.text;
    return captcha;
  }
  /**
   * md5 加密
   * @param {*} params
   */
  async md5(params) {
    return md5(params);
  }
  /**
   * 获取时间
   */
  async getTime() {
    var time = dayjs(new Date().getTime()).format('YYYYMMDD');
    return time;
  }
  /**
   * 获取上传后的图片路径
   * @param {*} filename
   */
  async getUploadFile(filename) {
    // 获取日期
    const date = await this.getTime();
    // 根据日期创建目录
    const dir = path.join(this.config.uploadDir, date);
    await mkdirp(dir);
    // 获取时间
    const time = await new Date().getTime();
    //   根据时间生成文件
    const target = path.join(dir, time + path.extname(filename));
    return target;
  }
  /**
   * 根据路径生成文件列表
   * @param {*} root
   */
  async getFileList(root) {
    const files = fs.readdirSync(root);
    let dir = [];
    let file = [];
    files.forEach(item => {
      const stat = fs.statSync(path.join(root, item));
      const ctime = this.ctx.helper.timeFormat(stat.ctime);
      const birthtime = this.ctx.helper.timeFormat(stat.birthtime);

      const appRoot = path.join(this.app.baseDir, 'app');
      const publicRoot = path.join(root, item).split(appRoot)[1];

      if (stat.isDirectory()) {
        dir.push({
          name: item,
          size: stat.size,
          ctime,
          birthtime,
          publicRoot,
          path: path.join(root, item),
          icon: '/public/admin/layuiadmin/images/file/FOLDER.png',
          flag: 1, // 1-目录，2-文件
        });
      } else {
        // 根据文件名得到文件图标
        const icon = this.ctx.helper.getFileIcon(item);
        // 转换尺寸大小
        const size = this.ctx.helper.getFileSize(stat.size);
        file.push({
          name: item,
          size,
          ctime,
          birthtime,
          publicRoot,
          path: path.join(root, item),
          icon: '/public/admin/layuiadmin/images/file/' + icon,
          flag: 2,
        });
      }
    });

    return dir.concat(file);
  }

}

module.exports = ToolsService;
