let _ = require('lodash');

let env = process.env.NODE_ENV || 'local';
let orgEnv = process.env.ORG_NODE_ENV;
if (!_.includes(['production', 'smoke', 'staging', 'local', 'test'], env)) {
  env = 'local';
}

console.log(`env ${env}`);

let cfg = {
  port: 5555,
  env,
  orgEnv,
  metrics: {
    host: '192.168.1.26'
  },
  recommend: {
    mongo: {
      host: ['qiguo_root:qiGuo3434@192.168.1.39:27017', '192.168.1.40:27017'],
      replicaSet: 'foba',
      defaultGroup: 'a'
    }
  },
  weixinInfo: {
    appid: 'wx8fe3e3dab38d483d',
    secret: '266190d5092c773f17283ebf6d882838'
  },
  staticMaxage: 3600 * 24 * 30 * 1000,
  staticPath: env !== 'local' ? 'http://newcdn.tvall.cn/wishing/' : '/'
};

let overrideConfig = require(`./${env}`);
_.extend(cfg, overrideConfig);

module.exports = cfg;
