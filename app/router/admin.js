'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.home.index);
  router.get('/admin/console', controller.admin.home.console);

  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/list', controller.admin.manager.list);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);
  router.get('/admin/manager/del', controller.admin.manager.del);

  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/auth', controller.admin.role.auth);

  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.post('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/icon', controller.admin.access.icon);

  router.get('/admin/login', controller.admin.user.login);
  router.post('/admin/login', controller.admin.user.login);
  router.get('/admin/logout', controller.admin.user.logout);
  // base
  router.get('/verify', controller.admin.base.verify);// 验证码
  router.get('/admin/base/delete', controller.admin.base.delete);// 删除数据
  router.get('/admin/base/deleteMany', controller.admin.base.deleteMany);// 批量删除
  router.get('/admin/base/page', controller.admin.base.page);// 分页
};
