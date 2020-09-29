const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index', { nihao: 123 });
  }
}

module.exports = HomeController;
