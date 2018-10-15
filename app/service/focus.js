'use strict';

const Service = require('egg').Service;

class FocusService extends Service {
  async find(arg) {
    const { page, limit } = arg;
    let skip = Number(limit) * (Number(page) - 1);
    const result = await this.ctx.model.Focus.find({}).limit(Number(limit)).skip(skip)
      .sort({ sort: 1 });
    return result;
  }

  async count() {
    const result = await this.ctx.model.Focus.find({});
    return result.length;
  }
  async update(body) {
    console.log(body);
    return await this.ctx.model.Focus.findOneAndUpdate({ _id: body._id }, body);
  }
  async delete(_id) {
    return await this.ctx.model.Focus.findOneAndDelete({ _id });
  }
}

module.exports = FocusService;
