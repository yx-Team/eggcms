module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime();
  const ZheyeCateSchema = Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    sort: {
      type: Number,
      default: 100,
    },
    desc: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    create_at: {
      type: Number,
      default: addTime,
    },
    update_at: {
      type: Number,
      default: addTime,
    },
  });
  return mongoose.model('ZheyeCate', ZheyeCateSchema, 'zheye_cate');
};

