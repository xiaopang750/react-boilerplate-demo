import _ from 'lodash';
import cfg from '../cfg/cfg';

let {env} = cfg;

export default (ctx, data) => {
  let res = _.extend(data, {
    retCode: 200,
    msg: '查询成功',
    env
  });
  ctx.body = res;
};
