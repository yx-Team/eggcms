module.exports = app => {
  const { router, controller } = app;
  router.get('/api/zheye/cate', controller.api.zheye.cate);
  router.get('/api/zheye/list', controller.api.zheye.list);
  router.get('/api/user/login', controller.api.user.login);
  router.get('/api/user/doLogin', controller.api.user.doLogin);
  router.get('/api/user/authCallback', controller.api.user.authCallback);
  router.post('/api/user/login', app.passport.authenticate('local', { successRedirect: '/api/user/authCallback' }));
  router.post('/api/user/reg', controller.api.user.reg);
};
