import fetch from '../../action';
import {FETCH_PREFIX} from './constants';

const getData = (opts = {}) => {
  return (dispatch) => {
    opts.keyName = FETCH_PREFIX;
    fetch(dispatch, opts);
  };
};

export default getData;
