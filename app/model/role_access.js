module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoleAccessModel = Schema({
    role_id: {
      type: Schema.Types.ObjectId,
    },
    access_id: {
      type: Schema.Types.ObjectId,
    },
  });
  return mongoose.model('RoleAccess', RoleAccessModel, 'role_access');
};
