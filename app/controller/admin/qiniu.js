'use strict';

const BaseController = require('./base');
const fs = require('fs');
const pump = require('mz-modules/pump');
const qiniu = require('qiniu');
const nanoid = require('nanoid');
class QiniuController extends BaseController {
  // 抓取第三方资源
  async fetchToQiniu() {
    let url = 'http://dlweb.sogoucdn.com/translate/pc/static/img/logo@1x.dd6a432c.png';
    // 第一步：获取配置
    const qiniuOptions = this.config.qiniu;
    const bucket = qiniuOptions.bucket;
    const accessKey = qiniuOptions.accessKey;
    const secretKey = qiniuOptions.secretKey;
    const zone = qiniuOptions.zone;
    const key = nanoid();
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

  // 写入流方式上传到七牛云存储
  async uploadToQiniu() {
    const qiniuOptions = this.config.qiniu;
    // 第一步：获取配置
    const bucket = qiniuOptions.bucket;
    const accessKey = qiniuOptions.accessKey;
    const secretKey = qiniuOptions.secretKey;
    const zone = qiniuOptions.zone;
    const key = nanoid();

    var options = {
      scope: bucket,
    };
    // 第二步：定义好鉴权对象mac
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // 第三步：设置写入策略
    const putPolicy = new qiniu.rs.PutPolicy(options);
    // 第四步：获取上传token
    const uploadToken = putPolicy.uploadToken(mac);
    // 第五步：设置服务空间
    const cfg = new qiniu.conf.Config();
    cfg.zone = qiniu.zone[zone];
    // 第六步：实例化表单上传
    const formUploader = new qiniu.form_up.FormUploader(cfg);
    // 第七步：实例化写入扩展
    const putExtra = new qiniu.form_up.PutExtra();

    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        return;
      }
      let res = await this.putStream(formUploader, uploadToken, key, stream, putExtra);
      // 返回资源
      files.push({
        file: this.config.qiniu.Domain + res.key,
      });
    }

    this.success('上传成功', files);
  }
  // 写入流
  async putStream(formUploader, uploadToken, key, target, putExtra) {
    return new Promise((resolve, reject) => {
      formUploader.putStream(uploadToken, key, target, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject(respBody);
        }
      });
    });
  }
}

module.exports = QiniuController;
