'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.home.index);
  router.get('/admin/console', controller.admin.home.console);

  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.get('/admin/manager/del', controller.admin.manager.del);

  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/del', controller.admin.role.del);

  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/del', controller.admin.access.del);

  router.get('/admin/login', controller.admin.user.login);
  router.post('/admin/doLogin', controller.admin.user.doLogin);
  router.get('/admin/logout', controller.admin.user.logout);
  router.get('/verify', controller.admin.base.verify);// 验证码
};
