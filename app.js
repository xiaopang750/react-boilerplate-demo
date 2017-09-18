import Koa from 'koa';
import logger from 'log4js';
import Router from 'koa-router';
import staticServe from 'koa-static';
import bodyparser from 'koa-bodyparser';
import Pug from 'koa-pug';
import cfg from './cfg/cfg';
import routes from './routes';

// webpack static dev server
const app = new Koa();
const {env, staticPort} = cfg;
console.log(env);
if (env === 'local') {
  const app2 = new Koa();
  const webpack = require('webpack');

  const webpackConfig = require(`./webpack/${env}.js`);
  const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware');

  let {output: {publicPath}} = webpackConfig;
  const compiler = webpack(webpackConfig);
  app2.use(devMiddleware(compiler, {noInfo: true, publicPath, headers: {'Access-Control-Allow-Origin': '*'}}));
  app.use(hotMiddleware(compiler, {}));
  app2.listen(staticPort);
}

const router = new Router();
routes(router);

app.on('error', (err, ctx) => {
  logger.error(err);
});

let pug = new Pug({
  viewPath: `${__dirname}/views`,
  noCache: true
});
pug.use(app);

let server = app
  .use(staticServe(`${__dirname}/build`))
  .use(bodyparser())
  .use(router.routes())
  .listen(cfg.port);

export default server;
