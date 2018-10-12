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
  // 方式1：无限分类——平铺
  getCate($data, $pid = '0', $level = 0) {
    let arr = [];
    $data.forEach(item => {
      // 如果是对象转为字符串
      item.module_id = typeof item.module_id === 'object' ? item.module_id.toString() : item.module_id;
      $pid = typeof $pid === 'object' ? $pid.toString() : $pid;
      //
      if (item.module_id === $pid) {
        item.level = $level;
        item.prefix = '───'.repeat($level);
        arr.push(item);
        let arr_child = this.getCate($data, item._id, $level + 1);
        arr = arr.concat(arr_child);
      }
    });

    return arr;
  },
  // 方式2：无限分类——嵌套
  getCate2($data, $pid = '0') {
    let arr = [];
    $data.forEach(item => {
      // 如果是对象转为字符串
      item.module_id = typeof item.module_id === 'object' ? item.module_id.toString() : item.module_id;
      $pid = typeof $pid === 'object' ? $pid.toString() : $pid;
      //
      if (item.module_id === $pid) {
        let arr_child = this.getCate2($data, item._id);
        item.items = arr_child;
        arr.push(item);
      }
    });
    return arr;
  },
};
