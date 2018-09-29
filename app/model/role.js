module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
  const RoleSchema = Schema({
    title: { type: String, unique: true },
    description: { type: String },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: String,
      default: addTime,
    },
  });
  return mongoose.model('Role', RoleSchema, 'role');
};
