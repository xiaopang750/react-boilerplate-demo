let _ = require('lodash');

let env = process.env.NODE_ENV || 'local';
let orgEnv = process.env.ORG_NODE_ENV;
if (!_.includes(['production', 'smoke', 'staging', 'local', 'test'], env)) {
  env = 'local';
}

console.log(`env ${env}`);

let staticPort = 9000;
let cfg = {
  port: 5555,
  staticPort,
  env,
  orgEnv,
  metrics: {
    host: '192.168.1.26'
  },
  staticMaxage: 3600 * 24 * 30 * 1000,
  staticPath: env !== 'local' ? 'http://cdn.cn/' : `http://localhost:${staticPort}/`
};

let overrideConfig = require(`./${env}`);
_.extend(cfg, overrideConfig);

module.exports = cfg;
