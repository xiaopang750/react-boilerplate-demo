import Crud from '../shared/lib/crud';
import cfg from '../cfg/cfg';

let recConf = cfg.recommend.mongo;
let videoConf = cfg.mongo;

let YundanDB;
let WishingDb;
let initPromise;
let inited = false;

let dbInit = () => {
  if (inited) {
    return initPromise;
  } else {
    initPromise = (async () => {
      [YundanDB, WishingDb] = await Promise.all([
        Crud.get({
          host: videoConf.host,
          db: 'piandan'
        }),
        Crud.get({
          host: recConf.host,
          db: 'admin',
          replicaSet: recConf.replicaSet
        }),
      ]);
      await WishingDb.changeDB('wishing');
    })();
    inited = true;
    return initPromise;
  }
};

export {
  dbInit,
  YundanDB,
  WishingDb,
};
