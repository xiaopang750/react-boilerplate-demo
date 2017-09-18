import _ from 'lodash';
import cfg from '../cfg/cfg';
import Redis from '../shared/lib/redis';
import logger from '../shared/lib/logger';
import {getFromCacheOrRemote, httpGet} from '../shared/utils/utils';

let redisClient = Redis.getInstance(cfg.redis);
const GUID_NAME = 'wxguid';

let weixin = async(fnGetFromCacheOrRemote, redis, fetch, {saveRedisKeyName, fetchOptions = {}, cacheExpires, cleanCache}) => {
  let result = await fnGetFromCacheOrRemote(
    redis,
    saveRedisKeyName,
    async() => {
      let remoteInfo = await fetch(fetchOptions);
      remoteInfo = JSON.parse(remoteInfo.body);
      return remoteInfo;
    },
    cacheExpires,
    cleanCache);
  return result;
};

let {weixinInfo: {appid, secret}, apiHost: {thor: thorHost}} = cfg;
let weixinSdk = _.curry(weixin)(getFromCacheOrRemote, redisClient, httpGet);

let getOpenId = async({weixinAuthCode, cleanCache, cacheExpires, timeout}) => {
  let saveRedisKeyName = `wishing-userTokenInfo-${weixinAuthCode}`;
  let tokenInfo = await weixinSdk({
    saveRedisKeyName,
    fetchOptions: {
      url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      timeout,
      qs: {
        appid,
        secret,
        code: weixinAuthCode,
        grant_type: 'authorization_code'
      }
    },
    cleanCache,
    cacheExpires
  });
  let {openid} = tokenInfo;
  return openid;
};

let showIndex = async(ctx, code) => {
  let openId = ctx.cookies.get(GUID_NAME);
  logger.info(`get openId from cookie ${openId}`);
  if (!openId) {
    try {
      openId = await getOpenId({
        weixinAuthCode: code,
        cleanCache: true,
        cacheExpires: -1,
        timeout: 6000
      });
    } catch (e) {
      logger.error(`get openId from remote error: ${e.message}`);
    }
    if (!openId) {
      ctx.body = '请刷新页面重试';
      return;
    }
    ctx.cookies.set(GUID_NAME, openId, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    logger.info(`get openId from remote ${openId}`);
  }
  ctx.redirect('/');
};

let showDetail = async(ctx, code) => {
  let openId;
  try {
    openId = await getOpenId({
      weixinAuthCode: code,
      cleanCache: true,
      cacheExpires: -1,
      timeout: 6000
    });
  } catch (e) {
    logger.error(`get openId from remote error: ${e.message}`);
  }
  let result = await httpGet({
    url: `${thorHost}/api/wishing/personal/movieId`,
    qs: {
      mac: openId
    }
  });
  let res = JSON.parse(result.body);
  let movieId = res.movieId;
  ctx.redirect(`/detail/${movieId}`);
};

let weixinHandler = async(ctx) => {
  // code 微信授权接口每次给的code都是变化的
  let {query: {code, state}} = ctx;
  if (state === 'card') {
    await showIndex(ctx, code);
  } else if (state === 'detail') {
    await showDetail(ctx, code);
  } else {
    ctx.body = 'error';
  }
};

export {
  appid,
  secret,
  weixin,
  weixinSdk,
  getOpenId,
  weixinHandler
};
