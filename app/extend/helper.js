const dayjs = require('dayjs');
module.exports = {
  timeFormat(params) {
    return dayjs(Number(params)).format('YYYY-MM-DD hh:mm:ss');
  },
};
