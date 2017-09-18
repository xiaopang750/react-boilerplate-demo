import fetch from '../../action';
import {FETCH_PREFIX, ADD_ACTION, REMOVE_ACTION} from './constants';

const getData = (opts = {}) => {
  return (dispatch) => {
    opts.keyName = FETCH_PREFIX;
    fetch(dispatch, opts);
  };
};

const addResource = ({agentId, name}) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ACTION,
      payload: {
        agentId,
        name
      }
    });
  };
};

const delResource = ({agentId, resourcId}) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ACTION,
      payload: {
        agentId,
        resourcId
      }
    });
  };
};

export {
  getData,
  addResource,
  delResource
};
