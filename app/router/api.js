module.exports = app => {
  const { router, controller } = app;
  router.get('/api/zheye/cate', controller.api.zheye.cate);
  router.get('/api/zheye/list', controller.api.zheye.list);
};
