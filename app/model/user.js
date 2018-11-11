
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime();
  const UserSchema = Schema({
    username: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    token: {// 邮件激活码
      type: String,
      default: '',
    },
    token_exptime: {// 激活码有效期
      type: Number,
      default: 0,
    },
    isactive: {// 激活状态(0:未激活，1：激活)
      type: Number,
      default: 0,
    },
    create_at: {
      type: Number,
      default: addTime,
    },
  });
  return mongoose.model('User', UserSchema, 'user');
};
