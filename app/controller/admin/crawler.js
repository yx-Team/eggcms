'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const path = require('path');
const fse = require('fs-extra');
class CrawlerController extends Controller {
  async index() {
    //   网址
    // let url = 'http://www.niudana.com/';
    // // 爬取内容
    // let result = await this.ctx.curl(url);

    // const $ = cheerio.load(result.data.toString());
    // // 爬取规则
    // let cate = [];
    // $('.ul-tags').find('li').each(function(item) {
    //   cate.push({
    //     title: $(this).text(),
    //     url: path.join(url, $(this).find('a').attr('href')),
    //   });
    // });
    const imgURL = 'http://www.niudana.com/uploadfile/201611/25/1945144657.jpg';
    const resultUrl = await this.ctx.service.crawler.download(imgURL);
    // console.log(resultUrl);
  }

  async getCate() {
    // 网址;
    let url = 'http://www.niudana.com/';
    // 爬取网页内容
    let result = await this.ctx.curl(url);
    // cheerio
    const $ = cheerio.load(result.data.toString());
    // 爬取规则
    let cate = [];
    $('.ul-tags').find('li').each(function(index) {
      cate.push({
        title: $(this).text(),
        url: path.join(url, $(this).find('a').attr('href')),
      });
    });
    const add = await this.ctx.service.zheyeCate.create(cate);
    if (add) {
      this.ctx.body = 'success';
    }
  }
  async getCon() {
    let that = this;
    // 网址;
    let url = 'http://www.niudana.com';
    // 爬取网页内容
    let result = await this.ctx.curl(url);
    // cheerio
    const $ = cheerio.load(result.data.toString());
    // 爬取规则
    let cate = [];
    let con = [];
    let titleReg = new RegExp('<b>(.*?)<\/b>');
    let iconReg = new RegExp("\'(.*?)\'");

    let zheyeCate = await this.ctx.service.zheyecate.find({});
    // console.log(zheyeCate);

    $('.item-grid').each(function(index) {
      if (index > 0) {
        cate.push($(this).find('h3').text());
        con.push([]);

        $(this).find('li').each(function() {

          let info = $(this).find('.Link').attr('title');
          // 标题
          let title = info.match(titleReg)[1];
          // 描述
          let desc = info.split('<br>')[1];
          // 缩略图
          let thumb = $(this).find('i').attr('style') || '';
          if (thumb) {
            thumb = url + thumb.match(iconReg)[1];
          } else {
            thumb = url + '/images/Icon-No-Link.png';
          }

          let cate_id = that.app.mongoose.Types.ObjectId(zheyeCate[index - 1]._id);
          // 链接
          let link = $(this).find('.goto').attr('href')
            .split('/goto/?url=')[1];

          con[index - 1].push({ title, desc, thumb, link, cate_id });

        });

      }
    });
    let thumb = [];
    let createCon = [];
    // con.forEach((item, index) => {
    //   item.forEach(async element => {
    //     await that.sleep(3);
    //     thumb[index] = await this.ctx.service.crawler.download(element.thumb);
    //     console.log(thumb[index]);
    //   });
    // });
    let resultCon = await this.webcon(con);

    this.ctx.body = '爬取成功';
    // con.forEach((item, index) => {
    //   createCon[index] = this.ctx.service.zheye.create(con[index]);
    // });
    // 执行所有操作
    // Promise.all(createCon).then(() => {
    //   this.ctx.body = '爬取成功';
    // });
    // await this.ctx.service.zheye.create(con[0]);
    // await this.ctx.service.zheye.create(con[1]);
    // await this.ctx.service.zheye.create(con[2]);
    // await this.ctx.service.zheye.create(con[3]);
    // await this.ctx.service.zheye.create(con[4]);
    // await this.ctx.service.zheye.create(con[5]);
    // await this.ctx.service.zheye.create(con[6]);
    // await this.ctx.service.zheye.create(con[7]);
    // await this.ctx.service.zheye.create(con[8]);
    // await this.ctx.service.zheye.create(con[9]);
    // await this.ctx.service.zheye.create(con[10]);
    // await this.ctx.service.zheye.create(con[11]);
    // await this.ctx.service.zheye.create(con[12]);
    // await this.ctx.service.zheye.create(con[13]);
    // await this.ctx.service.zheye.create(con[14]);
    // await this.ctx.service.zheye.create(con[15]);
    // await this.ctx.service.zheye.create(con[16]);


  }
  async webcon(con) {
    let that = this;
    let conx = con;
    await conx.forEach(async function(item, index) {
      await that.sleep(index);
      item.forEach(async function(element, eindex) {
        await that.sleep(eindex);
        let img = await that.ctx.service.crawler.download(element.thumb);
        element.thumb = img;
      });
      console.log(item);
      // await this.ctx.service.zheye.create(con[index]);

    });
    return '成功';
  }
  async sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time * 1000);

    });

  }
}

module.exports = CrawlerController;
