const dayjs = require('dayjs');
module.exports = {
  timeFormat(params) {
    return dayjs(Number(params)).format('YYYY-MM-DD hh:mm:ss');
  },
  typeFormat(params) {
    let type = '';
    switch (params) {
      case 1:
        type = '模块';
        break;
      case 2:
        type = '菜单';
        break;
      case 3:
        type = '操作';
        break;
      default:
        type = '模块';
        break;
    }

    return type;
  },

};
