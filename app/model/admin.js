module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
  const AdminSchema = Schema({
    username: { type: String, unique: true },
    password: { type: String },
    mobile: { type: String },
    email: { type: String },
    status: {
      type: Number,
      default: 1,
    },
    role_id: { type: String },
    add_time: {
      type: String,
      default: addTime,
    },
    is_super: {
      type: Number,
      default: 0,
    },
  });
  return mongoose.model('Admin', AdminSchema, 'admin');
};
