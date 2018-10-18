'use strict';

const Service = require('egg').Service;

class ZheyeService extends Service {
  async create(data) {
    try {
      await this.ctx.model.Zheye.create(...data);
      return true;
    } catch (error) {
      return false;
    }

  }
}

module.exports = ZheyeService;
