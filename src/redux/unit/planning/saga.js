import {ActionConstants} from '../../constants';
import {planningError, planningSuccess} from './action';
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
    ); //POST request
    const dataResponse = decrypted(response.data);

    if (response.status === 1) {
      yield put(planningSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(planningError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(planningError());
  }
}
export function* planningWatcher() {
  yield all([takeLatest(ActionConstants.PLANNING_REQUEST, request)]);
}
export default planningWatcher;
