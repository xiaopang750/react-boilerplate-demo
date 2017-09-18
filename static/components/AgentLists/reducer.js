import {FETCH_PREFIX, ADD_ACTION, REMOVE_ACTION} from './constants';
import FETCH_FLOW from '../../constants';
import {add, remove} from './model';
let {ING, SUC, FAIL} = FETCH_FLOW;

const initState = {};
const AgentLists = (state = initState, action) => {
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
    case ADD_ACTION:
      let addedResourceData = add(state, action);
      result = {
        ...addedResourceData,
        ...status,
        err
      };
      break;
    case REMOVE_ACTION:
      let removedResourceData = remove(state, action);
      result = {
        ...removedResourceData,
        ...status,
        err
      };
      break;
    default:
      return state;
  }
  return result;
};

export default AgentLists;
