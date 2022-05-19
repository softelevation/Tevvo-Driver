import {all} from 'redux-saga/effects';
import {authWatcher} from './login/saga';
import activityWatcher from './unit/activity/saga';
import currentUnitWatcher from './unit/current/saga';
import planningWatcher from './unit/planning/saga';
import {transportWatcher} from './transport/saga';
export default function* rootSaga() {
  yield all([
    authWatcher(),
    planningWatcher(),
    currentUnitWatcher(),
    activityWatcher(),
    transportWatcher(),
  ]);
}
