import { combineReducers } from 'redux';
import stopwatchReducer from './reducer_stopwatch_container';

const rootReducer = combineReducers({
  snapshots: stopwatchReducer
});

export default rootReducer;
