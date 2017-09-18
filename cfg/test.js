let cfg = {
  port: 7403,
  // test环境不要连线上db，以免自动测试误操作线上数据
  mongo: {
    host: ['192.168.1.4:27017']
  },
  redis: {
    host: '192.168.1.15',
    port: 6379,
    db: 1
  }
};

module.exports = cfg;
