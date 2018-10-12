module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const addTime = new Date().getTime().toString();
  const AccessSchema = Schema({
    name: {// 显示名称
      type: String,
    },
    action_name: {// 节点名称
      type: String,
    },
    type: {// 权限类型   1模块  2菜单  3操作
      type: Number,
      default: 1,
    },
    icon: {
      type: String,
    },
    url: {// 地址
      type: String,
    },
    status: {// 状态
      type: Boolean,
      default: true,
    },
    module_id: {// 0 顶级模块，ObjectId()其他模块
      type: Schema.Types.Mixed, // 混合类型
    },
    sort: {// 排序
      type: Number,
      default: 100,
    },
    description: {// 描述
      type: String,
    },
    add_time: {// 添加时间
      type: String,
      default: addTime,
    },
  });
  return mongoose.model('Access', AccessSchema, 'access');
};

