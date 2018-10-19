'use strict';

const Service = require('egg').Service;

class ZheyeService extends Service {
  async create(data) {
    try {
      await this.ctx.model.Zheye.create(...data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

  }
  async find(arg) {
    const { page, limit } = arg;
    let skip = Number(limit) * (Number(page) - 1);
    const result = await this.ctx.model.Zheye.find({}).limit(Number(limit)).skip(skip)
      .sort({ sort: 1 })
      .populate('cate_id')
      .exec();
    // const result = await this.ctx.model.Zheye.aggregate([
    //   {
    //     $lookup: {
    //       from: 'zheye_cate',
    //       localField: 'cate_id',
    //       foreignField: '_id',
    //       as: 'cate',
    //     },
    //   },
    //   {
    //     $limit: Number(limit),
    //   },
    //   {
    //     $skip: skip,
    //   },
    // ]);

    return result;
  }

  async count() {
    const result = await this.ctx.model.Zheye.find({});
    return result.length;
  }
  async update(body) {
    return await this.ctx.model.Zheye.findOneAndUpdate({ _id: body._id }, body);
  }
  async delete(_id) {
    return await this.ctx.model.Zheye.findOneAndDelete({ _id });
  }
}

module.exports = ZheyeService;
