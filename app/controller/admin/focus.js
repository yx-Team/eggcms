'use strict';

const Controller = require('egg').Controller;

class FocusController extends Controller {
  async index() {
    this.ctx.body = 'list';
  }
  async add() {
    this.ctx.body = 'add';
  }
  async doAdd() {
    this.ctx.body = 'add';
  }
  async edit() {
    this.ctx.body = 'edit';
  }
  async doEdit() {
    this.ctx.body = 'edit';
  }
  async delete() {
    this.ctx.body = 'delete';
  }
}

module.exports = FocusController;
