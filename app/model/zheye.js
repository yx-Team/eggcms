module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime();
  const ZheyeSchema = Schema({
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    thumb: {
      type: String,
    },
    link: {
      type: String,
    },
    sort: {
      type: Number,
      default: 100,
    },
    cate_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ZheyeCate',
    },
    status: {
      type: Number,
      default: 1,
    },
    is_position: {
      type: Number,
      default: 0,
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
  return mongoose.model('Zheye', ZheyeSchema, 'zheye');
};
