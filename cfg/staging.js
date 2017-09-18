let cfg = {
  mongo: {
    host: ['192.168.1.4:27017'],
  },
  redis: {
    host: '192.168.1.15',
    port: 6379,
    // 0为prod, 1为staging
    db: 1
  },
  apiHost: {
    thor: 'http://thor.staging.tvall.cn',
    video: 'http://video.browser.staging.tvall.cn'
  }
};

module.exports = cfg;
