'use strict';

const Service = require('egg').Service;

class Zheye_cateService extends Service {
  async create(data) {

    try {
      await this.ctx.model.ZheyeCate.create(...data);
      return true;
    } catch (error) {

      return false;
    }

  }
}

module.exports = Zheye_cateService;
