import {readFileSync} from 'fs';
import response from './lib/response';
import controllers from './controllers';
import cfg from './cfg/cfg';

const {env, apiHost, staticPath} = cfg;

try {
  let staticHashMapStr = readFileSync(`${__dirname}/webpack-assets.json`, 'utf8');
  global.staticHashMap = JSON.parse(staticHashMapStr);
} catch (e) {
  global.staticHashMap = {};
}
const COMMON_DATA = {pageInfo: {env, apiHost, staticPath}, staticHashMap: global.staticHashMap};

export default (router) => {
  // health check
  router.get('/health', async (ctx) => {
    ctx.body = 'OK';
  });

  // page
  router.get('/', async (ctx) => {
    ctx.render('index', COMMON_DATA);
  });

  router.get('/:dashbord', async (ctx) => {
    ctx.render('index', COMMON_DATA);
  });

  // api
  router.get('/api/:apiName', async (ctx) => {
    let {apiName} = ctx.params;
    let query = ctx.query;
    let data = controllers(apiName, query);
    response(ctx, data);
  });
};
