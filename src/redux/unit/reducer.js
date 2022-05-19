import {combineReducers} from 'redux';
import {planning} from './planning/reducer';
import {currentUnit} from './current/reducer';
import {activityLogs} from './activity/reducer';
const unit = combineReducers({
  planning,
  currentUnit,
  activityLogs,
});
export default unit;
