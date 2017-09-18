import {combineReducers} from 'redux';
import Tabs from './components/Tabs';
import AgentLists from './components/AgentLists';
import History from './components/History';

let {constants: {NAME: bordsName}, reducer: bordsReducer} = Tabs;
let {constants: {NAME: agentListsName}, reducer: agentListsReducer} = AgentLists;
let {constants: {NAME: historyName}, reducer: historyReducer} = History;
const rootReducer = combineReducers({
  [bordsName]: bordsReducer,
  [agentListsName]: agentListsReducer,
  [historyName]: historyReducer
});

export default rootReducer;
