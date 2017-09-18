import {FETCH_PREFIX} from './constants';
import FETCH_FLOW from '../../constants';
let {ING, SUC, FAIL} = FETCH_FLOW;

const initState = {};
const Tab = (state = initState, action) => {
  let result;
  let {status = {}} = action;
  let {payload = {}, err} = action;
  switch (action.type) {
    case `${FETCH_PREFIX}_${ING}`:
      result = {
        ...state,
        ...status
      };
      break;
    case `${FETCH_PREFIX}_${SUC}`:
      result = {
        ...state,
        ...payload,
        ...status
      };
      break;
    case `${FETCH_PREFIX}_${FAIL}`:
      result = {
        ...state,
        ...status,
        err
      };
      break;
    default:
      return state;
  }
  return result;
};

export default Tab;
