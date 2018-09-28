/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */
'use strict';
layui.define(function(exports) {
  let $ = layui.$,
    layer = layui.layer,
    laytpl = layui.laytpl,
    setter = layui.setter,
    view = layui.view,
    admin = layui.admin;

  // 公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  // ……


  // 退出
  admin.events.logout = function() {
    // 执行退出接口
    $.ajax({
      url: '/admin/logout',
      type: 'get',
      success(res) {
        if (res.success) {
          location.href = '/admin/login';
        }

      },
    });
  };


  // 对外暴露的接口
  exports('common', {});
});
