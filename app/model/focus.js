module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
  const FocusSchema = Schema({
    title: {
      type: String,
      require: true,
    },
    type: {
      type: Number,
      default: 1, // 1-pc  2-移动端
      require: true,

    },
    focus_img: {
      type: String,
      require: true,
    },
    link: {
      type: String,
    },
    sort: {
      type: Number,
      require: true,
      default: 100,
    },
    status: {
      type: Number,
      require: true,
      default: 1, // 1-启用  0-禁用
    },
    add_time: {
      type: String,
      default: addTime,
    },
  });
  return mongoose.model('Focus', FocusSchema, 'focus');
};
