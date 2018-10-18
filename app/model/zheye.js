module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
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
    },
    add_time: {
      type: String,
      default: addTime,
    },
  });
  return mongoose.model('Zheye', ZheyeSchema, 'zheye');
};
