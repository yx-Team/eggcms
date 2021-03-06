/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */
'use strict';

layui.define([ 'table', 'form' ], function(exports) {
  let $ = layui.$,
    table = layui.table,
    form = layui.form;

  // 用户管理
  table.render({
    elem: '#LAY-user-manage',
    url: layui.setter.base + 'json/useradmin/webuser.js', // 模拟接口
    cols: [[
      { type: 'checkbox', fixed: 'left' },
      { field: 'id', width: 100, title: 'ID', sort: true },
      { field: 'username', title: '用户名', minWidth: 100 },
      { field: 'avatar', title: '头像', width: 100, templet: '#imgTpl' },
      { field: 'phone', title: '手机' },
      { field: 'email', title: '邮箱' },
      { field: 'sex', width: 80, title: '性别' },
      { field: 'ip', title: 'IP' },
      { field: 'jointime', title: '加入时间', sort: true },
      { title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-webuser' },
    ]],
    page: true,
    limit: 30,
    height: 'full-220',
    text: '对不起，加载出现异常！',
  });

  // 监听工具条
  table.on('tool(LAY-user-manage)', function(obj) {
    const data = obj.data;
    if (obj.event === 'del') {
      layer.prompt({
        formType: 1,
        title: '敏感操作，请验证口令',
      }, function(value, index) {
        layer.close(index);

        layer.confirm('真的删除行么', function(index) {
          obj.del();
          layer.close(index);
        });
      });
    } else if (obj.event === 'edit') {
      const tr = $(obj.tr);

      layer.open({
        type: 2,
        title: '编辑用户',
        content: '../../../views/user/user/userform.html',
        maxmin: true,
        area: [ '500px', '450px' ],
        btn: [ '确定', '取消' ],
        yes(index, layero) {
          let iframeWindow = window['layui-layer-iframe' + index],
            submitID = 'LAY-user-front-submit',
            submit = layero.find('iframe').contents().find('#' + submitID);

          // 监听提交
          iframeWindow.layui.form.on('submit(' + submitID + ')', function(data) {
            const field = data.field; // 获取提交的字段

            // 提交 Ajax 成功后，静态更新表格中的数据
            // $.ajax({});
            table.reload('LAY-user-front-submit'); // 数据刷新
            layer.close(index); // 关闭弹层
          });

          submit.trigger('click');
        },
        success(layero, index) {

        },
      });
    }
  });

  // 管理员管理
  table.render({
    elem: '#LAY-user-back-manage',
    url: '/admin/manager/list?model=Admin', // 分页接口
    cols: [[
      { type: 'checkbox', fixed: 'left' },
      { field: '_id', width: 220, title: 'ID', sort: true },
      { field: 'username', title: '登录名' },
      { field: 'mobile', title: '手机' },
      { field: 'email', title: '邮箱' },
      { field: 'role', title: '角色', templet: '#roleTpl' },
      { field: 'add_time', title: '加入时间', sort: true },
      { field: 'status', title: '审核状态', templet: '#buttonTpl', minWidth: 80, align: 'center' },
      { title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin' },
    ]],
    text: '对不起，加载出现异常！',
  });

  // 监听工具条
  table.on('tool(LAY-user-back-manage)', function(obj) {
    const data = obj.data;
    if (obj.event === 'del') {
      layer.prompt({
        formType: 1,
        title: '敏感操作，请验证口令',
      }, function(value, index) {
        layer.close(index);
        layer.confirm('确定删除此管理员？', function(index) {
          $.ajax({
            url: '/admin/base/delete?model=Admin&id=' + data._id,
            success(res) {
              if (res.success) {
                obj.del();
                layer.close(index);
              }
            },
          });

        });
      });
    } else if (obj.event === 'edit') {
      const tr = $(obj.tr);
      layer.open({
        type: 2,
        title: '编辑管理员',
        content: '/admin/manager/edit?id=' + data._id,
        area: [ '420px', '470px' ],
        btn: [ '确定', '取消' ],
        yes(index, layero) {
          let iframeWindow = window['layui-layer-iframe' + index],
            submitID = 'LAY-manager-edit-back-submit',
            submit = layero.find('iframe').contents().find('#' + submitID);

          // 监听提交
          iframeWindow.layui.form.on('submit(' + submitID + ')', function(data) {
            const field = data.field; // 获取提交的字段

            // 提交 Ajax 成功后，静态更新表格中的数据
            $.ajax({
              url: '/admin/manager/doEdit',
              method: 'POST',
              data: field,
              success(res) {
                console.log(res);
                table.reload('LAY-user-back-manage'); // 数据刷新
                layer.close(index); // 关闭弹层
              },
            });

          });

          submit.trigger('click');
        },
        success(layero, index) {

        },
      });
    }
  });

  // 角色管理
  table.render({
    elem: '#LAY-user-back-role',
    url: '/admin/base/page?model=Role', // 分页接口
    cols: [[
      { type: 'checkbox', fixed: 'left' },
      { field: '_id', width: 220, title: 'ID', sort: true },
      { field: 'title', title: '角色名' },
      { field: 'description', title: '具体描述' },
      { title: '操作', width: 220, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin' },
    ]],
    text: '对不起，加载出现异常！',
    page: true,
  });

  // 监听工具条
  table.on('tool(LAY-user-back-role)', function(obj) {
    const data = obj.data;

    if (obj.event === 'del') {
      if (data.title === '超级管理员') {
        return layer.msg('超级管理员不能删除');
      }
      layer.confirm('确定删除此角色？', function(index) {
        $.ajax({
          url: '/admin/base/delete?model=Role&id=' + data._id,
          success(res) {
            if (res.success) {
              obj.del();
              layer.close(index);
            }
          },
        });


      });
    } else if (obj.event === 'edit') {
      const tr = $(obj.tr);

      layer.open({
        type: 2,
        title: '编辑角色',
        content: '/admin/role/edit?id=' + data._id,
        area: [ '500px', '480px' ],
        btn: [ '确定', '取消' ],
        yes(index, layero) {
          let iframeWindow = window['layui-layer-iframe' + index],
            submit = layero.find('iframe').contents().find('#LAY-user-role-submit');

          // 监听提交
          iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function(data) {
            const field = data.field; // 获取提交的字段

            // 提交 Ajax 成功后，静态更新表格中的数据
            $.ajax({
              url: '/admin/role/doEdit',
              method: 'POST',
              data: field,
              success(res) {
                table.reload('LAY-user-back-role'); // 数据刷新
                layer.close(index); // 关闭弹层
              },
            });

          });

          submit.trigger('click');
        },
        success(layero, index) {

        },
      });
    } else if (obj.event === 'auth') {
      if (data.title === '超级管理员') {
        return layer.msg('超级管理员不用进行授权');
      }
      window.location.href = '/admin/role/auth?id=' + data._id;
    }
  });

  exports('useradmin', {});
});
