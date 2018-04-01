import { combineReducers } from 'redux';
import stopwatchReducer from './reducer_stopwatch_container';

const rootReducer = combineReducers({
  watch: stopwatchReducer
});

export default rootReducer;
