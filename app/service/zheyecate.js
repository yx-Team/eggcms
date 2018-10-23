'use strict';

const Service = require('egg').Service;

class ZheyecateService extends Service {
  async create(data) {

    try {
      await this.ctx.model.ZheyeCate.create(...data);
      return true;
    } catch (error) {

      return false;
    }

  }
  async find() {
    try {
      const result = await this.ctx.model.ZheyeCate.find({});
      return result;
    } catch (error) {
      return false;
    }

  }
  async findAll(arg) {
    const { page, limit } = arg;
    let skip = Number(limit) * (Number(page) - 1);
    const result = await this.ctx.model.ZheyeCate.find({}).limit(Number(limit)).skip(skip)
      .sort({ sort: 1 });

    return result;
  }
  async count() {
    const result = await this.ctx.model.ZheyeCate.find({});
    return result.length;
  }
  async update(body) {
    return await this.ctx.model.ZheyeCate.findOneAndUpdate({ _id: body._id }, body);
  }
  async delete(_id) {
    return await this.ctx.model.ZheyeCate.findOneAndDelete({ _id });
  }
}

module.exports = ZheyecateService;
