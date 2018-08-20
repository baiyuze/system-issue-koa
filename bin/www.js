const Koa = require('koa');
const app = new Koa();
const log4js = require('log4js');
const dayjs = require('dayjs');
const router = require('../app/router');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `log/cheese-${dayjs().format('YYYY-MM-DD')}.log` } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

class Context {
  constructor() {
    this.initContext();
  }
  /**
   * 绑定context到当前this
   * 
   * @param {this} ctx 上下文 
   */
  initContext() {

    app.use(async (ctx) => {
      await router(ctx);
    });

    this.logger = log4js.getLogger('cheese');

    app.use(log4js.connectLogger(this.logger, {level:log4js.levels.INFO}))
    
    app.listen(7001);

  }

}

new Context();