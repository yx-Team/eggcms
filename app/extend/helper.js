const dayjs = require('dayjs');
const path = require('path');
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
  /**
   * 获取文件大小
   * @param {*} size
   */
  getFileSize(size) {
    let unit = [ 'B', 'KB', 'M', 'G' ];
    let fileSize = size;
    let num = 0;
    while (fileSize > 1024) {
      fileSize /= 1024;
      num++;
    }
    if (num === 0) {
      return fileSize + unit[num];
    }
    return fileSize.toFixed(2) + unit[num];
  },
  /**
   * 根据文件名 获取文件图标
   * @param {*} filename
   */
  getFileIcon(filename) {
    let ext = path.extname(filename);
    let icon = '';
    let fileIcon = [ 'AI', 'BT', 'CODE', 'EXCEL', 'EXE', 'FOLDER', 'FONTS', 'MISC', 'MMAP', 'MUSIC', 'PDF', 'PPT', 'PS', 'TEXT', 'VIDEO', 'HTML', 'WORD', 'XMIND', 'ZIP' ];
    if (ext) {
      ext = ext.toLocaleUpperCase().split('.')[1];
    } else {
      ext = 'MISC';
    }
    if (fileIcon.indexOf(ext) > -1) {
      return `${ext}.png`;
    }
    return 'MISC.png';
  },

};
