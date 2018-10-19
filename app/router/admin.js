'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.home.index);
  router.get('/admin/console', controller.admin.home.console);
  // 管理员
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/list', controller.admin.manager.list);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);
  router.get('/admin/manager/del', controller.admin.manager.del);
  // 角色
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/auth', controller.admin.role.auth);
  // 权限
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.post('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/icon', controller.admin.access.icon);
  // 登录
  router.get('/admin/login', controller.admin.user.login);
  router.post('/admin/login', controller.admin.user.login);
  router.get('/admin/logout', controller.admin.user.logout);

  // 轮播图
  router.get('/admin/focus', controller.admin.focus.index);
  router.get('/admin/focus/page', controller.admin.focus.page);
  router.get('/admin/focus/add', controller.admin.focus.add);
  router.post('/admin/focus/doAdd', controller.admin.focus.doAdd);
  router.get('/admin/focus/edit', controller.admin.focus.edit);
  router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);
  router.get('/admin/focus/delete', controller.admin.focus.delete);
  router.post('/admin/focus/upload', controller.admin.focus.upload);
  // 文件管理
  router.get('/admin/file', controller.admin.filemanage.index);
  router.get('/admin/file/list', controller.admin.filemanage.list);
  router.get('/admin/file/edit', controller.admin.filemanage.edit);
  router.post('/admin/file/doEdit', controller.admin.filemanage.doEdit);
  router.post('/admin/file/delete', controller.admin.filemanage.delete);
  router.post('/admin/file/rename', controller.admin.filemanage.rename);
  router.post('/admin/file/create', controller.admin.filemanage.create);
  router.get('/admin/file/download', controller.admin.filemanage.download);
  // 折页
  router.get('/admin/zheye', controller.admin.zheye.index);
  router.get('/admin/zheye/page', controller.admin.zheye.page);
  router.get('/admin/zheye/add', controller.admin.zheye.add);
  router.post('/admin/zheye/doAdd', controller.admin.zheye.doAdd);
  router.get('/admin/zheye/edit', controller.admin.zheye.edit);
  router.post('/admin/zheye/doEdit', controller.admin.zheye.doEdit);
  router.get('/admin/zheye/delete', controller.admin.zheye.delete);
  router.post('/admin/zheye/upload', controller.admin.zheye.upload);
  // 爬虫
  router.get('/admin/crawler', controller.admin.crawler.index);
  router.get('/admin/crawler/getCate', controller.admin.crawler.getCate);
  router.get('/admin/crawler/getCon', controller.admin.crawler.getCon);
  // base
  router.get('/verify', controller.admin.base.verify);// 验证码
  router.get('/admin/base/delete', controller.admin.base.delete);// 删除数据
  router.get('/admin/base/deleteMany', controller.admin.base.deleteMany);// 批量删除
  router.get('/admin/base/page', controller.admin.base.page);// 分页

};
