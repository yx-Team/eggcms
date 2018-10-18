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
    // 爬取内容
    let result = await this.ctx.curl(url);

    const $ = cheerio.load(result.data.toString());
    // 爬取规则
    let cate = [];
    $('.ul-tags').find('li').each(function(item) {
      cate.push({
        title: $(this).text(),
        url: path.join(url, $(this).find('a').attr('href')),
      });
    });
    console.log(cate);
    const add = await this.ctx.service.zheyeCate.create(cate);
    if (add) {
      this.ctx.body = 'success';
    }

  }
}

module.exports = CrawlerController;
