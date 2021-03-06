module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
  const FocusSchema = Schema({
    title: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      default: 1, // 1-pc  2-移动端
      required: true,

    },
    focus_img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    sort: {
      type: Number,
      required: true,
      default: 100,
    },
    status: {
      type: Number,
      required: true,
      default: 1, // 1-启用  0-禁用
    },
    add_time: {
      type: String,
      default: addTime,
    },
  });
  return mongoose.model('Focus', FocusSchema, 'focus');
};
