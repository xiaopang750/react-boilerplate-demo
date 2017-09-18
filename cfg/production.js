let cfg = {
  mongo: {
    host: ['192.168.1.8:27017', '192.168.1.9:27017', '192.168.1.10:27017'],
  },
  redis: {
    host: '192.168.1.15',
    port: 6379,
    db: 0
  },
  apiHost: {
    thor: 'http://thor.prod.tvall.cn',
    video: 'http://video.browser.tvall.cn'
  }
};

module.exports = cfg;
