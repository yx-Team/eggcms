'use strict';

// had enabled by egg
// exports.static = true;
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.passport = {
  enable: true,
  package: 'egg-passport',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
// 跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

