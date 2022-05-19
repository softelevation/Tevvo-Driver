import {ActionConstants} from '../../constants';
import {activityLogsError, activityLogsSuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../../store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {decrypted} from 'src/utils/commonUtils';

export function* request(action) {
  try {
    const response = yield call(
      apiCall,
      'POST',
      API_URL.UNIT_URL,
      action.payload,
    ); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(activityLogsSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(activityLogsError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(activityLogsError());
  }
}
export function* activityWatcher() {
  yield all([takeLatest(ActionConstants.ACTIVITY_LOGS_REQUEST, request)]);
}
export default activityWatcher;
