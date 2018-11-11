module.exports = app => {
  const { router, controller } = app;
  router.get('/api/zheye/cate', controller.api.zheye.cate);
  router.get('/api/zheye/list', controller.api.zheye.list);
  router.get('/api/user/login', controller.api.user.login);
  router.post('/api/user/doLogin', controller.api.user.doLogin);
  router.get('/api/user/reg', controller.api.user.reg);
  router.post('/api/user/doReg', controller.api.user.doReg);
  router.get('/api/user/info', controller.api.user.info);
};
