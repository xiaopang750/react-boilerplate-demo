import Koa from 'koa';
import Router from 'koa-router';
import staticServe from 'koa-static';
import bodyparser from 'koa-bodyparser';
import Pug from 'koa-pug';
import {readFileSync} from 'fs';
// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
// import {CronJob} from 'cron';
import cfg from './cfg/cfg';
import {weixinHandler} from './controllers/weixin';
import logId from './shared/middlewares/logId';
import logger from './shared/lib/logger';
// import {httpGet} from './shared/utils/utils';
// import {dbInit} from './lib/mongo';

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8fe3e3dab38d483d&redirect_uri=http%3A%2F%2Fwishing.staging.tvall.cn%2Fweixin&response_type=code&scope=snsapi_base&state=card#wechat_redirect

const {env, apiHost, staticPath} = cfg;
const app = new Koa();
const router = new Router();
try {
  let staticHashMapStr = readFileSync(`${__dirname}/webpack-assets.json`, 'utf8');
  global.staticHashMap = JSON.parse(staticHashMapStr);
} catch (e) {
  global.staticHashMap = {};
}
const COMMON_DATA = {pageInfo: {env, apiHost, staticPath}, staticHashMap: global.staticHashMap};

router.get('/health', async (ctx) => {
  ctx.body = 'OK';
});

router.get('/weixin', async (ctx) => {
  await weixinHandler(ctx);
});

router.get('/', async (ctx) => {
  ctx.render('index', COMMON_DATA);
});

router.get('/detail/:id', async (ctx) => {
  ctx.render('index', COMMON_DATA);
});

app.on('error', (err, ctx) => {
  logger.error(err);
});

// dbInit().then(() => {
//   asyncToRecDb();
//   console.log('DB init success');
//   app
//     .use(logId)
//     .use(bodyparser())
//     .use(router.routes())
//     .listen(cfg.port);
// });

let pug = new Pug({
  viewPath: `${__dirname}/views`,
  noCache: true
});
pug.use(app);

if (cfg.env === 'local') {
  const webpack = require('webpack');

  const webpackConfig = require(`./webpack/${cfg.env}.js`);
  const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware');

  const compiler = webpack(webpackConfig);
  app.use(devMiddleware(compiler, {noInfo: true, publicPath: '/'}));
  app.use(hotMiddleware(compiler, {}));
}

app
  .use(logId)
  .use(staticServe(`${__dirname}/build`))
  .use(bodyparser())
  .use(router.routes())
  .listen(cfg.port);
